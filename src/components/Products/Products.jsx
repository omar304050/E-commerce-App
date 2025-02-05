import React, { useEffect, useState } from 'react'
import './Products.module.css'
import RecentProduct from '../RecentProduct/RecentProduct'

export default function Products() {
  const [ounter ,setCounter] = useState(0)
  useEffect(()=>{

  },[])
  return (
    <>

<RecentProduct/>
    </>
  )
}
