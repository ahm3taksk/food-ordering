import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import Title from '../ui/Title'
import Image from 'next/image'
import Link from 'next/link'

const Reservations = () => {
    const [reservations, setReservations] = useState([])
    const [currentUser, setCurrentUser] = useState([])
    const {data: session} = useSession()
    const status = {
        0: 'Pending',
        1: 'Confirmed',
        2: 'Completed',
        3: 'Cancelled',
    }

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
        const getReservations = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reservations`);
                setReservations(res.data.filter((reservation) => reservation.userId === currentUser[0]?._id))
            } catch (error) {
                console.log(error)
            }
        }
        getReservations()
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

    const cancelReservation = async (id) => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/reservations/${id}`, {status: 3})
            if (res.status === 200) {
                setReservations([ res.data, ...reservations.filter((reservation) => reservation._id !== id)])
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='p-0 pb-8 md:p-8 flex-1 flex flex-col items-center md:items-start w-full'>
        <Title addClass={"text-[40px]"}>Reservations</Title>
        <div className='max-h-[400px] overflow-auto w-full mt-5'>
            <table className='w-full text-sm text-center text-gray-500 min-w[1000px] overflow-x-auto'>
                <thead className='text-xs text-gray-400 uppercase bg-gray-700'>
                    <tr>
                        <th className='py-3 px-6' scope='col'>ID</th>
                        <th className='py-3 px-6' scope='col'>Name</th>
                        <th className='py-3 px-6' scope='col'>Phone</th>
                        <th className='py-3 px-6' scope='col'>Email</th>
                        <th className='py-3 px-6' scope='col'>Persons</th>
                        <th className='py-3 px-6' scope='col'>Date</th>
                        <th className='py-3 px-6' scope='col'>Status</th>
                        <th className='py-3 px-6' scope='col'>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.length > 0 && reservations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((reservation) => (
                        <tr key={reservation?._id} className='bg-secondary border-gray-700 hover:bg-primary transition-all'>
                            <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>{reservation?._id}</td>
                            <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>{reservation?.fullName}</td>
                            <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>{reservation?.phoneNumber}</td>
                            <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>{reservation?.email}</td>
                            <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>{reservation?.persons}</td>
                            <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>{formatDate(reservation?.date)}</td>

                            <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>{status[reservation?.status]}</td>
                            <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white gap-2 flex'>
                                <button className='btn-danger' onClick={() =>  cancelReservation(reservation?._id)} disabled={reservation?.status > 1}> Cancel  </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Reservations