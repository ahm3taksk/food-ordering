import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Title from '../ui/Title'
import Image from 'next/image'
import { toast } from 'react-toastify'
import AddProduct from '../../components/admin/AddProduct'

const Product = () => {
    const [products, setProducts] = useState([])
    const [isProductModal, setIsProductModal] = useState(false);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
                setProducts(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getProducts();
    }, [])

    const handleDelete = async (id) => {
        try {
            if(confirm("Are you sure you want to delete this product?")) {
                const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
                if (res.status === 200) {
                    setProducts(products.filter((product) => product._id !== id));
                    toast.warning('Product Deleted');
                }
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    
  return (
    <div className='p-0 pb-5 flex-1 flex flex-col items-center md:items-start md:max-h-[calc(100vh_-_200px)]'>
        <div className='flex flex-col md:flex-row w-full justify-between items-center'>
            <Title tle addClass={"text-[40px]"}>Products</Title>
            <button className='btn-primary flex justify-center items-center gap-x-2' onClick={() => setIsProductModal(true)}>
                <span>Add Product</span>
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
    <div className='w-full mt-5 h-[calc(100vh_-_200px)] max-h-[calc(100vh_-_200px)] overflow-auto'>
        <table className='w-full text-sm text-center text-gray-500 min-w[1000px]'>
            <thead className='text-xs text-gray-400 uppercase bg-gray-700'>
                <tr>
                    <th className='py-3 px-6' scope='col'>IMAGE</th>
                    <th className='py-3 px-6' scope='col'>ID</th>
                    <th className='py-3 px-6' scope='col'>TITLE</th>
                    <th className='py-3 px-6' scope='col'>PRICE</th>
                    <th className='py-3 px-6' scope='col'>ACTION</th>
                </tr>
            </thead>
            <tbody>
                {products.length > 0 && products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((product) => (
                    <tr key={product._id} className='bg-secondary border-gray-700 hover:bg-primary transition-all'>
                        <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center justify-center gap-x-1'>
                            <Image src={product.img} alt={product.title} width={50} height={50}/>
                        </td>
                        <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>{product._id}</td>
                        <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>{product.title}</td>
                        <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>{product.prices[0]}</td>
                        <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>
                            <button className="btn-primary !bg-danger" onClick={() => handleDelete(product._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    {isProductModal && 
                <AddProduct setIsProductModal={setIsProductModal} />
            }
</div>
  )
}

export default Product