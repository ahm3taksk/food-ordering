import React from 'react'
import Image from 'next/image'
import Account from '../../components/profile/Account'
import Password from '../../components/profile/Password';
import Orders from '../../components/profile/Orders';

const Profile = () => {

    const [tabs, setTabs] = React.useState(0);



  return (
    <div className='container mx-auto px-5 md:px-0'>
        <div className='flex flex-1 min-h-[calc(100vh_-_465px)] gap-x-10 md:flex-row flex-col'>
            <div className='w-full md:w-64'>
                <div className='relative flex flex-col items-center gap-y-1 p-10 border border-b-0'>
                    <Image src="/images/profile.png" alt="" width={100} height={100} className='rounded-full'/>
                    <span className='font-bold text-2xl'>Sabri Abi</span>
                </div>
                <ul className='w-full font-semibold'>
                    <li onClick={() => setTabs(0)} className={`border w-full p-3 flex items-center justify-center gap-x-2 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 0 && 'bg-primary text-white' }`}>
                        <i class="fa-solid fa-house"></i>
                        <button>Account</button>
                    </li>
                    <li onClick={() => setTabs(1)} className={`border w-full p-3 flex items-center justify-center gap-x-2 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 1 && 'bg-primary text-white' }`}>
                        <button>Password</button>
                    </li>
                    <li onClick={() => setTabs(2)} className={`border w-full p-3 flex items-center justify-center gap-x-2 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 2 && 'bg-primary text-white' }`}>
                        <i class="fa-solid fa-boxes-stacked"></i>
                        <button>Orders</button>
                    </li>
                    <li onClick={() => setTabs(3)} className={`border w-full p-3 flex items-center justify-center gap-x-2 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 3 && 'bg-primary text-white' }`}>
                        <i class="fa-solid fa-right-from-bracket"></i>
                        <button>Logout</button>
                    </li>
                </ul>
            </div>
            {tabs === 0 && ( <Account /> )}
            {tabs === 1 && ( <Password /> )}
            {tabs === 2 && ( <Orders /> )}
        </div>
    </div>
  )
}

export default Profile