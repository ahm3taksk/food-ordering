import Campaigns from '../../components/Campaigns'
import Carousel from '../../components/Carousel'
import MenuWrapper from '../..//components/products/MenuWrapper'
import About from '../..//components/About'
import Reservation from '../../components/Reservation'
import Customers from '../../components/customers/Customers'
import React from 'react'

const Index = ({categoryList}) => {
    return (
        <React.Fragment className=''> 
            <Carousel />
            <Campaigns />
            <MenuWrapper categoryList={categoryList} />
            <About />
            <Reservation />
            <Customers />
        </React.Fragment>
    )
}



export default Index