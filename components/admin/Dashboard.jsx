import React, { useEffect, useState } from 'react'
import Title from '../ui/Title'
import axios from 'axios'


const Dashboard = () => {
    const [data, setData] = useState({
        totalProducts: 0,
        totalOrders: 0,
        confirmedReservations: 0,
        pendingReservations: 0,
        revenueToday: 0,
        revenueThisWeek: 0,
        revenueThisMonth: 0,
        revenueThisYear: 0,
    })

    useEffect(() => {    
        document.title = 'Dashboard | Admin'
        
        const fetchData = async () => {
            try {
                const [productsRes, ordersRes, reservationsRes] = await Promise.all([
                    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`),
                    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`),
                    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reservations`),
                ])

                // Tarih ayarları
                const today = new Date()

                // Haftanın başlangıcı (Pazartesi)
                const startOfWeek = new Date(today)
                startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1))

                // Ayın başlangıcı
                const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

                // Yılın başlangıcı
                const startOfYear = new Date(today.getFullYear(), 0, 1)

                // Gelir değişkenleri
                let revenueToday = 0
                let revenueThisWeek = 0
                let revenueThisMonth = 0
                let revenueThisYear = 0

                ordersRes.data.forEach(order => {
                    const orderDate = new Date(order.createdAt)
                    const orderTotal = parseFloat(order.total) || 0

                    // Günlük
                    if (orderDate.toDateString() === today.toDateString()) {
                        revenueToday += orderTotal
                    }

                    // Haftalık
                    if (orderDate >= startOfWeek) {
                        revenueThisWeek += orderTotal
                    }

                    // Aylık
                    if (orderDate >= startOfMonth) {
                        revenueThisMonth += orderTotal
                    }

                    // Yıllık
                    if (orderDate >= startOfYear) {
                        revenueThisYear += orderTotal
                    }
                })

                // Rezervasyonlar
                const confirmedCount = reservationsRes.data.filter(res => res.status === 1).length
                const pendingCount = reservationsRes.data.filter(res => res.status === 0).length

                // State güncelleme
                setData({
                    totalProducts: productsRes.data.length,
                    totalOrders: ordersRes.data.length,
                    confirmedReservations: confirmedCount,
                    pendingReservations: pendingCount,
                    revenueToday: revenueToday.toFixed(2),
                    revenueThisWeek: revenueThisWeek.toFixed(2),
                    revenueThisMonth: revenueThisMonth.toFixed(2),
                    revenueThisYear: revenueThisYear.toFixed(2),
                })
            } catch (error) {
                console.error("Error fetching dashboard data:", error)
            }
        }

        fetchData()
    }, [])


  return (
    <div className='w-full md:max-h-[calc(100vh_-_200px)] pb-5'>
        <Title addClass={"text-[40px]"}>Dashboard</Title>
        <div className='md:h-[calc(100vh_-_200px)] md:max-h-[calc(100vh_-_200px)] w-full mt-5'>
            <div className='flex flex-col md:flex-row flex-wrap gap-5 text-white'>
                <div className='w-full md:w-1/6 bg-secondary py-5 rounded-md shadow-md flex flex-col justsify-center items-center gap-2'> 
                    <div className=' flex justify-center items-center'>
                        <span className='text-4xl w-20 h-20 bg-primary rounded-full flex justify-center items-center'>
                            <i className="fas fa-utensils"></i>
                        </span>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='text-xl font-bold text-center'>Total Products</h2>
                        <p className='text-3xl font-bold mt-5'>{data.totalProducts}</p>
                    </div>
                </div>
                <div className='w-full md:w-1/6 bg-secondary py-5 rounded-md shadow-md flex flex-col justsify-center items-center gap-2'>
                    <div className=' flex justify-center items-center'>
                        <span className='text-4xl w-20 h-20 bg-primary rounded-full flex justify-center items-center'>
                            <i className="fas fa-motorcycle"></i>
                        </span>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='text-xl font-bold text-center'>Total Orders</h2>
                        <p className='text-3xl font-bold mt-5'>{data.totalOrders}</p>
                    </div>
                </div>
                <div className='w-full md:w-1/6 bg-secondary py-5 rounded-md shadow-md flex flex-col justsify-center items-center gap-2'>
                    <div className=' flex justify-center items-center'>
                        <span className='text-4xl w-20 h-20 bg-primary rounded-full flex justify-center items-center'>
                            <i className="fas fa-calendar"></i>
                        </span>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='text-xl font-bold text-center'>Confirmed Reservations</h2>
                        <p className='text-3xl font-bold mt-5'>{data.confirmedReservations}</p>
                    </div>
                </div>
                <div className='w-full md:w-1/6 bg-secondary py-5 rounded-md shadow-md flex flex-col justsify-center items-center gap-2'>
                    <div className=' flex justify-center items-center'>
                        <span className='text-4xl w-20 h-20 bg-primary rounded-full flex justify-center items-center'>
                            <i className="fas fa-calendar"></i>
                        </span>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='text-xl font-bold text-center'>Pending Reservations</h2>
                        <p className='text-3xl font-bold mt-5'>{data.pendingReservations}</p>
                    </div>
                </div>
                <div className='w-full md:w-1/6 bg-secondary py-5 rounded-md shadow-md flex flex-col justsify-center items-center gap-2'>
                    <div className=' flex justify-center items-center'>
                        <span className='text-4xl w-20 h-20 bg-primary rounded-full flex justify-center items-center'>
                            <i className="fas fa-dollar"></i>
                        </span>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='text-xl font-bold text-center'>Revenue Today</h2>
                        <p className='text-3xl font-bold mt-5'>${data.revenueToday}</p>
                    </div>
                </div>
                <div className='w-full md:w-1/6 bg-secondary py-5 rounded-md shadow-md flex flex-col justsify-center items-center gap-2'>
                    <div className=' flex justify-center items-center'>
                        <span className='text-4xl w-20 h-20 bg-primary rounded-full flex justify-center items-center'>
                        <i class="fa-solid fa-chart-simple"></i>
                        </span>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='text-xl font-bold text-center'>Revenue This Week</h2>
                        <p className='text-3xl font-bold mt-5'>${data.revenueThisWeek}</p>
                    </div>
                </div>
                <div className='w-full md:w-1/6 bg-secondary py-5 rounded-md shadow-md flex flex-col justsify-center items-center gap-2'>
                    <div className=' flex justify-center items-center'>
                        <span className='text-4xl w-20 h-20 bg-primary rounded-full flex justify-center items-center'>
                        <i class="fa-solid fa-chart-simple"></i>
                        </span>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='text-xl font-bold text-center'>Revenue This Month</h2>
                        <p className='text-3xl font-bold mt-5'>${data.revenueThisMonth}</p>
                    </div>
                </div>
                <div className='w-full md:w-1/6 bg-secondary py-5 rounded-md shadow-md flex flex-col justsify-center items-center gap-2'>
                    <div className=' flex justify-center items-center'>
                        <span className='text-4xl w-20 h-20 bg-primary rounded-full flex justify-center items-center'>
                        <i class="fa-solid fa-chart-simple"></i>
                        </span>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='text-xl font-bold text-center'>Revenue This Year</h2>
                        <p className='text-3xl font-bold mt-5'>${data.revenueThisYear}</p>
                    </div>
                </div>
                
                {/* <div className='w-1/4 bg-secondary p-5 rounded-md shadow-md flex justsify-between items-center'> 
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='text-xl font-bold'>Pending Reservations</h2>
                        <p className='text-3xl font-bold mt-5'>10</p>
                    </div>
                    <div className=' flex justify-center items-center'>
                        <span className='text-4xl w-20 h-20 bg-primary rounded-full flex justify-center items-center'>
                            <i class="fa-regular fa-calendar"></i>
                        </span>
                    </div>
                </div>
                <div className='w-1/4 bg-secondary p-5 rounded-md shadow-md flex justsify-between items-center'> 
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='text-xl font-bold'>Confirmed Reservations</h2>
                        <p className='text-3xl font-bold mt-5'>10</p>
                    </div>
                    <div className='flex justify-center items-center'>
                        <span className='text-4xl w-20 h-20 bg-primary rounded-full flex justify-center items-center'>
                            <i class="fa-solid fa-calendar"></i>
                        </span>
                    </div>
                </div>
                <div className='w-1/3 bg-secondary p-5 rounded-md shadow-md flex justsify-between items-center'> 
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='text-xl font-bold'>Revenue Today</h2>
                        <p className='text-2xl font-bold mt-5'>10</p>
                    </div>
                    <div className='flex justify-center items-center'>
                        <span className='text-4xl w-20 h-20 bg-primary rounded-full flex justify-center items-center'>
                            <i class="fa-solid fa-wallet"></i>
                        </span>
                    </div>
                </div>
                <div className='w-1/3 bg-secondary p-5 rounded-md shadow-md flex justsify-between items-center'> 
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='text-xl font-bold'>Revenue Today</h2>
                        <p className='text-2xl font-bold mt-5'>10</p>
                    </div>
                    <div className='flex justify-center items-center'>
                        <span className='text-4xl w-20 h-20 bg-primary rounded-full flex justify-center items-center'>
                            <i class="fa-solid fa-wallet"></i>
                        </span>
                    </div>
                </div> */}
            </div>
        </div>
    </div>
  )
}

export default Dashboard