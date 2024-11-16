import React from 'react'
import Image from 'next/image'

const CustomerItem = ({imgSrc, customerText, customerName, customerExperience}) => {

  return (
    <div className='mt-5 mx-4 flex flex-col items-center sm:items-start'>
        <div className='p-6 bg-secondary text-white rounded-[5px]'>
            <p className='text-center sm:text-start'>{customerText}</p>
            <div className='flex flex-col items-center sm:items-start mt-4 gap-y-1'>
                <span className='text-lg font-semibold'>{customerName}</span>
                <span className='text-[15px]'>{customerExperience}</span>
            </div>
        </div>
        <div className='relative flex justify-center w-28 h-28 border-4 border-primary rounded-full mt-8 before:content-[""] before:absolute before:top-1 before:-translate-y-4 before:rotate-45 before:bg-primary before:w-5 before:h-5'>
            <Image src={imgSrc} alt='' layout='fill' objectFit='contain' className='rounded-full'/>
        </div>
    </div>
  )
}

export default CustomerItem