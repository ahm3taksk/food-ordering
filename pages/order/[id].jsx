import Image from 'next/image'
import axios from 'axios'
import Title from '../../components/ui/Title'

const Index = ({order}) => {
    const sizes = {
        0: 'Small',
        1: 'Medium',
        2: 'Large',
        3: 'Party'
    };

  return (
    <div className='overflow-x-auto'> 
        <div className="min-h-[calc(100vh_-_433px)] flex justify-center items-center flex-col p-10  min-w-[1000px]">
            <Title addClass='text-[40px] mb-4'>Order Details</Title>
            <div className='flex items-center flex-1 w-full'>
                
                {/* <table className='w-full text-sm text-center text-gray-500'>
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
                </table> */}
                <div className='flex w-full gap-4 text-white'>
                    <div className='w-5/6 flex flex-col bg-secondary rounded-xl p-4'>
                        <h1 className='text-xl font-bold'>Products:</h1>
                        <div className='flex flex-wrap gap-4'>
                            {order?.products.map(product => (
                                <div key={product._id} className='flex w-[480px] items-center gap-4'>
                                    <div className='flex justify-start items-center w-full gap-4 border border-gray-500 p-4 rounded-md'>
                                        <div className='flex items-center gap-4'>
                                            <div className='relative w-20 h-20'>
                                                <Image src={product.img} alt='' layout='fill' />
                                            </div>
                                            <div className='flex flex-col w-[200px]'>
                                                <span className='font-semibold'>{product.title}</span>
                                                <span className='text-sm'>Quantity: {product.quantity}</span>
                                                {product.size && product.category === 'pizza' && <span className='text-sm'>Size: {sizes[product.size]}</span> ? <span className='text-sm'>Size: {sizes[product.size]}</span> : null}
                                                <span className='text-sm'>Extras: {product.extras?.length ? product.extras.map(extra => extra.text).join(", ") : "No extras"}</span>
                                            </div>
                                        </div>
                                        <span className='font-semibold w-full text-end'>${(Number(product.price) * product.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='w-1/6 bg-secondary rounded-xl p-4'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex items-center gap-x-1 flex-wrap'>
                                <span className='font-semibold'>Order ID: </span>
                                <span className=''> {order?._id} </span>
                            </div>
                            <div className='flex items-center gap-x-1 flex-wrap'>
                                <span className='font-semibold'>Customer:</span>
                                <span className=''> {order?.customer}</span>
                            </div>
                            <div className='flex items-center gap-x-1 flex-wrap'>
                                <span className='font-semibold'>Address:</span>
                                <span className=''> {order?.address}</span>
                            </div>
                            <div className='flex items-center gap-x-1 flex-wrap'>
                                <span className='font-semibold'>Total:</span>
                                <span className=''> ${order?.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
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