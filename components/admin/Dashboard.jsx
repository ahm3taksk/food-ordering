import React from 'react'
import { useEffect } from 'react'
import Title from '../ui/Title'


const Dashboard = () => {
    
    useEffect(() => {    
        document.title = 'Dashboard | Admin'


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
                        <p className='text-3xl font-bold mt-5'>10</p>
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
                        <p className='text-3xl font-bold mt-5'>10</p>
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
                        <p className='text-3xl font-bold mt-5'>10</p>
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
                        <p className='text-3xl font-bold mt-5'>10</p>
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
                        <p className='text-3xl font-bold mt-5'>10</p>
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
                        <p className='text-3xl font-bold mt-5'>10</p>
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