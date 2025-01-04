import React, { useState } from 'react';
import Image from 'next/image';
import Title from '../../components/ui/Title';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';
import axios from 'axios';

// Unique Key generator to avoid duplicate products in the cart
const generateUniqueKey = (product) => {
    const extras = product.extras && product.extras.length > 0 
        ? product.extras.map(extra => extra._id).sort().join('-') 
        : '';
    return `${product._id}-${extras}`;
};

const Index = ({ food }) => {
    const [price, setPrice] = useState(food.prices[0]);
    const [size, setSize] = useState(0);
    const [extras, setExtras] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();

    // Update price based on selected size
    const handleSize = (sizeIndex) => {
        const difference = food.prices[sizeIndex] - food.prices[size];
        setSize(sizeIndex);
        setPrice(prevPrice => (parseFloat(prevPrice) + difference).toFixed(2));
    };

    // Update price and extras based on user input (checkboxes for extras)
    const handleChange = (e, item) => {
        const checked = e.target.checked;
        setPrice(prevPrice => {
            const newPrice = checked 
                ? parseFloat(prevPrice) + parseFloat(item.price) 
                : parseFloat(prevPrice) - parseFloat(item.price);
            return newPrice.toFixed(2);
        });

        setExtras(prevExtras => checked 
            ? [...prevExtras, item] 
            : prevExtras.filter(extra => extra._id !== item._id)
        );
    };

    const generateUniqueKey = (product) => {
        const extras = product.extras?.length > 0 
            ? product.extras.map(extra => extra._id).sort().join('-') 
            : 'no-extras';
        
        return `${product._id}-${product.size}-${extras}`;
    };

    // Handle adding product to the cart
    const handleClick = () => {
        const newProduct = {
            _id: food._id,
            title: food.title,
            price,
            quantity,
            extras,
            size,
        };
        
    
        const uniqueKey = `${newProduct._id}-${size}-${extras.map(e => e._id).sort().join('-')}`;
    
        dispatch(addProduct({ ...newProduct, uniqueKey }));
    };
    
    return (
        <React.Fragment>
            <div className='container flex flex-wrap md:justify-start sm:justify-center justify-center sm:items-start content-start mx-auto h-screen mt-20 gap-x-20 gap-y-5 px-5 sm:px-0'>
                <div className='relative sm:!w-[600px] sm:h-[600px] w-[260px] h-[260px]'>
                    <Image src={food.img} className='rounded-3xl border-4 border-primary' alt='' layout='fill' objectFit='cover' />
                </div>
                <div className='flex flex-col md:flex-1 justify-center items-center sm:items-start'>
                    <Title addClass={"text-6xl"}>{food.title}</Title>
                    <span className='text-primary text-2xl font-bold underline underline-offset-1 my-4 inline-block'>${price}</span>
                    <p className='text-sm mb-4'>{food?.description}</p>

                    {food.category === 'pizza' && (
                        <div>
                            <h4 className='text-xl font-bold'>Choose The Size</h4>
                            <div className='flex items-center gap-x-10'>
                                {['Small', 'Medium', 'Large', 'Party'].map((sizeLabel, index) => (
                                    <div key={index} className='relative cursor-pointer' onClick={() => handleSize(index)}>
                                        <Image src={"/images/size.png"} alt='' layout='fill' />
                                        <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px]">{sizeLabel}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className='flex md:flex-row flex-col gap-x-4 gap-y-2 mt-4'>
                        {food.extraOptions.map((item) => (
                            <label key={item._id} className='flex items-center gap-x-1'>
                                <span className='text-sm font-semibold'>{item.text}</span>
                                <input onChange={(e) => handleChange(e, item)} type="checkbox" className='w-5 h-5 accent-primary' />
                            </label>
                        ))}
                    </div>

                    <div className="mt-4 flex justify-start items-center gap-4">
                        <button onClick={handleClick} className='btn-primary w-40'>Add To Cart</button>
                        <div className="flex items-center justify-center rounded border border-gray-200">
                            <button 
                                onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : 1)} 
                                type="button" 
                                className="size-8 leading-8 text-gray-600 transition hover:opacity-75"
                            >
                                <i className="fa-solid fa-minus"></i>
                            </button>                 
                            <input 
                                type="number"  
                                id="Quantity" 
                                value={quantity} 
                                className="h-8 w-8 border-transparent text-center"  
                                readOnly
                            />
                            <button 
                                onClick={() => setQuantity(prev => prev + 1)} 
                                type="button" 
                                className="size-8 leading-8 text-gray-600 transition hover:opacity-75"
                            >
                                <i className="fa-solid fa-plus"></i>
                            </button>
                        </div>
                        <span className="font-bold text-center text-xl">
                            Total: ${(price * quantity).toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export const getServerSideProps = async ({ params }) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`);
    return { props: { food: res.data } };
};

export default Index;
