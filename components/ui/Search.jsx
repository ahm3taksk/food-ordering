import OutsideClickHandler from 'react-outside-click-handler';
import Title from '../ui/Title';
import Image from 'next/image';
import { FaRegTimesCircle } from 'react-icons/fa';
import { useEffect, useState, CSSProperties  } from 'react';
import axios from 'axios';
import Input from '../form/Input';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PacmanLoader from "react-spinners/PacmanLoader";

const Search = ({setIsSearchModal}) => {
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState("")
    const [filtered, setFiltered] = useState([])
    const router = useRouter()
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
                setProducts(res.data)
                setFiltered(res.data.slice(0, 5))
            } catch (error) {
                console.log(error);
            }
        }
        setTimeout(() => {
            getProducts()
        }, 300)
    }, [])

    const handleSearch = async (e) => {
        setSearch(e.target.value)
        const searchFilter = products.filter((product) => product.title.toLowerCase().includes(e.target.value.toLowerCase())).slice(0, 5)
        setFiltered(searchFilter)
    }

  return (
    <div className='fixed top-0 left-0 w-full h-screen z-50 after:content-[""] after:w-screen after:h-screen after:absolute after:top-0 after:left-0 grid place-content-center'>
        <OutsideClickHandler onOutsideClick={() => setIsSearchModal(false)}>
            <div className='w-full h-full grid place-content-center relative'>
                <div className='relative z-50 sm:w-[600px] w-[280px] h-[550px] bg-white border-2 border-gray-300 rounded-md sm:p-10 p-2'>
                    <Title addClass='text-[40px] text-center' >Search</Title>
                    <Input placeholder='Search...' onChange={handleSearch}/>
                    <div>
                        {products.length > 0 ? (
                          <ul className="mt-4 flex flex-col gap-y-2">
                            {filtered.length > 0 ? (
                              filtered.map((product) => (
                                <li key={product._id}  className='flex items-center justify-between p-1 px-3 cursor-pointer  bg-gray-100 hover:bg-primary transition-all' onClick={() => {
                                  router.push(`/product/${product?._id}`)
                                  setIsSearchModal(false)
                              }}>
                                  <div className="relative flex">
                                    <Image src={product?.img} alt={product?.title} width={48} height={48} />
                                  </div>
                                  <span className="font-bold">{product?.title}</span>
                                  <span className="font-bold">${product.prices[0]}</span>
                                </li>
                              ))
                            ) : (
                              <div className='text-center text-2xl mt-8 bg-gray-100 p-5 rounded-md flex items-center justify-center min-h-[305px]'>No products found</div>
                            )}
                          </ul>
                        ) : (
                          <div className="mt-8 bg-gray-100 p-5 rounded-md flex min-h-[305px] items-center justify-center">
                              <PacmanLoader color="#ffbe33" />
                          </div>
                          
                        )}
                        <button className='absolute top-4 right-4' onClick={() => setIsSearchModal(false)}>
                            <FaRegTimesCircle size={25} className='hover:text-primary transition-all' />
                        </button>
                    </div>
                </div>
            </div>
        </OutsideClickHandler>
    </div>
  )
}

export default Search