import { useEffect, useState } from 'react'
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Products from './components/Products/Products'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import Notfound from './components/Notfound/Notfound'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import About from './components/About/About'
import Logout from './components/Logout/Logout'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import UpdatePassword from './components/UpdatePassword/UpdatePassword'
import UserContextProvider from './context/UserContext'

let router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <Home /> },
      { path: "/products", element: <Products /> },
      { path: 'cart', element: <Cart /> },
      { path: 'brands', element: <Brands /> },
      { path: 'categories', element: <Categories /> },
      { path: 'login', element: <Login /> },
      { path: 'about', element: <About /> },
      { path: 'register', element: <Register /> },
      { path: 'logout', element: <Logout /> },
      { path: 'forgetpassword', element: <ForgetPassword /> },
      { path: 'updatepassword', element: <UpdatePassword /> },
      { path: '*', element: <Notfound /> },
    ]
  },

])

export default function App() {
  const [ounter, setCounter] = useState(0)
  useEffect(() => {

  }, [])
  return <>
    <UserContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </UserContextProvider>



  </>
}

