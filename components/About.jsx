import React from 'react'
import Image from 'next/image'
import Title from './ui/Title'

const About = () => {
  return (
    <div className='bg-secondary'>
        <div className='container mx-auto py-14 flex sm:flex-auto flex-wrap sm:justify-center justify-center  items-center text-white gap-20 px-5 sm:px-0'>
            <div className=''>
                <div className='relative sm:w-[445px] w-[245px] sm:h-[600px] h-[300px]'>
                    <Image src={'/images/about-img.png'} alt='' layout='fill'/>
                </div>
            </div>
            <div className='md:w-1/2 md:text-start text-center'>
                <Title addClass={"text-[40px]"}>We Are Feane</Title>
                <p className='my-5'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don`t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn`t anything embarrassing hidden in the middle of text. All</p>
                <button className='btn-primary'>Read More</button>
            </div>
        </div>
    </div>
  )
}

export default About