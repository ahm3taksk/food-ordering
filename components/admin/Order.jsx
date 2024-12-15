import { useEffect, useState } from 'react'
import axios from 'axios'

import Title from '../ui/Title'

const Order = () => {
    const [orders, setOrders] = useState([])
    const status = ['Preparing', 'On the way', 'Delivered']

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
                setOrders(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getOrders()
    }, [])

    const handleStatus = async (id) => {
        const item = orders.find((order) => order._id === id)
        const currentStatus = item.status
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`, {status: currentStatus + 1})
            if (res.status === 200) {
                setOrders([ res.data, ...orders.filter((order) => order._id !== id)])
            }
        } catch (error) {
            console.log(error)
            
        }

    }

  return (
    <div className='p-0 pb-5 flex-1 flex flex-col items-center md:items-start md:max-h-[calc(100vh_-_465px)]'>
    <Title addClass={"text-[40px]"}>Orders</Title>
    <div className='max-h-[400px] overflow-auto w-full mt-5'>
        <table className='w-full text-sm text-center text-gray-500 min-w[1000px]'>
            <thead className='text-xs text-gray-400 uppercase bg-gray-700'>
                <tr>
                    <th className='py-3 px-6' scope='col'>PRODUCT</th>
                    <th className='py-3 px-6' scope='col'>CUSTOMER</th>
                    <th className='py-3 px-6' scope='col'>TOTAL</th>
                    <th className='py-3 px-6' scope='col'>PAYMENT</th>
                    <th className='py-3 px-6' scope='col'>STATUS</th>
                    <th className='py-3 px-6' scope='col'>ACTION</th>
                </tr>
            </thead>
            <tbody>
                {orders.length > 0 && orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((order) => (
                    <tr key={order?._id} className='bg-secondary border-gray-700 hover:bg-primary transition-all'>
                        <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>{order?._id}</td>
                        <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>{order?.customer}</td>
                        <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>${order?.total}</td>
                        <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>{order?.method === 0 ? 'Cash' : 'Online Payment'}</td>
                        <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>{status[order?.status]}</td>
                        <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>
                            <button className="btn-primary !bg-success" onClick={() => handleStatus(order?._id)} disabled={order?.status > 1}>Next Stage</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>
  )
}

export default Order