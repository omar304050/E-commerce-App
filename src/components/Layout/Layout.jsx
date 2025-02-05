import React, { useEffect, useState } from 'react'
import './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  const [ounter ,setCounter] = useState(0)
  useEffect(()=>{

  },[])
  return (
    <>
 <Navbar/>
<div className=' datatable-container  py-10  '>
<Outlet></Outlet>
</div>
 <Footer/>
    </>
  )
}
