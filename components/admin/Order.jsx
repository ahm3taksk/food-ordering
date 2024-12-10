import Title from '../ui/Title'

const Order = () => {
  return (
    <div className='p-0 pb-8 flex-1 flex flex-col items-center md:items-start'>
    <Title addClass={"text-[40px]"}>Orders</Title>
    <div className='overflow-x-auto w-full mt-5'>
        <table className='w-full text-sm text-center text-gray-500 min-w[1000px]'>
            <thead className='text-xs text-gray-400 uppercase bg-gray-700'>
                <tr>
                    <th className='py-3 px-6' scope='col'>PRODUCT</th>
                    <th className='py-3 px-6' scope='col'>CUSTOMER</th>
                    <th className='py-3 px-6' scope='col'>TOTAL</th>
                    <th className='py-3 px-6' scope='col'>PAYMENT</th>
                    <th className='py-3 px-6' scope='col'>STATUS</th>
                    <th className='py-3 px-6' scope='col'>ACTION</th>
                </tr>
            </thead>
            <tbody>
                <tr className='bg-secondary border-gray-700 hover:bg-primary transition-all'>
                    <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>191235</td>
                    <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>Ahmet Dursun</td>
                    <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>$35.5</td>
                    <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>Cash</td>
                    <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>Preparing</td>
                    <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>
                        <button className="btn-primary !bg-success">Next Stage</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
  )
}

export default Order