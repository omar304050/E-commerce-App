import React, { useContext, useEffect, useState } from 'react'
import './Cart.module.css'
import { cartContext } from '../../context/CarContext'
import { Link } from 'react-router-dom'

export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null)
  let { getCartItem, removeCartItem, ubdateQuntity ,setToCart } = useContext(cartContext)


  async function removeItem(productId) {
    let data = await removeCartItem(productId)
    setCartDetails(data.data);
    setToCart(data.data)

  }


  async function getCart() {
    let data = await getCartItem()
    setCartDetails(data.data)
    console.log(data.data);
    


  }

  async function udateCart(productId, count) {
    if (count < 1) {
      removeItem(productId)
    }
    let data = await ubdateQuntity(productId, count)
    setCartDetails(data.data)


  }


  useEffect(() => {
    getCart()
  }, [])
  return (
    <>

      <div className="relative mt-8 overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-3/4 mx-auto text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs  text-gray-700 uppercase bg-gray-50  ">
            <tr className='  justify-between items-center hidden md:flex '>
              <th scope="col" className="px-16 py-3 md: ">
                <span className="sr-only">Image</span>
              </th >
              <th scope="col" className="px-6 py-3 ">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className=''>
            {cartDetails?.data.products.map((product) => <tr key={product.product.id}  className="bg-white border-b   flex flex-col md:flex-row justify-between items-center   border-gray-200 hover:bg-gray-50">
              <td className="p-4  ">
                <img src={product.product.imageCover} className="w-52 md:w-32 lg:w-44 max-w-full max-h-full" alt="Apple Watch" />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-90 md:w-1/5 ">
              {product.product.title}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <button onClick={() => udateCart(product.product.id , product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                    </svg>
                  </button>
                  <div>
                    <span>{product.count}</span>
                  </div>
                  <button onClick={() => udateCart(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 ">
                <span className='text-green-500'>{product.price * product.count} EGP</span>
              </td>
              <td className="px-6 py-4">
                <a href="#" onClick={() => removeItem(product.product.id)} className="font-medium text-white  rounded-2xl p-2 bg-red-400">Remove</a>
              </td>
            </tr>

            )}


          </tbody>
        </table>
        <Link to={"/checkout"}><button className=' bg-green-500 text-white mt-1 rounded-md p-2 w-full  '>CheckOut Now</button> </Link>
      </div>


    </>
  )
}
