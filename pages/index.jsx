import Head from 'next/head'
import Home from '../pages/home';
import axios from 'axios'

export default function Index({categoryList}) {
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
      <Home categoryList={categoryList} />
    </div>
  );
}


export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
  return {
      props: {
          categoryList: res.data ? res.data : [],
      }
  }
}