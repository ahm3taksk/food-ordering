import React from 'react'
import Title from '../ui/Title'
import Image from 'next/image'

const Product = () => {
  return (
    <div className='p-0 pb-8 md:p-8 flex-1 flex flex-col items-center md:items-start'>
    <Title addClass={"text-[40px]"}>Products</Title>
    <div className='overflow-x-auto w-full mt-5'>
        <table className='w-full text-sm text-center text-gray-500 min-w[1000px]'>
            <thead className='text-xs text-gray-400 uppercase bg-gray-700'>
                <tr>
                    <th className='py-3 px-6' scope='col'>IMAGE</th>
                    <th className='py-3 px-6' scope='col'>ID</th>
                    <th className='py-3 px-6' scope='col'>TITLE</th>
                    <th className='py-3 px-6' scope='col'>PRICE</th>
                    <th className='py-3 px-6' scope='col'>ACTION</th>
                </tr>
            </thead>
            <tbody>
                <tr className='bg-secondary border-gray-700 hover:bg-primary transition-all'>
                    <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center justify-center gap-x-1'>
                        <Image src='/images/f1.png' alt='' width={50} height={50}/>
                    </td>
                    <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>191235</td>
                    <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>Good Pizza</td>
                    <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>$35.5</td>
                    <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>
                        <button className="btn-primary !bg-danger">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
  )
}

export default Product