import Image from 'next/image'
import axios from 'axios'

const Index = ({order}) => {
  return (
    <div className='overflow-x-auto'> 
        <div className="min-h-[calc(100vh_-_433px)] flex justify-center items-center flex-col p-10  min-w-[1000px]">
            <div className='flex items-center flex-1 w-full max-h-28'>
                <table className='w-full text-sm text-center text-gray-500'>
                    <thead className='text-xs text-gray-400 uppercase bg-gray-700'>
                        <tr>
                            <th className='py-3 px-6' scope='col'>ORDER ID</th>
                            <th className='py-3 px-6' scope='col'>CUSTOMER</th>
                            <th className='py-3 px-6' scope='col'>ADDRESS</th>
                            <th className='py-3 px-6' scope='col'>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='bg-secondary border-gray-700 hover:bg-primary transition-all'>
                            <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>
                                {order?._id}
                            </td>
                            <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>{order?.customer}</td>
                            <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>{order?.address}</td>
                            <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>${order?.total}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='flex justify-between w-full p-10 bg-primary mt-6'>
                <div className='relative flex flex-col items-center'>
                    <Image src="/images/paid.png" alt="" width={40} height={40} objectFit='contain'/>
                    <span>Payment</span>
                </div> 
                <div className={`relative flex flex-col items-center ${order?.status === 0 && 'animate-pulse'}`}>
                    <Image src="/images/bake.png" alt="" width={40} height={40} objectFit='contain'/>
                    <span>Preparing</span>
                    </div>
                <div className={`relative flex flex-col items-center ${order?.status === 1 && 'animate-pulse'}`}>
                    <Image src="/images/bike.png" alt="" width={40} height={40} objectFit='contain'/>
                    <span>On the way</span>
                </div>
                <div className={`relative flex flex-col items-center ${order?.status === 2 && 'animate-pulse'}`}>
                    <Image src="/images/delivered.png" alt="" width={40} height={40} objectFit='contain'/>
                    <span>Delivered</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export const getServerSideProps = async ({params}) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/${params.id}`);
    return {
        props: {
            order: res.data ? res.data : [],
        }
    }
}

export default Index