import Image from 'next/image'
import { FaShoppingCart } from 'react-icons/fa'
import Link from 'next/link'
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const MenuItem = ({ product }) => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(addProduct({...product, extras: [], price: product.prices[0], quantity: 1}));
    }

  return (
    <div className='bg-secondary rounded-3xl'>
        <div className='w-full min-h-[210px] h-[210px] bg-[#f1f2f3] grid place-content-center rounded-bl-[46px] rounded-tl-2xl rounded-tr-2xl'>
            <Link href={`/product/${product._id}`}>
                <div className='relative w-36 h-36 hover:scale-110 transition-all'>
                    <Image src={product.img} alt='' layout='fill' priority />
                </div>
            </Link>
        </div>
        <div className='p-[25px] text-white min-h-[210px]'>
            <div className='min-h-[110px]'>
                <h4 className='text-2xl font-semibold'>{product.title}</h4>
                <p className='text-[15]'>{product.description.substring(0, 100)}...</p>
            </div>
            <div className='flex justify-between items-center'>
                <span>${product.prices[0]}</span>
                {/* disabled when quantity of this item more than 10 */}
                <button className='btn-primary !w-10 !h-10 !rounded-full !p-0 grid place-content-center'  onClick={handleClick} disabled={cart.products.find(item => item._id === product._id)?.quantity >= 10}>
                    <FaShoppingCart />
                </button>
            </div>
        </div>

    </div>
  )
}

export default MenuItem