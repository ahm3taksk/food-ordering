import Title from '../ui/Title'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Footer = () => {
    const [footer, setFooter] = useState([])

    useEffect(() => {
        const getFooter = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/footer`);
                setFooter(res.data[0])
            } catch (error) {
                console.log(error);
            }
        }
        getFooter()
    }, [])
    

  return (
    <div className='bg-secondary text-white'>
        <div className='container mx-auto pt-16 pb-10 px-5 md:px-0'>
            <div className='flex flex-wrap md:justify-between justify-center gap-y-8 text-center '>
                <div className='md:flex-1'>
                    <Title addClass={"text-[30px]"}>Contact Us</Title>
                    <div className='flex flex-col gap-y-2 mt-6'>
                        <a href={footer?.location} target='_blank'>
                            <i class="fa-solid fa-location-dot"></i>
                            <span> Location</span>
                        </a>
                        <a href={`tel:${footer?.phoneNumber}`}>
                            <i class="fa-solid fa-phone"></i>
                            <span> Call +90 {footer?.phoneNumber}</span>
                        </a>
                        <a href={`mailto:${footer?.email}`}>
                            <i class="fa-solid fa-envelope"></i>
                            <span> {footer?.email}</span>
                        </a>
                    </div>
                </div>
                <div className='md:flex-1'>
                    <Title addClass={"text-[38px]"}>Feane</Title>
                    <div className='flex flex-col gap-y-2 mt-6'>
                        <p className=''>{footer?.desc}</p>
                        <div className='flex gap-x-2 justify-center mt-5'>
                            {footer?.socialMedia?.map((item) => (
                            <a key={footer?._id} href={item.link} target='_blank' className='flex items-center justify-center text-secondary bg-white rounded-full w-7 h-7 hover:text-primary transition-all'>
                                <i class={item.icon}></i>
                            </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='md:flex-1'>
                    <Title addClass={"text-[30px]"}>Opening Hours</Title>
                    <div className='flex flex-col gap-y-2 mt-6'>
                        <span>{footer?.openingHours?.day}</span>
                        <span>{footer?.openingHours?.hour}</span>
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