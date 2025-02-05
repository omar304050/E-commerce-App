import React, { useEffect, useState } from 'react'
import './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from 'react-slick'

export default function Details() {
  const [ProductDetails, setProductDetails] = useState(null)
  let { id } = useParams()

  function GetProductDetails(id) {

    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((req) => {
        setProductDetails(req.data.data)
        console.log(req.data.data);


      })
  }

  useEffect(() => {
    GetProductDetails(id)
  }, [id])

  return (
    <>
      <div className='mx-auto w-9/12 my-16'>
        <div className='flex justify-between items-center'>
          <div className='w-3/12'>
            {/* <img src={ProductDetails?.imageCover} alt="" /> */}
            <Slider dots>

            { ProductDetails?.images?.map((image,i)=>{
              return <div key={i}>

                   <img src={image} className='object-cover' alt="" />

              </div>

            })}

            </Slider>
          </div>
          <div className='w-8/12 items-center'>
            <h2>{ProductDetails?.title}</h2>
            <p className='text-gray-500 my-5'>{ProductDetails?.description}</p>


            <div className='product  p-3  '>
              <div className='flex justify-between items-center'>
                <span>{ProductDetails?.price}EGP</span>
                <span>{ProductDetails?.ratingsAverage} <i class="fa-solid fa-star text-yellow-400"></i> </span>
              </div>
              <button className='btn2 my-5'>Add To Cart</button>
            </div>
          </div>



        </div>
      </div>
    </>
  )
}
