import React, { useEffect, useState } from 'react'
import './Brands.module.css'
import useApi from '../../Hooks/useApi'

export default function Brands() {
let {data , isLoading , isError , error} = useApi('brands')

if(isLoading){
  return<div className='flex justify-center items-center h-screen bg-green-200'>
<span className="loader"></span>
</div>
}
return (
  <>
    <div className='flex flex-wrap '>
      {data?.data?.data?.map((brands) => {
        return <div key={brands._id} className='w-3/12 md:w-3/12 w-full '>
          <img src={brands.image} className='w-full h-48 object-cover object-top' alt={brands.name} />
          <h3 className='text-center'>{brands.name}</h3>
        </div>


      })}
    </div>
  </>
)
}
