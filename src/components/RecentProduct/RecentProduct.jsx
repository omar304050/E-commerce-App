import React, { useContext } from 'react'
import './RecentProduct.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { cartContext } from '../../context/CarContext'
import toast from 'react-hot-toast'

export default function RecentProduct() {
  let { addToCart, setToCart } = useContext(cartContext)

  async function addProduct(productId) {
    let data = await addToCart(productId)
    if (data.data.status === "success") {
      toast.success("Product Added To Cart")
      setToCart(data.data)
      console.log(data.data);



    }
    else {

      toast.error("adding is fale")

    }

  }


  function getAllProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["Products"],
    queryFn: getAllProducts,
  })


  if (isError) {
    return <h2 className='text-red-500'>{error.response.message}</h2>
  }

  return <>
    {isLoading ? <div className='flex justify-center items-center h-screen bg-green-200'>
      <span className="loader"></span>
    </div> : <div className='all'>
      <div className='row'>

        {data?.data?.data?.map((product) => {
          return (
            <div key={product.id} className='lg:w-2/12 md:w-3/12  sm:w-6/12 w-full px-4 py-4'>

              <div className='product border border-green-500 p-3 overflow-hidden rounded-3xl'>
                <Link to={`productdetails/${product._id}`}>
                  <img className='w-full' src={product.imageCover} alt={product.title} />
                  <span className='block font-light text-green-500'>{product.category.name}</span>
                  <h3 className='text-lg font-bold text-black'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>

                  <div className='flex justify-between items-center'>
                    <span>{product.price}EGP</span>
                    <span>{product.ratingsAverage} <i class="fa-solid fa-star text-yellow-400"></i> </span>
                  </div>
                </Link>
                <button className='btn' onClick={() => addProduct(product._id)}>Add To Cart</button>
              </div>

            </div>



          )


        })}

      </div>
    </div>

    }
  </>
}



