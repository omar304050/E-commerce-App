import React, { useContext, useEffect, useState } from 'react'
import './Navbar.module.css'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import ImageLogo from '../../assets/images/freshcart-logo.svg'
import { UserContxet } from '../../context/UserContext'



export default function Navbar() {

  const [ounter, setCounter] = useState(0)
  useEffect(() => {

  }, [])
  let navgate = useNavigate()

  let { userLogin, setUserLogin } = useContext(UserContxet)


  function logOut() {

    localStorage.removeItem("userToken")
    setUserLogin(null)
    navgate('/login')
  }

  return (
    <>





      <nav className="bg-gray-100 border-gray-200 table-fixed z-50 ">
        <div className="max-w-screen-xl flex flex-wrap md:flex-col xl:flex-row lg:items-center  gap-3 mx-auto p-4">
          <div className=' flex md:flex-row justify-between w-full md:justify-center
           md:w-auto'>
            <Link to="" className="">
              <img src={ImageLogo} />

            </Link>
            <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className=" md:flex md:gap-2 xl:gap-60 md:justify-center md:ms-20 xl:justify-end xl:ms-0    hidden w-full  md:w-4/5 " id="navbar-default">
            <ul className="font-medium flex flex-col   p-4 md:p-0 mt-4   rounded-lg bg-gray-100 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0  ">
              {userLogin !== null ? <>
                <li>
                  <NavLink to="/" className="block py-2      rounded  md:p-0 text-black" aria-current="page">Home</NavLink>
                </li>
                <li>
                  <NavLink to="cart" className="block py-2     rounded  md:p-0 text-black" aria-current="page">Cart</NavLink>
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
            <ul className="font-medium flex flex-col p-4 md:p-0   rounded-lg bg-gray-100 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 ">
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
              {userLogin === null ? <>
                <li>
                  <NavLink to="login" className="block py-2   md:p-0" aria-current="page">Login</NavLink>
                </li>
                <li>
                  <NavLink to="register" className="block py-2   md:p-0" aria-current="page">Register</NavLink>
                </li>
              </> : <li onClick={logOut}>
                <span className="block py-2  md:p-0 cursor-pointer" aria-current="page">Logout</span>
              </li>
              }


            </ul>
          </div>
        </div>
      </nav>




    </>
  )
}
