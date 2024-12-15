import { useState, useEffect } from 'react'
import Title from '../ui/Title'
import MenuItem from './MenuItem'

const MenuWrapper = ({categoryList, productList}) => {

  const [active, setActive] = useState(0)
  const [filter, setFilter] = useState(0)
  const [productLimit, setProductLimit] = useState(6)

  useEffect(() => {
    if(categoryList[active].title === 'All') {
      setFilter(productList)
    } else {
      const filtered = productList.filter(product => product.category === categoryList[active].title.toLowerCase())
      setFilter(filtered)
    }
  }, [categoryList, productList, active])
  

  return (
    <div className='container mx-auto mt-5 mb-16 px-5 md:px-0'>
        <div className='flex flex-col items-center w-full'>
            <Title addClass={"text-[40px]"}>Our Menu</Title>
            <div className='mt-10 flex-wrap justify-center items-center flex gap-2'> 
                {categoryList && categoryList.map((category, index) => (
                    <button className={`px-6 py-2  rounded-3xl hover:bg-secondary hover:text-white transition-all ${index === active && "bg-secondary text-white" }`} key={category._id} onClick={() => {
                      setActive(index)
                      setProductLimit(6)
                    }}>
                      {category.title}
                    </button>
                  ))}
            </div>
        </div>
        <div className= {`mt-8 grid grid-cols-1 gap-4 min-h-[400px]: ${filter.length > 0 && 'md:grid-cols-3 sm:grid-cols-2 grid-cols-1'}` }>
            {filter.length > 0 ? filter.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, productLimit).map((product) => (
              <MenuItem key={product._id} product={product}/>
            )) 
            :  <div className='w-full h-60 bg-[#f1f2f3] flex justify-center items-center rounded-[46px]'> 
                <h1 className='text-2xl'>We are currently out of stock on this category</h1>
              </div>
            }
        </div>
        <div className='flex justify-center items-center w-full mt-8'>
          <button className='btn-primary' onClick={() => setProductLimit(productLimit + 3)}>View More</button>
        </div>
    </div>
  )
}

export default MenuWrapper