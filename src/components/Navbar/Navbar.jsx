import React, { useContext, useState } from 'react'
import './Navbar.module.css'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import ImageLogo from '../../assets/images/freshcart-logo.svg'
import { UserContxet } from '../../context/UserContext'
import { cartContext } from '../../context/CarContext'
import Hamburger from 'hamburger-react'

export default function Navbar() {
  let { cart } = useContext(cartContext)

  const [isMenuOpen, setisMenuOpen] = useState(false)

  let navgate = useNavigate()

  let { userLogin, setUserLogin } = useContext(UserContxet)


  function logOut() {

    localStorage.removeItem("userToken")
    setUserLogin(null)
    navgate('/login')
  }



  return (
    <>
      <nav className="bg-gray-100 border-gray-200  z-50">
        <div className="max-w-screen-xl flex flex-wrap md:flex-col xl:flex-row lg:items-center  gap-3 mx-auto p-4">
          <div className=' flex md:flex-row justify-between w-full md:justify-center
           md:w-auto'>
            <Link to={"/"} className="">
              <img src={ImageLogo} />

            </Link>
       <div className='md:hidden'>
       <Hamburger 
             toggled={isMenuOpen}
             toggle={setisMenuOpen}

            />
       </div>
      

          </div>
          <div className={`${isMenuOpen ? "block" : "hidden"} md:flex md:gap-2 xl:justify-between md:justify-center md:ms-20  xl:ms-0     w-full  md:w-4/5`} id="navbar-default">
            <ul className="font-medium flex flex-col   p-4 md:p-0 mt-4   rounded-lg bg-gray-100 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0  ">
              {userLogin !== null ? <>
                <li>
                  <NavLink to="/" className="block py-2      rounded  md:p-0 text-black" aria-current="page">Home</NavLink>
                </li>

                <li>
                  <NavLink to="products" className="block py-2     rounded  md:p-0 text-black" aria-current="page">products</NavLink>
                </li>
                <li>
                  <NavLink to="categories" className="block py-2     rounded  md:p-0 text-black" aria-current="page">Categories</NavLink>
                </li>
                <li>
                  <NavLink to="brands" className="block py-2     rounded  md:p-0 text-black" aria-current="page">Brands</NavLink>
                </li>
              </> : null}


            </ul>
            <ul className="font-medium flex flex-col p-4 md:p-0  md:ms-4 rounded-lg bg-gray-100 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 ">

              {userLogin === null ? <>
                <li>
                  <NavLink to="login" className="block py-2   md:p-0" aria-current="page">Login</NavLink>
                </li>
                <li>
                  <NavLink to="register" className="block py-2   md:p-0" aria-current="page">Register</NavLink>
                </li>
              </> : <div className='flex gap-3'>
                <li onClick={logOut}>
                  <span className="block py-2  md:p-0 cursor-pointer" aria-current="page">Logout</span>
                </li>
                <li>
                  <Link to="cart" className="block py-2   md:p-0" aria-current="page"><div className='relative bgre'> {cart?.numOfCartItems ? <span className='absolute h-7 w-7 justify-center flex bottom-1/2 left-3  bg-green-400  rounded-full py-0.5 px-1.5 text-white'>{cart?.numOfCartItems}</span> : null} <i className="  fa-solid fa-cart-shopping"></i></div></Link>
                </li>
              </div>


              }

              <div className='flex gap-5 items-center justify-center'>

                <li>
                  <Link className="block py-2   md:p-0" aria-current="page"><i className="fa-brands fa-instagram"></i></Link>
                </li>
                <li>
                  <Link className="block py-2   md:p-0" aria-current="page"><i className="fa-brands fa-facebook"></i></Link>
                </li>
                <li>
                  <Link className="block py-2   md:p-0" aria-current="page"><i className="fa-brands fa-tiktok"></i></Link>
                </li>
                <li>
                  <Link className="block py-2   md:p-0" aria-current="page"><i className="fa-brands fa-twitter"></i></Link>
                </li>
                <li>
                  <Link className="block py-2   md:p-0" aria-current="page"><i className="fa-brands fa-linkedin"></i></Link>
                </li>
              </div>



            </ul>
          </div>
        </div>
      </nav>




    </>
  )
}
