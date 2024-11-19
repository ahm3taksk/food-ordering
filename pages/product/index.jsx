import React from 'react'
import Image from 'next/image';
import Title from '../../components/ui/Title';
import Header from '../../components/layout/Header';

const Index = () => {
  return (
    <React.Fragment>
        <div className='container flex flex-wrap md:justify-start sm:justify-center justify-center sm:items-start content-start mx-auto h-screen mt-20 gap-x-20 gap-y-5 px-5 sm:px-0'>
            <div className='relative sm:!w-[600px] sm:h-[600px] w-[260px] h-[260px]'>
                <Image src={"/images/f1.png"} className=' rounded-3xl border-4 border-primary'  alt='' layout='fill' objectFit='cover'/>
            </div>
            <div className='flex flex-col md:flex-1 justify-center items-center sm:items-start'>
                <Title addClass={"text-6xl"}>Good Pizza</Title>
                <span className='text-primary text-2xl font-bold underline underline-offset-1 my-4 inline-block'>$10</span>
                <p className='text-sm my-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta massa vitae diam consequat, et mollis neque accumsan. Mauris a urna vestibulum, venenatis tellus maximus, commodo diam.</p>
                <div>
                    <h4 className='text-xl font-bold'>Choose The Size</h4>
                    <div className='flex items-center gap-x-10'>
                        <div className='relative w-8 h-8'>
                            <Image src={"/images/size.png"}  alt='' layout='fill'/>
                            <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px]">Small</span>
                        </div>
                        <div className='relative w-12 h-12'>
                            <Image src={"/images/size.png"}  alt='' layout='fill'/>
                            <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px]">Medium</span>
                        </div>
                        <div className='relative w-16 h-16'>
                            <Image src={"/images/size.png"}  alt='' layout='fill'/>
                            <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px]">Large</span>
                        </div>
                    </div>

                </div>
                <div className='flex md:flex-row flex-col gap-x-4 gap-y-2 mt-4'>
                    <label className='flex items-center gap-x-1'>
                        <span className='text-sm font-semibold'>Add Extra Cheese</span>
                        <input type="checkbox" className='w-5 h-5 accent-primary'/>
                    </label>
                    <label className='flex items-center gap-x-1'>
                        <span className='text-sm font-semibold'>Sauce Pack (Ranch, BBQ, Hot)</span>
                        <input type="checkbox" className='w-5 h-5 accent-primary'/>
                    </label>
                </div>
                <button className='btn-primary mt-6 w-40'>Add To Cart</button>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Index