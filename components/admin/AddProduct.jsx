
import OutsideClickHandler from 'react-outside-click-handler';
import Title from '../ui/Title';
import Image from 'next/image';
import { FaRegTimesCircle } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddProduct = ({setIsProductModal}) => {
    const [file, setFile] = useState()
    const [imageSrc, setImageSrc] = useState()

    const [title, setTitle] = useState("")
    const [description, setDesc] = useState("")
    const [category, setCategory] = useState("Pizza")
    const [prices, setPrices] = useState([])

    const [extra, setExtra] = useState("")
    const [extraOptions, setExtraOptions] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
                setCategories(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getCategories();
    }, []);

    const handleExtra = (e) => {
        if (extra) {
            if (extra.text && extra.price) {
                setExtraOptions((prev) => [...prev, extra]);
            }
        }
    }
    
    const handleChange = (changeEvent) => {
        const reader = new FileReader();
        reader.onload = function (onLoadEvent) {
            setImageSrc(onLoadEvent.target.result);
            setFile(changeEvent.target.files[0]);
        }

        reader.readAsDataURL(changeEvent.target.files[0]);
    }

    const changePrice = (e, index) => {
        const currentPrices = prices;
        currentPrices[index] = e.target.value;
        setPrices(currentPrices);
    }

    const handleCreate = async () => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'food-ordering');
        // data.append('cloud_name', 'dlkqsghxd');
        try {
            const uploadRes = await axios.post('https://api.cloudinary.com/v1_1/dlkqsghxd/image/upload', data);
            const {url} = uploadRes.data    
            const newProduct = {
                img: url,
                title,
                description,   
                category: category.toLowerCase(),
                prices,
                extraOptions
            }

            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, newProduct);

            if (res.status === 201) {
                setIsProductModal(false);
                toast.success('Product added successfully');
            }

        } catch (error) {
            console.log(error); 
            
        }
    }

  return (
    <div className='fixed top-0 left-0 w-full h-screen z-50 after:content-[""] after:w-screen after:h-screen after:absolute after:top-0 after:left-0 grid place-content-center'>
        <OutsideClickHandler onOutsideClick={() => setIsProductModal(false)}>
            <div className='w-full h-full grid place-content-center relative'>
                <div className='relative z-50 sm:w-[600px] w-[280px] bg-white border-2 border-gray-300 rounded-md sm:p-10 p-2'>
                    <Title addClass='text-[40px] text-center' >Add a New Product</Title>
                    <div className='flex flex-col text-sm mt-6'>
                        <label className='flex gap-2 items-center'>
                            <input type="file" className='hidden' onChange={handleChange}/>
                            <button className="btn-primary !rounded-none !bg-blue-600 pointer-events-none">Choose an image</button>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            {imageSrc && <img src={imageSrc} alt='' className='w-24 h-24 mt-2 object-contain'/>}
                        </label>
                    </div>
                    <div className='flex flex-col text-sm mt-4'>
                        <span className='font-bold mb-1'>Title</span>
                        <input type="text" placeholder='Write a title...' className='border-2 text-sm p-1 outline-none' onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className='flex flex-col text-sm mt-4'> 
                        <span className='font-bold mb-1'>Description</span>
                        <textarea placeholder='Write a Description...' className='border-2 text-sm p-1 outline-none' onChange={(e) => setDesc(e.target.value)}/>
                    </div>
                    <div className='flex flex-col text-sm mt-4'>
                        <span className='font-bold mb-1'>Select Category</span>
                        <select placeholder='Select a category...' className='border-2 text-sm p-1 outline-none' onChange={(e) => setCategory(e.target.value)}>
                            {categories.length > 0 && categories.map((category) => (
                                <option key={category._id} value={category.title}>{category.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex flex-col text-sm mt-4'>
                        <span className='font-bold mb-1'>Prices</span>
                        {category === 'Pizza' ? (
                        <div className='flex w-full md:flex-nowrap flex-wrap gap-4'>
                            <input type="number" placeholder='Small' className='border-b-2 text-sm p-1 pl-0 outline-none w-28' onChange={(e) => changePrice(e, 0)}/>
                            <input type="number" placeholder='Medium' className='border-b-2 text-sm p-1 pl-0 outline-none w-28' onChange={(e) => changePrice(e, 1)}/>
                            <input type="number" placeholder='Large' className='border-b-2 text-sm p-1 pl-0 outline-none w-28' onChange={(e) => changePrice(e, 2)}/>
                            <input type="number" placeholder='Party' className='border-b-2 text-sm p-1 pl-0 outline-none w-28' onChange={(e) => changePrice(e, 3)}/>
                        </div>
                        ) : (<input type="number" placeholder='Standard' className='border-b-2 text-sm p-1 pl-0 outline-none w-28' onChange={(e) => changePrice(e, 0)}/>)}
                    </div>

                    <div className='flex flex-col text-sm mt-4'>
                        <span className='font-bold mb-1'>Extra</span>
                        <div className='flex w-full md:flex-nowrap flex-wrap gap-4'>
                            <input type="text" placeholder='Item' name='text' className='border-b-2 text-sm p-1 pl-0 outline-none w-28' onChange={(e) => setExtra({...extra, [e.target.name] : e.target.value})}/>
                            <input type="number" placeholder='Price' name='price' className='border-b-2 text-sm p-1 pl-0 outline-none w-28' onChange={(e) => setExtra({...extra, [e.target.name] : e.target.value})}/>
                            <button className="btn-primary ml-auto" onClick={handleExtra}>Add</button>
                        </div>
                        <div className='my-2 flex gap-2 flex-wrap'>
                            {extraOptions.map((item, index) => (
                                <span key={index} className='inline-block border border-orange-600 p-2 rounded-xl text-xs text-orange-600 cursor-pointer' onClick={() => {setExtraOptions(extraOptions.filter((_, i) => i !== index))}} >{item.text}</span>
                            ))}
                        </div>
                    </div>
                    <div className='flex justify-end'>
                        <button className="btn-primary !bg-success ml-auto" onClick={handleCreate}>Create</button>
                    </div>
                    <div>
                        <button className='absolute top-4 right-4' onClick={() => setIsProductModal(false)}>
                        <FaRegTimesCircle size={25} className='hover:text-primary transition-all' />
                        </button>
                    </div>
                </div>
            </div>
        </OutsideClickHandler>
    </div>
  )
}

export default AddProduct