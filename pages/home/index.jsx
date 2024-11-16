import Campaigns from '../../components/Campaigns'
import Carousel from '../../components/Carousel'
import MenuWrapper from '../..//components/products/MenuWrapper'
import About from '../..//components/About'
import Reservation from '../../components/Reservation'
import Customers from '../../components/customers/Customers'
import Input from '../../components/form/Input'
import React from 'react'


const Index = () => {
    return (
        <React.Fragment className=''> 
            <Carousel />
            <Campaigns />
            <MenuWrapper />
            <About />
            <Reservation />
            <Customers />
        </React.Fragment>
    )
}

export default Index