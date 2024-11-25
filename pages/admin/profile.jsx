import React from 'react'
import Image from 'next/image'
import Product from '../../components/admin/Product'
import Order from '../../components/admin/Order'
import Category from '../../components/admin/Category'
import Footer from '../../components/admin/Footer'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useRouter } from 'next/router'


const Profile = () => {

    const [tabs, setTabs] = React.useState(0);
    const { push } = useRouter();

    const closeAdminAccount = async () => {
        try {
            if(confirm("Are you sure you want to logout?")) {
                const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin`);
                if (res.status === 200) {
                    push('/admin');
                    toast.success('Logout Success');
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <div className='container mx-auto px-5 md:px-0'>
        <div className='flex flex-1 min-h-[calc(100vh_-_465px)] gap-x-10 md:flex-row flex-col'>
            <div className='w-full md:w-64'>
                <div className='relative flex flex-col items-center gap-y-1 p-10 border border-b-0'>
                    <Image src="/images/admin.png" alt="" width={100} height={100} className='rounded-full'/>
                    <span className='font-bold text-2xl'>Admin</span>
                </div>
                <ul className='w-full font-semibold'>
                    <li onClick={() => setTabs(0)} className={`border w-full p-3 flex items-center justify-center gap-x-2 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 0 && 'bg-primary text-white' }`}>
                        <i class="fa-solid fa-cutlery"></i>
                        <button>Products</button>
                    </li>
                    <li onClick={() => setTabs(1)} className={`border w-full p-3 flex items-center justify-center gap-x-2 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 1 && 'bg-primary text-white' }`}>
                        <i class="fa fa-solid fa-motorcycle"></i>
                        <button>Orders</button>
                    </li>
                    <li onClick={() => setTabs(2)} className={`border w-full p-3 flex items-center justify-center gap-x-2 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 2 && 'bg-primary text-white' }`}>
                        <i class="fa-solid fa-list"></i>
                        <button>Categories</button>
                    </li>
                    <li onClick={() => setTabs(3)} className={`border w-full p-3 flex items-center justify-center gap-x-2 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 3 && 'bg-primary text-white' }`}>
                        <i class="fa-solid fa-table"></i>
                        <button>Footer</button>
                    </li>
                    <li onClick={closeAdminAccount} className='border w-full p-3 flex items-center justify-center gap-x-2 cursor-pointer hover:bg-primary hover:text-white transition-all'>
                        <i class="fa-solid fa-right-from-bracket"></i>
                        <button>Logout</button>
                    </li>
                </ul>
            </div>
            {tabs === 0 && ( <Product /> )}
            {tabs === 1 && ( <Order /> )}
            {tabs === 2 && ( <Category /> )}
            {tabs === 3 && ( <Footer /> )}
        </div>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req.cookies || "";
    if (myCookie.token !== process.env.ADMIN_TOKEN) {
        return {
            redirect: {
                destination: '/admin',
                permanent: false,
            },
        }
    }
    return {
        props: {},
    }
}

export default Profile