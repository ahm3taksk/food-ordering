import Image from 'next/image'
import Title from '../../components/ui/Title'
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../redux/cartSlice';
import axios from 'axios';
import { useSession} from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const Index = ({userList}) => {
    const {data: session} = useSession()
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const user = userList.find((user) => user.email === session?.user?.email)
    const router = useRouter()

    const newOrder = {
        customer: user?.fullName,
        address: user?.address ? user?.address : "No address",
        total: cart.total,
        status: 0,
        method: 0,
    }

    const createOrder = async () => {
        try {
            if (session){
                if(confirm("Are you sure you want to place this order?")){
                    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, newOrder);
                    if (res.status === 201) {
                        router.push(`/order/${res.data._id}`)
                        dispatch(reset())
                        toast.success("Order placed successfully", {autoClose : 1000}) 
                    }
                }
            }
        } catch (error) {
            toast.error("Please login first", {autoClose : 1000})
            console.log(error)
        }
    }

  return (
    <div className='min-h-[calc(100vh_-_465px)]'>
        <div className='flex justify-between items-center md:flex-row flex-col'>
            <div className='min-h-[calc(100vh_-_465px)] flex items-center flex-1 p-10 overflow-x-auto w-full'>
                <table className='w-full text-sm text-center text-gray-500 min-w[1000px]'>
                    <thead className='text-xs text-gray-400 uppercase bg-gray-700'>
                        <tr>
                            <th className='py-3 px-6' scope='col'>PRODUCT</th>
                            <th className='py-3 px-6' scope='col'>EXTRAS</th>
                            <th className='py-3 px-6' scope='col'>PRICE</th>
                            <th className='py-3 px-6' scope='col'>QUANTITY</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.products.map((product) => (
                            <tr key={product._id} className='bg-secondary border-gray-700 hover:bg-primary transition-all'>
                                <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-2 justify-center'>
                                    <Image src="/images/f1.png" width={40} height={40} alt='' />
                                    <span>{product.title}</span>
                                </td>
                                <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>{product.extras.map((item) => <span key={item._id}>{item.text},</span>)}</td>
                                <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>${product.price}</td>
                                <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>{product.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='bg-secondary md:w-auto w-full min-h-[calc(100vh_-_465px)] flex flex-col md:items-start items-center justify-center text-white p-12'>
                <Title addClass={"text-[40px]"}>Cart Total</Title>
                <div className='flex flex-col md:items-start items-center gap-y-1 mt-6'>
                    <span><b>Subtotal: </b>${cart.total}</span>
                    <span><b>Discount: </b>$0.00</span>
                    <span><b>Total: </b>${cart.total}</span>
                </div>
                <button onClick={createOrder} className='btn-primary mt-4'>Go to checkout</button>
            </div>
        </div>
    </div>
  )
}

export const getServerSideProps = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
    return {
        props: {
            userList: res.data ? res.data : [],
        }
    }
}

export default Index