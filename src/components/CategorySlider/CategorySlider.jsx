import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import useApi from '../../Hooks/useApi';

export default function CategorySlider() {
 let { data, isLoading, isError, error } = useApi('categories')
    let settings = {
        dots:false ,
        infinite: true,
        speed: 500
        ,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };

    return (
        <>

        {isLoading? <div className='flex justify-center items-center h-screen bg-green-200'>
  <span className="loader"></span>
  </div> :    <Slider {...settings}>
        {data?.data?.data?.map((category)=>{
         return <div key={category._id}>
            <img src={category.image} className='w-full h-48 object-cover object-top' alt={category.name} />
            <h3 className='text-center'>{category.name}</h3>
         </div>


        })}
      </Slider>}
   
      
        </>
    )
    
}
