import React, { useState } from 'react'
import Logo from '../ui/Logo'
import {FaUserAlt, FaShoppingCart, FaSearch, FaRegTimesCircle} from 'react-icons/fa'
import { GiHamburgerMenu } from "react-icons/gi";
import Search from '../ui/Search';
import { useRouter } from 'next/router';
import Link from 'next/link';


const Header = () => {
   const [isSearchModal, setIsSearchModal] = useState(false)
   const [isMenuModal, setIsMenuModal] = useState(false)

   const router = useRouter()



  return (
    <div className={`h-[88px] z-40 relative ${router.asPath === "/" ? 'bg-transparent' : 'bg-secondary'}`}>
        <div className="container px-5 md:px-0 flex justify-between items-center h-full mx-auto text-white">
            <div>
                <Logo />
            </div>
            <nav className={`sm:static absolute top-0 left-0 sm:h-auto h-screen sm:w-auto w-full text-black sm:text-white sm:bg-transparent bg-white sm:flex hidden ${isMenuModal === true && "!grid place-content-center"}`}>
                <ul className='flex gap-x-2 sm:flex-row flex-col justify-center items-center'>
                    <li className='px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer'>
                        <Link href="/">Home</Link>
                    </li> 
                    <li className='px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer'>
                        <Link href="/menu">Menu</Link>
                    </li>
                    <li className='px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer'>
                        <Link href="/about">About</Link>
                    </li>
                    <li className='px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer'>
                        <Link href="/reservation">Book Table</Link>
                    </li>
                </ul>
                {isMenuModal &&
                    <button className='absolute top-4 right-4' onClick={() => setIsMenuModal(false)}>
                        <FaRegTimesCircle size={25} className='hover:text-primary transition-all' />
                    </button>
                }
            </nav>
            <div className='flex gap-x-4 items-center '>
                <Link href="/auth/login">
                    <FaUserAlt className='hover:text-primary transition-all cursor-pointer' />
                </Link>
                <Link href="/">
                    <FaShoppingCart className='hover:text-primary transition-all'/>
                </Link>
                <button onClick={() => setIsSearchModal(true)}>
                    <FaSearch className='hover:text-primary transition-all' />
                </button>
                <Link href="/" className='md:inline-block hidden'>
                    <button className='btn-primary'>Order Online</button>
                </Link>
                <button className='inline-block sm:hidden' onClick={() => setIsMenuModal(true)}>
                    <GiHamburgerMenu className='text-xl hover:text-primary transition-all' />
                </button>
            </div>
        </div>
        {isSearchModal && <Search setIsSearchModal={setIsSearchModal} />}

    </div>
  )
}

export default Header