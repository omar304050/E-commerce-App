import React from 'react'
import { RouterProvider } from 'react-router-dom'
import UserContextProvider from './context/UserContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CartContextProvider from './context/CarContext.jsx'
import { Toaster } from 'react-hot-toast'
import router from './router.jsx'


export default function App() {
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

