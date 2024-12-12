import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import Title from '../ui/Title'
import Image from 'next/image'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [currentUser, setCurrentUser] = useState([])
    const {data: session} = useSession()
    const status = ['Preparing', 'On the way', 'Delivered']

    function formatDate(dateString) {
        if (!dateString) return "Tarih yok";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    }      

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
                setOrders(res.data.filter((order) => order.customer === currentUser[0]?.fullName))
            } catch (error) {
                console.log(error)
            }
        }
        getOrders()
    }, [currentUser])

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
                setCurrentUser(res.data.filter((user) => user.email === session.user.email))
            } catch (error) {
                console.log(error)
            }
        }
        getUsers()
    }, [session])

  return (
    <div className='p-0 pb-8 md:p-8 flex-1 flex flex-col items-center md:items-start'>
        <Title addClass={"text-[40px]"}>Orders</Title>
        <div className='overflow-x-auto w-full mt-5'>
            <table className='w-full text-sm text-center text-gray-500 min-w[1000px]'>
                <thead className='text-xs text-gray-400 uppercase bg-gray-700'>
                    <tr>
                        <th className='py-3 px-6' scope='col'>ID</th>
                        <th className='py-3 px-6' scope='col'>ADDRESS</th>
                        <th className='py-3 px-6' scope='col'>DATE</th>
                        <th className='py-3 px-6' scope='col'>TOTAL</th>
                        <th className='py-3 px-6' scope='col'>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 && orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((order) => (
                        <tr key={order?._id} className='bg-secondary border-gray-700 hover:bg-primary transition-all'>
                            <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>{order?._id}</td>
                            <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>{order?.address}</td>
                            <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>{formatDate(order?.createdAt)}</td>
                            <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>${order?.total}</td>
                            <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>{status[order?.status]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Orders