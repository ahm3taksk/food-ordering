import Reservation from '../../components/Reservation'
import About from '../..//components/About'
import MenuWrapper from '../..//components/products/MenuWrapper'
import Campaigns from '../../components/Campaigns'
import Carousel from '../../components/Carousel'
import Input from '../../components/form/Input'
import React from 'react'

const Index = () => {
    return (
        <div className=''> 
            <Carousel />
            <Campaigns />
            <MenuWrapper />
            <About />
            <Reservation />
        </div>
    )
}

export default Index