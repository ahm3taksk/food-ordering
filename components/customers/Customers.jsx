import React from 'react'
import Title from '../ui/Title'
import CustomerItem from './CustomerItem'
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";




const Customers = () => {

  function NextBtn({ onClick }) {
    return <button onClick={onClick} className='absolute -bottom-12 left-1/2 bg-primary flex items-center justify-center w-10 h-10 rounded-full text-white'>
      <IoIosArrowForward />
    </button>
  }

  function PrevBtn({ onClick }) {
    return <button onClick={onClick} className='absolute -bottom-12 right-1/2 bg-primary flex items-center justify-center w-10 h-10 rounded-full text-white mr-2'>
      <IoIosArrowBack />
    </button>
  }

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,

        }
      }
    ]
  };
  return (
    <div className='container mx-auto my-20 px-5 md:px-0'>
        <Title addClass="text-[40px] text-center">What Says Our Customers</Title>
        <div className=''>
          <Slider {...settings}>
            <CustomerItem imgSrc='/images/client1.jpg' customerText='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam' customerName='Mary Doe' customerExperience='Good'/>
            <CustomerItem imgSrc='/images/client3.jpg' customerText='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam' customerName='Oliver Queen' customerExperience='Very Good'/>
          </Slider>
        </div>
    </div>
  )
}

export default Customers