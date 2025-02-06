import React, { useContext, useEffect, useState } from 'react'
import './CheckOut.module.css'
import { useFormik } from 'formik'
import { cartContext } from '../../context/CarContext'




export default function CheckOut() {
  let { checkOut } = useContext(cartContext)
  const [errorMessage, seterrorMessage] = useState(null)
  useEffect(() => {

  }, [])


  let initialValues = {
    details: "",
    phone: "",
    city: "",
  }

  let formik = useFormik({
    initialValues,
    onSubmit: () => handelCheckOut("67a379f2518151d803c531f5", "http://localhost:5173"),
  })


  async function handelCheckOut(cartId, url) {
    let {data} = await checkOut(cartId, url, formik.values)
    if (data.status === "success")
    {
      window.location.href = data.session.url
    }
     console.log(data);

  }



  return (
    <>


      <form onSubmit={formik.handleSubmit} className="w-7/12 mx-auto ">

        <div className="mb-5">
          <label htmlFor="details" className="block mb-2  active text-sm font-medium text-gray-90">Your details</label>
          <input value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} name="details" type="text" id="details" className=" border text-sm rounded-lg block w-full p-2.5  " />
        </div>

        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 active text-sm font-medium text-gray-90">Your phone</label>
          <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} name="phone" type="tel" id="phone" className=" border text-sm rounded-lg block w-full p-2.5  " />
        </div>

        <div className="mb-5">
          <label htmlFor="city" className="block mb-2 active text-sm font-medium text-gray-90">Your city</label>
          <input value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} name="city" type="text" id="city" className=" border text-sm rounded-lg block w-full p-2.5  " />
        </div>



        <button type="submit" className="disabled:bg-green-200 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  ">Pay Now</button>

      </form>
    </>
  )
}


