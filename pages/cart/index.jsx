import Image from "next/image";
import Title from "../../components/ui/Title";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { reset, increaseQuantity, decreaseQuantity, removeProduct } from "../../redux/cartSlice";
import Input from "../../components/form/Input";
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

    // Kullanıcı bilgilerini al
    const user = session?.user?.email && userList.length 
        ? userList.find((user) => user.email === session.user.email) 
        : null;

    console.log("🧑‍💻 User Data:", user); // Kullanıcı verisini kontrol et

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
            console.error("Order creation failed");
            toast.error("omething went wrong. Please try again later.", { autoClose: 2000 });
        }
    };

    return (
        <div className="container mx-auto mt-5 mb-16 px-5 md:px-0 ">
            {cart?.products?.length > 0 ? (
                <div className="flex flex-col md:flex-row items-start gap-4 w-full min-h-[450px]">
                    <div className="w-full md:w-3/4 min-h-[450px] flex items-start justify-start overflow-auto border rounded-md border-gray-500">
                        <div className="flex max-h-[450px] w-auto md:w-full flex-col justify-start items-center overflow-y-auto">
                            {cart.products.map((product) => (
                                <div key={product._id} className="flex justify-start items-center gap-4 w-auto md:w-full p-4 border-b border-gray-500">
                                    <div className="relative flex items-center justify-center w-[60px] h-[60px]">
                                        <Image src={product.img} layout="fill" alt={product.title} />
                                    </div>
                                    <button 
                                        onClick={() => dispatch(removeProduct(product._id))}
                                        className="btn-danger !h-10 !w-10 border border-danger !p-2 !bg-transparent !text-danger hover:!text-white hover:!bg-danger"
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                    <span className="font-bold text-xl w-[200px] md:w-[400px]">
                                        {product.title}
                                    </span>
                                    <div className="md:w-[100px]">
                                        <div className="flex items-center rounded border border-gray-200">
                                            <button 
                                                onClick={() => dispatch(decreaseQuantity(product._id))} 
                                                type="button" 
                                                className="size-8 leading-8 text-gray-600 transition hover:opacity-75"
                                            >
                                                <i className="fa-solid fa-minus"></i>
                                            </button>
                                            <input
                                                type="number"
                                                id="Quantity"
                                                value={product.quantity}
                                                className="h-8 w-8 border-transparent text-center"
                                                readOnly
                                            />
                                            <button 
                                                onClick={() => dispatch(increaseQuantity(product._id))} 
                                                type="button" 
                                                className="size-8 leading-8 text-gray-600 transition hover:opacity-75"
                                            >
                                                <i className="fa-solid fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <span className="font-bold text-center text-xl w-[80px]">
                                        ${product.price.toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full md:w-1/4 flex flex-col md:items-start items-center justify-start p-6 border rounded-md border-gray-500">
                        <Title addClass="text-[40px]">Cart Total</Title>
                        <div className="flex flex-col md:items-start items-center gap-y-1 mt-6 text-lg">
                            <span><b>Subtotal: </b>${cart.total.toFixed(2)}</span>
                            <span><b>Discount: </b>$0.00</span>
                            <span><b>Total: </b>${cart.total.toFixed(2)}</span>
                        </div>
                        {/* <div className="flex w-full h-full md:items-start items-center gap-2 mt-6">
                            <Input type="text" placeholder="Coupon Code" addClass="p-2 rounded-md" />
                        </div> */}
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
    const user = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
    return {
        props: {
            userList: user.data ? user.data : [],
        },
    };
}

export default Index;
