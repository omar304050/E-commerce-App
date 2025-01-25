import React, { useEffect, useState } from 'react'
import './UpdatePassword.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, NavLink, useNavigate } from 'react-router-dom'



export default function UpdatePassword() {
  const [errorMessage, seterrorMessage] = useState(null)
  useEffect(() => {

  }, [])

  let navgate = useNavigate()
  let baseUrl = 'https://ecommerce.routemisr.com'
  let validYup = Yup.object({

    email: Yup.string().required("Email Is Reaquird").email("Email Is Not Valid"),
    newPassword: Yup.string().required("New Password Is Requird").matches(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%&*]{6,20}$/, "Entr valid Password")
  })
  let initialValues = {
    email: "",
    newPassword: "",
  }

  function newPasswordApi(data) {
    axios.put(`${baseUrl}/api/v1/auth/resetPassword`, data)
      .then((req) => {
        if (req.data.token) {
          navgate("/login")
        }


      })
      .catch((error) => {
        const message = error.response?.data?.message || "An unexpected error occurred.";
        seterrorMessage(message);

      })

  }
  let newPasswordForm = useFormik({
    initialValues,
    onSubmit: newPasswordApi,
    validationSchema: validYup
  })


  return (
    <>
      {errorMessage ? <div class="p-4 mb-4 text-sm text-center w-1/2 mx-auto text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
        <p>{errorMessage}</p>
      </div> : ""}

      <form onSubmit={newPasswordForm.handleSubmit} className="w-7/12 mx-auto ">

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2  active text-sm font-medium text-gray-90">Your Email</label>
          <input value={newPasswordForm.values.email} onChange={newPasswordForm.handleChange} onBlur={newPasswordForm.handleBlur} name="email" type="text" id="email" className=" border text-sm rounded-lg block w-full p-2.5  " />
          {newPasswordForm.touched.email && newPasswordForm.errors.email ? <p className='text-red-700'>{newPasswordForm.errors.email}</p> : ""}
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 active text-sm font-medium text-gray-90">Your New Password</label>
          <input value={newPasswordForm.values.password} onChange={newPasswordForm.handleChange} onBlur={newPasswordForm.handleBlur} name="newPassword" type="password" id="newPassword" className=" border text-sm rounded-lg block w-full p-2.5  " />
          {newPasswordForm.touched.password && newPasswordForm.errors.password ? <p className='text-red-700'>{newPasswordForm.errors.password}</p> : ""}
        </div>
        
        <button type="submit" disabled={!(newPasswordForm.isValid && newPasswordForm.dirty)} className="disabled:bg-green-200 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  "> Set New Password</button>

      </form>
    </>
  )
}


