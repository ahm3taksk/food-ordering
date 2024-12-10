import Head from 'next/head'
import Home from '../pages/home';
import axios from 'axios'

export default function Index({categoryList, productList}) {
  return (
    <div className="">
      <Head>
        <title>Food Ordering</title>
        <link rel="icon" href="/images/about-img.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
      </Head>
      <Home categoryList={categoryList} productList={productList} />
    </div>
  );
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