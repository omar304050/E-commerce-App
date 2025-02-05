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
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import UpdatePassword from './components/UpdatePassword/UpdatePassword'
import UserContextProvider from './context/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductDetails from './components/ProductDetails/ProductDetails.jsx'
import CartContextProvider from './context/CarContext.jsx'
import { Toaster } from 'react-hot-toast'


let router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "/products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
      { path: 'about', element: <ProtectedRoute><About /></ProtectedRoute> },
      { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
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


  let queryClient = new QueryClient()
  return <>
    <CartContextProvider>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <RouterProvider router={router}></RouterProvider>
          <Toaster/>
        </UserContextProvider>
      </QueryClientProvider>
    </CartContextProvider>





  </>
}

