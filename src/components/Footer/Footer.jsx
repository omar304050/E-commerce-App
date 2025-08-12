import React from 'react'
import img1 from "../../assets/images/amazonpay-DqVJ5xfr.png"
import img2 from "../../assets/images/express-B9TDBvEV.png"
import img3 from "../../assets/images/mastercard-BFaZItD6.png"
import img4 from "../../assets/images/paypal-DgKCxehm.png"
import img5 from "../../assets/images/appstore-JYRgm1i0.png"
import img6 from "../../assets/images/play-onZT2uP4.png"

export default function Footer() {
  return (
    <div className="bg-neutral-100 p-5 ">
      <div className="myContainer">
        <div className="border-b p-6 text-center md:text-left">
          <h1 className="text-xl mb-1">Get the FreshCart app</h1>
          <p className="text-sm">We will send you a link, open it on your phone to download the app.</p>
          <div className="flex flex-col md:flex-row gap-3 md:gap-10 mt-4 justify-center md:justify-start items-center">
            <input
              name="email"
              type="email"
              id="email"
              placeholder="Email..."
              className="p-1.5 w-full md:w-4/6 border rounded-lg text-sm"
            />
            <button className="btn3 w-full md:w-1/6 p-2">Share App Link</button>
          </div>
        </div>

        <div className="py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <h1 className="text-lg font-bold mr-4">Payment Partners</h1>
            {[img1, img2, img3, img4].map((src, i) => (
              <img key={i} src={src} alt="" className="w-14" />
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center gap-2">
            <h1 className="text-lg font-bold mr-4">Get deliveries with FreshCart</h1>
            {[img5, img6].map((src, i) => (
              <img key={i} src={src} alt="" className="w-20" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
