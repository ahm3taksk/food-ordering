import React from 'react'
import Image from 'next/image'
import Title from '../../components/ui/Title'
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../redux/cartSlice';

const Index = () => {

    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()

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
                <button onClick={() => dispatch(reset())} className='btn-primary mt-4'>Go to checkout</button>
            </div>
        </div>
    </div>
  )
}

export default Index