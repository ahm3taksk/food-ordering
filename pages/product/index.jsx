import React from 'react'
import Image from 'next/image';
import Title from '../../components/ui/Title';
import Header from '../../components/layout/Header';
import { useState } from 'react';
import { addProduct } from '../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const itemsExtra = [
    {
        id: 1,
        name: 'Extra Cheese',
        price: 5
    },
    {
        id: 2,
        name: 'Sauce Pack (Ranch, BBQ, Hot)',
        price: 10
    },
    {
        id: 3,
        name: 'Coke 1.5L',
        price: 10
    }
]

const foodItems = [
    {
        id: 1,
        name: 'Good Pizza',
        price: 20,
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta massa vitae diam consequat, et mollis neque accumsan. Mauris a urna vestibulum, venenatis tellus maximus, commodo diam.",
        extraOptions: [
            {
                id: 1,
                name: 'Extra Cheese',
                price: 5
            },
            {
                id: 2,
                name: 'Sauce Pack (Ranch, BBQ, Hot)',
                price: 10
            }     
        ]
    }
]

const Index = () => {

    const [prices, setPrices] = useState([10, 20, 30])
    const [price, setPrice] = useState(prices[0])
    const [size, setSize] = useState(0)
    const [extraItems, setExtraItems] = useState(itemsExtra)
    const [extras, setExtras] = useState([])
    const cart = useSelector((state) => state.cart)

    const dispatch = useDispatch()

    console.log(cart)

    const handeSize = (sizeIndex) => {
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
        dispatch(addProduct({...foodItems[0], extras, price, quantity: 1}))
    }


  return (
    <React.Fragment>
        <div className='container flex flex-wrap md:justify-start sm:justify-center justify-center sm:items-start content-start mx-auto h-screen mt-20 gap-x-20 gap-y-5 px-5 sm:px-0'>
            <div className='relative sm:!w-[600px] sm:h-[600px] w-[260px] h-[260px]'>
                <Image src={"/images/f1.png"} className=' rounded-3xl border-4 border-primary'  alt='' layout='fill' objectFit='cover'/>
            </div>
            <div className='flex flex-col md:flex-1 justify-center items-center sm:items-start'>
                <Title addClass={"text-6xl"}>Good Pizza</Title>
                <span className='text-primary text-2xl font-bold underline underline-offset-1 my-4 inline-block'>${price}</span>
                <p className='text-sm my-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta massa vitae diam consequat, et mollis neque accumsan. Mauris a urna vestibulum, venenatis tellus maximus, commodo diam.</p>
                <div>
                    <h4 className='text-xl font-bold'>Choose The Size</h4>
                    <div className='flex items-center gap-x-10'>
                        <div className='relative w-8 h-8 cursor-pointer' onClick={() => handeSize(0)}>
                            <Image src={"/images/size.png"}  alt='' layout='fill'/>
                            <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px]">Small</span>
                        </div>
                        <div className='relative w-12 h-12 cursor-pointer'>
                            <Image src={"/images/size.png"}  alt='' layout='fill' onClick={() => handeSize(1)}/>
                            <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px]">Medium</span>
                        </div>
                        <div className='relative w-16 h-16 cursor-pointer'>
                            <Image src={"/images/size.png"}  alt='' layout='fill' onClick={() => handeSize(2)}/>
                            <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px]">Large</span>
                        </div>
                    </div>

                </div>
                <div className='flex md:flex-row flex-col gap-x-4 gap-y-2 mt-4'>
                    {extraItems.map((item) => (
                        <label key={item.id} className='flex items-center gap-x-1'>
                            <span className='text-sm font-semibold'>{item.name}</span>
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

export default Index