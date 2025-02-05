import React, { useEffect, useState } from 'react'
import './Home.module.css'
import RecentProduct from '../RecentProduct/RecentProduct'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
export default function Home() {
  const [ounter ,setCounter] = useState(0)
  useEffect(()=>{

  },[])
  return <>
  <MainSlider/>
  <CategorySlider/>
  <RecentProduct/>
  
  </>
}
