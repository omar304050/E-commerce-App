import './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>

<Navbar/>
<div className='  myContainer py-6  '>
<Outlet></Outlet>
</div>
 <Footer/>

    </>
  )
}
