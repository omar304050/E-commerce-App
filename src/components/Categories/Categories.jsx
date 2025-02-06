import React, { useEffect, useState } from 'react'
import './Categories.module.css'
import useApi from '../../Hooks/useApi'

export default function Categories() {
  let { data, isLoading, isError, error } = useApi('categories')

  if(isLoading){
    return<div className='flex justify-center items-center h-screen bg-green-200'>
  <span className="loader"></span>
  </div>
  }
  return (
    <>
      <div className='flex flex-wrap  '>
        {data?.data?.data?.map((category) => {
          return <div key={category._id} className='md:w-3/12 w-full  '>
            <img src={category.image} className='w-full h-full p-7  object-cover object-top' alt={category.name} />
            <h3 className='text-center'>{category.name}</h3>
          </div>


        })}
      </div>
    </>
  )
}
