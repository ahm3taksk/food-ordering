import React, { useState } from 'react'
import  Logo from '../ui/Logo'
import {FaUserAlt, FaShoppingCart, FaSearch, FaRegTimesCircle} from 'react-icons/fa'
import { GiHamburgerMenu } from "react-icons/gi";
import Search from '../ui/Search';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector } from 'react-redux';


const Header = () => {
   const [isSearchModal, setIsSearchModal] = useState(false)
   const [isMenuModal, setIsMenuModal] = useState(false)
   const cart = useSelector((state) => state.cart)

   const router = useRouter()

  return (
    <div className={`h-[88px] z-40 relative w-full ${router.asPath === "/" ? 'bg-transparent' : 'bg-secondary !fixed'}`}>
        <div className="container px-5 md:px-0 flex justify-between items-center h-full mx-auto text-white">
            <div>
                <Logo />
            </div>
            <nav className={`sm:static absolute z-50 top-0 left-0 sm:h-auto h-screen sm:w-auto w-full text-black sm:text-white sm:bg-transparent bg-secondary sm:flex hidden ${isMenuModal === true && "!grid place-content-center"}`}>
                <ul className='flex gap-x-2 sm:flex-row flex-col justify-center items-center'>
                    <li className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${router.asPath === "/" ? 'text-primary' : 'text-white'}`}  onClick={() => setIsMenuModal(false)}>
                        <Link href="/">Home</Link>
                    </li> 
                    <li className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${router.asPath === "/menu" ? 'text-primary' : 'text-white'}`} onClick={() => setIsMenuModal(false)}>
                        <Link href="/menu">Menu</Link>
                    </li>
                    <li className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${router.asPath === "/about" ? 'text-primary' : 'text-white'}`} onClick={() => setIsMenuModal(false)}>
                        <Link href="/about">About</Link>
                    </li>
                    <li className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${router.asPath === "/reservation" ? 'text-primary' : 'text-white'}`} onClick={() => setIsMenuModal(false)}>
                        <Link href="/reservation">Book Table</Link>
                    </li>
                </ul>
                {isMenuModal &&
                    <button className='absolute top-4 right-4' onClick={() => setIsMenuModal(false)}>
                        <FaRegTimesCircle size={25} className='text-white hover:text-primary transition-all' />
                    </button>
                }
            </nav>
            <div className='flex gap-x-4 items-center '>
                <Link href="/auth/login">
                    <FaUserAlt size={18} className={`hover:text-primary transition-all cursor-pointer ${router.asPath.includes('profile') || router.asPath.includes('auth')  ? 'text-primary' : 'text-white'}`} />
                </Link>
                <Link href="/cart">
                    <span className='relative'>
                        <FaShoppingCart size={18} className={`hover:text-primary transition-all ${router.asPath === "/cart" ? 'text-primary' : 'text-white'}`}/>
                        <span className='w-4 h-4 absolute -top-2.5 -right-3  flex justify-center items-center rounded-full bg-primary text-xs text-black font-bold'>
                            {cart.products.length === 0 ? "0" : cart.products.length}
                        </span>
                    </span>
                    
                </Link>
                <button onClick={() => setIsSearchModal(true)}>
                    <FaSearch size={18} className='hover:text-primary transition-all' />
                </button>
                <Link href="/" className='md:inline-block hidden'>
                    <button className='btn-primary'>Order Online</button>
                </Link>
                <button className='inline-block sm:hidden' onClick={() => setIsMenuModal(true)}>
                    <GiHamburgerMenu size={18} className='text-xl hover:text-primary transition-all' />
                </button>
            </div>
        </div>
        {isSearchModal && <Search setIsSearchModal={setIsSearchModal} />}

    </div>
  )
}

export default Header