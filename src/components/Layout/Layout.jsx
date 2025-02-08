import './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
<div className=''>
<Navbar/>
<div className='   py-6 myContainer '>
<Outlet></Outlet>
</div>
 <Footer/>
</div>
    </>
  )
}
