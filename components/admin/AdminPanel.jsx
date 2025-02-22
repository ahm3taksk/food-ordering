import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Dashboard from './Dashboard';
import Product from './Product';
import Order from './Order';
import Reservation from './Reservation';
import Category from './Category';
import Footer from './Footer';
import Link from 'next/link';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';

const AdminPanel = () => {
    const [tabs, setTabs] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { push } = useRouter();

    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = 'hidden';  // Kaydırmayı kapat
            document.body.style.height = '100vh';
        } else {
            document.body.style.overflow = '';  // Kaydırmayı aç
            document.body.style.height = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.height = '';
        };
    }, [sidebarOpen]);

    const closeAdminAccount = async () => {
        try {
            if (confirm('Are you sure you want to logout?')) {
                const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin`);
                if (res.status === 200) {
                    push('/admin/login');
                    toast.success('Logout Success');
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="w-full h-screen mx-auto -mt-[88px]">
            <div className="flex flex-1 md:flex-row flex-col w-full">
                <div
                    className={`${
                        sidebarOpen ? 'h-screen md:w-64 items-start' : 'md:w-20 items-start'
                    } transition-all duration-300 bg-gray-800 text-white p-5 md:min-h-screen relative z-50 w-full`}
                >
                    <button
                        className="text-white text-xl mb-5 w-full flex justify-center items-center gap-2"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <i className='fa fa-bars' />
                        <span className={`${sidebarOpen ? 'hidden md:block ' : 'block md:hidden'}`}>Menu</span>
                    </button>

                    <div className="relative flex-row md:flex-col items-center gap-y-1 mb-10 hidden md:flex">
                        <Image
                            src="/images/admin.png"
                            alt="Admin Image"
                            width={100}
                            height={100}
                            className="rounded-full"
                        />
                        {sidebarOpen && <span className="font-bold text-2xl">Admin</span>}
                    </div>

                    <ul className={`${sidebarOpen ? 'flex flex-col gap-2 w-full' : 'flex-col gap-2 md:flex hidden'}`}>
                        <li
                            onClick={() => {
                                setSidebarOpen(false);
                                setTabs(0);
                            }}
                            className={`rounded-md w-full p-3 flex items-center justify-start gap-x-2 cursor-pointer hover:bg-primary hover:text-white transition-all ${
                                tabs === 0 && 'bg-primary text-white'
                            }`}
                        >
                            <i className="fa-solid fa-tachometer" />
                            {sidebarOpen && <button>Dashboard</button>}
                        </li>
                        <li
                            onClick={() => {
                                setSidebarOpen(false);
                                setTabs(1);
                            }}
                            className={`rounded-md w-full p-3 flex items-center justify-start gap-x-2 cursor-pointer hover:bg-primary hover:text-white transition-all ${
                                tabs === 1 && 'bg-primary text-white'
                            }`}
                        >
                            <i className="fa-solid fa-cutlery" />
                            {sidebarOpen && <button>Products</button>}
                        </li>
                        <li
                            onClick={() => {
                                setSidebarOpen(false);
                                setTabs(2);
                            }}
                            className={`rounded-md w-full p-3 flex items-center justify-start gap-x-2 cursor-pointer hover:bg-primary hover:text-white transition-all ${
                                tabs === 2 && 'bg-primary text-white'
                            }`}
                        >
                            <i className="fa fa-solid fa-motorcycle" />
                            {sidebarOpen && <button>Orders</button>}
                        </li>
                        <li
                            onClick={() => {
                                setSidebarOpen(false);
                                setTabs(3);
                            }}
                            className={`rounded-md w-full p-3 flex items-center justify-start gap-x-2 cursor-pointer hover:bg-primary hover:text-white transition-all ${
                                tabs === 3 && 'bg-primary text-white'
                            }`}
                        >
                            <i className="fa-regular fa-calendar" />
                            {sidebarOpen && <button>Reservations</button>}
                        </li>
                        <li
                            onClick={() => {
                                setSidebarOpen(false);
                                setTabs(4);
                            }}
                            className={`rounded-md w-full p-3 flex items-center justify-start gap-x-2 cursor-pointer hover:bg-primary hover:text-white transition-all ${
                                tabs === 4 && 'bg-primary text-white'
                            }`}
                        >
                            <i className="fa-solid fa-list" />
                            {sidebarOpen && <button>Categories</button>}
                        </li>
                        <li
                            onClick={() => {
                                setSidebarOpen(false);
                                setTabs(5);
                            }}
                            className={`rounded-md w-full p-3 flex items-center justify-start gap-x-2 cursor-pointer hover:bg-primary hover:text-white transition-all ${
                                tabs === 5 && 'bg-primary text-white'
                            }`}
                        >
                            <i className="fa-solid fa-table" />
                            {sidebarOpen && <button>Footer</button>}
                        </li>
                        <li className={`rounded-md w-full p-3 flex items-center justify-start gap-x-2 cursor-pointer hover:bg-primary hover:text-white transition-all`}>
                            <Link href="/" className='flex items-center justify-start gap-x-2'>
                                <i className="fa-solid fa-home" />
                                {sidebarOpen && <button> Home Page </button>}
                            </Link>
                        </li>
                        <li
                            onClick={closeAdminAccount}
                            className="rounded-md w-full p-3 flex items-center justify-start gap-x-2 cursor-pointer hover:bg-primary hover:text-white transition-all"
                        >
                            <i className="fa-solid fa-right-from-bracket" />
                            {sidebarOpen && <button>Logout</button>}
                        </li>
                    </ul>
                </div>

                {/* Content */}
                <div className="flex-1 p-5 bg-gray-200 shadow-md m-2 rounded-md">
                    {tabs === 0 && <Dashboard />}
                    {tabs === 1 && <Product />}
                    {tabs === 2 && <Order />}
                    {tabs === 3 && <Reservation />}
                    {tabs === 4 && <Category />}
                    {tabs === 5 && <Footer />}
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req.cookies || '';
    if (myCookie.token !== process.env.ADMIN_TOKEN) {
        return {
            redirect: {
                destination: '/admin/login',
                permanent: false,
            },
        };
    }
    return {
        props: {},
    };
};

export default AdminPanel;
