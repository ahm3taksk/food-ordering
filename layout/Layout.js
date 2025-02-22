import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const Layout = ({ children, showHeaderFooter = true }) => {
  return (
    <React.Fragment>
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
    </React.Fragment>
  )
}

export default Layout