import React, { useEffect, useState } from 'react'
import './Home.module.css'
import RecentProduct from '../RecentProduct/RecentProduct'
import MainSlider from '../../components/MainSlider/MainSlider'
import CategorySlider from '../../components/CategorySlider/CategorySlider'
export default function Home() {

  return <>
  
  <MainSlider />
  <CategorySlider/>
  <RecentProduct/>
  
  </>
}
