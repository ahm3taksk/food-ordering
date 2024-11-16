import Image from 'next/image'
import Title from './ui/Title'
import { FaShoppingCart } from 'react-icons/fa'

const CampaignItem = () => {
    return (
        <div className='bg-secondary flex-1 rounded-md py-5 px-[15px] flex items-center gap-x-4 flex-col sm:flex-row'>
            <div className='relative sm:w-44 sm:h-44 w-36 h-36 after:content-[""] border-[5px] border-primary rounded-full overflow-hidden'>
                <Image src="/images/o1.jpg" alt="" layout='fill' objectFit='cover' className='hover:scale-110 transition-all'/>
            </div>
            <div className='text-white text-center sm:text-start'>
                <Title addClass={'text-2xl'}>Tasty Thursdays</Title>
                <div className='font-dancing my-1'>
                    <span className='text-[40px]'>20%</span>
                    <span className='text-small inline-block ml-1'>Off</span>
                </div>
                <button className='btn-primary flex items-center gap-x-2'>Order Now  <FaShoppingCart scale={20}/></button>
            </div>
        </div>
    )
}

const Campaigns = () => {
  return (
    <div className="flex container mx-auto py-20 gap-6 flex-wrap px-5 md:px-0">
        <CampaignItem />
        <CampaignItem />
    </div>
  )
}

export default Campaigns