import Image from "next/image";
import localFont from "next/font/local";
import Head from 'next/head'
import Header from "../components/layout/Header";
import Home from '../pages/home';
import Footer from '../components/layout/Footer';

export default function Index() {
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
      <Header />
      <Home />
      <Footer />
    </div>
  );
}
