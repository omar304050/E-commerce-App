import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Products from './pages/Products/Products'
import Categories from './pages/Categories/Categories'
import Brands from './pages/Brands/Brands'
import Notfound from './pages/Notfound/Notfound'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ForgetPassword from './pages/ForgetPassword/ForgetPassword'
import UpdatePassword from './pages/UpdatePassword/UpdatePassword' 
import Orders from './pages/Orders/Orders.jsx'
import CheckOut from './pages/CheckOut/CheckOut.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './pages/ProductDetails/ProductDetails.jsx'
import { createBrowserRouter } from 'react-router-dom'

let router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
        { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'forgetpassword', element: <ForgetPassword /> },
        { path: 'updatepassword', element: <UpdatePassword /> },
        { path: 'checkout', element: <CheckOut /> },
        { path: 'allorders', element: <Orders /> },
        { path: '*', element: <Notfound /> },
      ]
    },
  ])
  
  export default router