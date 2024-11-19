import React from 'react'
import Title from '../ui/Title'

const Footer = () => {
  return (
    <div className='bg-secondary text-white'>
        <div className='container mx-auto pt-16 pb-10 px-5 md:px-0'>
            <div className='flex flex-wrap md:justify-between justify-center gap-y-8 text-center '>
                <div className='md:flex-1'>
                    <Title addClass={"text-[30px]"}>Contact Us</Title>
                    <div className='flex flex-col gap-y-2 mt-6'>
                        <div>
                            <i class="fa-solid fa-location-dot"></i>
                            <span> Location</span>
                        </div>
                        <div>
                            <i class="fa-solid fa-phone"></i>
                            <span> Call +01 1234567890</span>
                        </div>
                        <div>
                            <i class="fa-solid fa-envelope"></i>
                            <span> demo@gmail.com</span>
                        </div>
                    </div>
                </div>
                <div className='md:flex-1'>
                    <Title addClass={"text-[38px]"}>Feane</Title>
                    <div className='flex flex-col gap-y-2 mt-6'>
                        <p className=''>Necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with</p>
                        <div className='flex gap-x-2 justify-center mt-5'>
                            <a href="" className='flex items-center justify-center text-secondary bg-white rounded-full w-7 h-7 hover:text-primary'>
                                <i class="fa-brands fa-facebook-f"></i>
                            </a>
                            <a href="" className='flex items-center justify-center text-secondary bg-white rounded-full w-7 h-7 hover:text-primary'>
                                <i class="fa-brands fa-twitter"></i>
                            </a>
                            <a href="" className='flex items-center justify-center text-secondary bg-white rounded-full w-7 h-7 hover:text-primary'>
                                <i class="fa-brands fa-linkedin-in"></i>
                            </a>
                            <a href="" className='flex items-center justify-center text-secondary bg-white rounded-full w-7 h-7 hover:text-primary'>
                                <i class="fa-brands fa-instagram"></i>
                            </a>
                            <a href="" className='flex items-center justify-center text-secondary bg-white rounded-full w-7 h-7 hover:text-primary'>
                                <i class="fa-brands fa-pinterest"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className='md:flex-1'>
                    <Title addClass={"text-[30px]"}>Opening Hours</Title>
                    <div className='flex flex-col gap-y-2 mt-6'>
                        <span>Everyday</span>
                        <span>10.00 Am -10.00 Pm</span>
                    </div>
                </div>
            </div>
            <p className='text-center mt-10'>
                <span className='text-primary'>© 2024</span> Made by Ahmet Dursun
            </p>
        </div>
    </div>
  )
}

export default Footer