import React from 'react'
import OutsideClickHandler from 'react-outside-click-handler';
import Title from '../ui/Title';
import Image from 'next/image';
import { FaRegTimesCircle } from 'react-icons/fa';

const Search = ({setIsSearchModal}) => {
    

  return (
    <div className='fixed top-0 left-0 w-screen h-screen z-50 after:content-[""] after:w-screen after:h-screen after:absolute after:top-0 after:left-0 grid place-content-center'>
        <OutsideClickHandler onOutsideClick={() => setIsSearchModal(false)}>
            <div className='w-full h-full grid place-content-center relative'>
                <div className='relative z-50 md:w-[600px] w-[370px] bg-white border-2 border-gray-300 rounded-md p-10'>
                    <Title addClass='text-[40px] text-center' >Search</Title>
                    <input type="text" className='w-full h-[50px] border-2 border-gray-300 rounded-md px-3 mt-5 focus:outline-primary' placeholder='Search here...' />
                    <div>
                        <ul className='mt-8'>
                            <li className='flex items-center justify-between p-1 px-3 rounded-md hover:bg-primary transition-all'>
                                <div className='relative flex'>
                                    <Image src='/images/f1.png' width={48} height={48} />
                                </div>
                                <span className='font-bold'>Good Pizza</span>
                                <span className='font-bold'>$10</span>
                            </li>
                            <li className='flex items-center justify-between p-1 px-3 rounded-md hover:bg-primary transition-all'>
                                <div className='relative flex'>
                                    <Image src='/images/f1.png' width={48} height={48} />
                                </div>
                                <span className='font-bold'>Great Pizza</span>
                                <span className='font-bold'>$10</span>
                            </li>
                            <li className='flex items-center justify-between p-1 px-3 rounded-md hover:bg-primary transition-all'>
                                <div className='relative flex'>
                                    <Image src='/images/f1.png' width={48} height={48} />
                                </div>
                                <span className='font-bold'>Good Pizza</span>
                                <span className='font-bold'>$10</span>
                            </li>
                        </ul>
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