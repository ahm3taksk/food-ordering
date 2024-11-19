import React from 'react'
import Title from '../ui/Title'
import Image from 'next/image'

const Orders = () => {
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
                    <tr className='bg-secondary border-gray-700 hover:bg-primary transition-all'>
                        <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>191235</td>
                        <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>Karşıyaka</td>
                        <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>19-12-2024</td>
                        <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>$35.5</td>
                        <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>Delivered</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Orders