import MenuWrapper from '../../components/products/MenuWrapper'
import React from 'react'
import axios from 'axios'

const Index = ({categoryList, productList}) => {
  return (
    <React.Fragment className='pt-10'>
        <MenuWrapper categoryList={categoryList} productList={productList}  />
    </React.Fragment>
  )
}

export const getServerSideProps = async () => {
  const category = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
  const product = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  return {
      props: {
          categoryList: category.data ? category.data : [],
          productList: product.data ? product.data : [],
      }
  }
}

export default Index