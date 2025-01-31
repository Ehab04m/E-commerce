import React, { useContext } from 'react'
import LatestProducts from '../../Components/LatestProducts/LatestProducts'
import CategorySlider from '../../Components/CategorySlider/CategorySlider'
import MainSlider from '../../Components/MainSlider/MainSlider'
import Loader from '../../Components/Loader/Loader'
import { Helmet } from 'react-helmet'


export default function Home() {
  
 
  
 
  return (
    <div>
      <Helmet>
        <title>HomePage</title>
      </Helmet>
     
    <MainSlider/>
    <CategorySlider/>
    <LatestProducts/>
    </div>
  )
}
