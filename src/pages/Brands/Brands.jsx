import React from 'react'
import './Brands.module.css'
import useApi from '../../Hooks/useApi'

export default function Brands() {
  let { data, isLoading, isError, error } = useApi('brands')

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen bg-green-200'>
        <span className="loader"></span>
      </div>
    )
  }

  return (
    <div className='flex flex-wrap gap-6 justify-center p-6 bg-gray-50'>
      {data?.data?.data?.map((brand) => (
        <div
          key={brand._id}
          className='bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300 max-w-xs md:w-5/12 lg:w-3/12'
        >
          <img
            src={brand.image}
            alt={brand.name}
            className='w-full h-48 object-cover object-top'
          />
          <h3 className='text-center text-xl font-semibold py-4 text-gray-800'>
            {brand.name}
          </h3>
        </div>
      ))}
    </div>
  )
}
