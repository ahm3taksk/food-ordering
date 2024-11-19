import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
return (
    <Html lang="en">
      <Head />
      <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap" rel="stylesheet"></link>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css" integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}