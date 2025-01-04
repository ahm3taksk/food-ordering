import Image from "next/image";
import Title from "../../components/ui/Title";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { reset, increaseQuantity, decreaseQuantity, removeProduct } from "../../redux/cartSlice";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";

const Index = ({ userList = [] }) => {
    const { data: session } = useSession();
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const router = useRouter();

    const minimumOrder = 15;

    const user = session?.user?.email && userList.length 
        ? userList.find((user) => user.email === session.user.email) 
        : null;

    const createOrder = async () => {
        try {
            if (!session) {
                toast.error("Please login first", { autoClose: 1500 });
                return;
            }
    
            if (!user) {
                toast.error("User information not found. Please try again later.", { autoClose: 2000 });
                return;
            }
    
            if (!user.fullName || !user._id) {
                toast.error("Incomplete user information. Please update your profile.", { autoClose: 2000 });
                return;
            }
    
            if (!user.address || user.address.trim() === "") {
                toast.error("Please add your address information.", { autoClose: 2000 });
                return;
            }
    
            if (!cart.products.length) {
                toast.error("Your cart is empty!", { autoClose: 2000 });
                return;
            }

            if(cart.total <= 15) {
                toast.warning("Minimum order amount is $15", { autoClose: 2000 });
                return;
            }

            if(cart.total > 120) {
                toast.warning("Maximum order amount is $120", { autoClose: 2000 });
                return;
            }
    
            const newOrder = {
                customer: user.fullName,
                customerId: user._id,
                address: user.address,
                total: cart.total,
                quantity: cart.quantity,
                products: cart.products,
                status: 0,
                method: 0,
            };
    
            if (confirm("Are you sure you want to place this order?")) {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, newOrder);
    
                if (res.status === 201) {
                    router.push(`/order/${res.data._id}`);
                    dispatch(reset());
                    toast.success("Order placed successfully!", { autoClose: 1000 });
                }
            }
        } catch (error) {
            console.error("Order creation failed", error);
            toast.error("Something went wrong. Please try again later.", { autoClose: 2000 });
        }
    };

    return (
        <div className="container mx-auto mt-5 mb-16 px-5 md:px-0">
            {cart?.products?.length > 0 ? (
                <div className="flex flex-col md:flex-row items-start gap-4 w-full min-h-[450px]">
                    <div className="w-full md:w-3/4 border rounded-md border-gray-500">
                        <div className="flex flex-col overflow-y-auto max-h-[450px]">
                            {cart.products.map((product) => (
                                <div key={product.uniqueKey} className="flex items-center gap-4 p-4 border-b border-gray-500">
                                    <div className="relative w-[60px] h-[60px]">
                                        <Image src={product.img} layout="fill" alt={product.title} />
                                    </div>
                                    <button 
                                        onClick={() => dispatch(removeProduct(product.uniqueKey))}
                                        className="btn-danger !h-10 !w-10 border border-danger !p-2 !bg-transparent !text-danger hover:!text-white hover:!bg-danger"
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                    <div className="flex flex-col w-[400px]">
                                        <span className="font-bold text-xl">{product.title}</span>
                                        <span className="text-sm">Extras: {product.extras?.length ? product.extras.map(extra => extra.text).join(", ") : "No extras"}</span>
                                    </div>
                                    <div className="flex items-center border border-gray-200">
                                        <button onClick={() => dispatch(decreaseQuantity(product.uniqueKey))} className="size-8">
                                            <i className="fa-solid fa-minus"></i>
                                        </button>
                                        <input type="number" value={product.quantity} className="h-8 w-8 text-center" readOnly />
                                        <button onClick={() => dispatch(increaseQuantity(product.uniqueKey))} className={`size-8 ${ product.quantity >= 10 ? 'cursor-not-allowed' : ''}`} disabled={product.quantity >= 10}>
                                            <i className="fa-solid fa-plus"></i>
                                        </button>
                                    </div>
                                    <span className="font-bold text-xl">${(Number(product.price) * product.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full md:w-1/4 p-6 border rounded-md border-gray-500">
                        <Title addClass="text-[40px]">Cart Total</Title>
                        <div className="flex flex-col mt-6 text-lg">
                            <div className="flex justify-between items-center">
                                <span>Subtotal</span>
                                <span>${(cart.total || 0).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Total</span>
                                <span>${(cart.total || 0).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                {cart.total < minimumOrder && <span className="text-red-500 text-sm">${(minimumOrder - cart.total).toFixed()} left for minimum order price</span>}
                            </div>
                        </div>
                        <button onClick={createOrder} className="btn-primary mt-4">Go to checkout</button>
                    </div>
                </div>
            ) : (
                <div className="w-full min-h-[450px] bg-secondary flex flex-col justify-center items-center gap-4 rounded-[46px]">
                    <h1 className="text-4xl text-white">Your cart is empty, you can add items from the menu</h1>
                    <Link href={`/menu`}>
                        <button className="btn-primary">Go to menu</button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export const getServerSideProps = async () => {
    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        return { props: { userList: data || [] } };
    } catch (error) {
        console.error("Failed to fetch users", error);
        return { props: { userList: [] } };
    }
};

export default Index;
