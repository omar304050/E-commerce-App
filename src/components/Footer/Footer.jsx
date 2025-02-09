import React, { useEffect, useState } from 'react'
import './Footer.module.css'
import img1 from "../../assets/images/amazonpay-DqVJ5xfr.png"
import img2 from "../../assets/images/express-B9TDBvEV.png"
import img3 from "../../assets/images/mastercard-BFaZItD6.png"
import img4 from "../../assets/images/paypal-DgKCxehm.png"
import img5 from "../../assets/images/appstore-JYRgm1i0.png"
import img6 from "../../assets/images/play-onZT2uP4.png"

export default function Footer() {

  return (
    <>
      <div className='bg-neutral-100 p-5'>
        <div className='myContainer'>
          <div className='border-b p-6'>
            <h1 className='text-xl'>Get the FreshCart app</h1>
            <p className='text-sm'>We Will send you alink, open it to your phone to download the app.</p>
            <div className='flex flex-col md:flex-row gap-3 md:gap-10 mt-4 justify-center items-center'>
              <div className=' w-full md:w-4/6 ms-2 '><input name="email" type="email" id="email" placeholder='Email...' className=" p-1.5 w-full border text-sm rounded-lg block    " /></div>
              <div className='w-full md:w-1/6'><button className='btn3 w-full p-1 px-2 '> Share App Link</button></div>
            </div>
          </div>
          <div className='py-5 flex flex-col md:flex-row justify-between'>
            <div className='flex flex-col md:flex-row items-center gap-2'>
              <h1 className='text-lg font-bold'>Payment Partners  </h1>
              <div className='flex flex-row '>
                <img src={img1} className='w-20 md:w-14' alt="" />
                <img src={img2} className='w-20 md:w-14' alt="" />
                <img src={img3} className='w-20 md:w-14' alt="" />
                <img src={img4} className='w-20 md:w-14' alt="" />
              </div>
            </div>
            <div className='flex flex-col mt-4 md:flex-row items-center gap-2'>
              <h1 className='text-lg font-bold'>Get deliveris with FreshCart </h1>
              <div className='flex flex-row'>
                <img src={img5} className='w-20' alt="" />
                <img src={img6} className='w-20' alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
