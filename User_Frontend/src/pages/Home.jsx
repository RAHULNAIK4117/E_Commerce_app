import React from 'react'
import { FeaturedCategories, FeaturedProducts, Footer, HomeSlider, NewArrivals, PopularProducts, ServiceSection, SubscribeSection } from '../components'

const Home = () => {
  return (
    <div>
      <HomeSlider/>
      <FeaturedCategories/>
      <PopularProducts/>
      <NewArrivals/>
      <FeaturedProducts/>
     
    </div>
    
  )
}

export default Home