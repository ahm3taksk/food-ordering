import React from 'react'
import Image from 'next/image';
import Title from '../../components/ui/Title';
import Header from '../../components/layout/Header';
import { useState } from 'react';
import { addProduct } from '../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Index = ({food}) => {

    const [prices, setPrices] = useState(food.prices)
    const [price, setPrice] = useState(prices[0])
    const [size, setSize] = useState(0)
    const [extraItems, setExtraItems] = useState(food?.extraOptions)
    const [extras, setExtras] = useState([])
    const cart = useSelector((state) => state.cart)

    const dispatch = useDispatch()

    const handleSize = (sizeIndex) => {
        const difference = prices[sizeIndex] - prices[size]
        setSize(sizeIndex)
        changePrice(difference)
    }

    const changePrice = (number) => {
        setPrice(price + number)
    }

    const handleChange = (e, item) => {
        const checked = e.target.checked
        if(checked) {
            changePrice(item.price)
            setExtras([...extras, item])
            
        } else {
            changePrice(-item.price)
            setExtras(extras.filter(extra => extra.id !== item.id))
        }
    }

    const handeClick = () => {
        dispatch(addProduct({...food, extras, price, quantity: 1}))
    }


  return (
    <React.Fragment>
        <div className='container flex flex-wrap md:justify-start sm:justify-center justify-center sm:items-start content-start mx-auto h-screen mt-20 gap-x-20 gap-y-5 px-5 sm:px-0'>
            <div className='relative sm:!w-[600px] sm:h-[600px] w-[260px] h-[260px]'>
                <Image src={food.img} className=' rounded-3xl border-4 border-primary'  alt='' layout='fill' objectFit='cover'/>
            </div>
            <div className='flex flex-col md:flex-1 justify-center items-center sm:items-start'>
                <Title addClass={"text-6xl"}>{food.title}</Title>
                <span className='text-primary text-2xl font-bold underline underline-offset-1 my-4 inline-block'>${price}</span>
                <p className='text-sm mb-4'>{food?.description}</p>
                <div>
                    {food.category === 'pizza' && (
                        <div>
                            <h4 className='text-xl font-bold'>Choose The Size</h4>
                            <div className='flex items-center gap-x-10'>
                                <div className='relative w-8 h-8 cursor-pointer' onClick={() => handleSize(0)}>
                                    <Image src={"/images/size.png"}  alt='' layout='fill'/>
                                    <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px]">Small</span>
                                </div>
                                <div className='relative w-12 h-12 cursor-pointer'>
                                    <Image src={"/images/size.png"}  alt='' layout='fill' onClick={() => handleSize(1)}/>
                                    <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px]">Medium</span>
                                </div>
                                <div className='relative w-16 h-16 cursor-pointer'>
                                    <Image src={"/images/size.png"}  alt='' layout='fill' onClick={() => handleSize(2)}/>
                                    <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px]">Large</span>
                                </div>
                                <div className='relative w-[5rem] h-[5rem] cursor-pointer'>
                                    <Image src={"/images/size.png"}  alt='' layout='fill' onClick={() => handleSize(3)}/>
                                    <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px]">Party</span>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
                <div className='flex md:flex-row flex-col gap-x-4 gap-y-2 mt-4'>
                    {extraItems.map((item) => (
                        <label key={item._id} className='flex items-center gap-x-1'>
                            <span className='text-sm font-semibold'>{item.text}</span>
                            <input onChange={(e) => handleChange(e, item)} type="checkbox" className='w-5 h-5 accent-primary'/>
                        </label>
                    ))}
                </div>
                <button onClick={handeClick} className='btn-primary mt-6 w-40'>Add To Cart</button>
            </div>
        </div>
    </React.Fragment>
  )
}

export const getServerSideProps = async ({params}) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`);
    return {
        props: {
            food: res.data
        }
    }
}


export default Index