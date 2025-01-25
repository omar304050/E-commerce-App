import React, { useContext, useEffect, useState } from 'react'
import './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContxet } from '../../context/UserContext'




export default function Register() {
  const [errorMessage, seterrorMessage] = useState(null)
  useEffect(() => {

  }, [])

  let {setUserLogin} = useContext(UserContxet)

  let navgate = useNavigate()
  let baseUrl = 'https://ecommerce.routemisr.com'
  let validYup = Yup.object({
    name: Yup.string().required("Name Is Requird").min(3, " Min Char 2 ").max(15, "Max Char 15"),
    email: Yup.string().required("Email Is Reaquird").email("Email Is Not Valid"),
    password: Yup.string().required("Password Is Requird").matches(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%&*]{6,20}$/, "Enter The Correct password"),
    rePassword: Yup.string().required("Password Is Requird").oneOf([Yup.ref("password")], "Repassword is Not Matched"),
    phone: Yup.string().required("Phone Is Requird").matches(/^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/, "Enter Correct Number ")
  })
  let initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: ""
  }

  function registerApi(data) {
    axios.post(`${baseUrl}/api/v1/auth/signup`, data)
      .then((req) => {
        if (req.data.message == "success") {
          localStorage.setItem("userToken", req.data.token)
          setUserLogin(req.data.token)
          navgate("/login")
        }


      })
      .catch((error) => {
        seterrorMessage(error.response.data.message)

      })

  }
  let registerForm = useFormik({
    initialValues,
    onSubmit: registerApi,
    validationSchema: validYup
  })


  return (
    <>
      {errorMessage ? <div class="p-4 mb-4 text-sm text-center w-1/2 mx-auto text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
        <p>{errorMessage}</p>
      </div> : ""}

      <form onSubmit={registerForm.handleSubmit} className="w-7/12 mx-auto ">
        <div className="mb-5">
          <label htmlFor="Name" className="block mb-2 active text-sm font-mediu">Your Name</label>
          <input value={registerForm.values.name} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} name="name" type="text" id="Name" className=" border  text-sm rounded-lg block w-full p-2.5  " />
          {registerForm.touched.name || registerForm.errors.name ? <p className='text-red-700'>{registerForm.errors.name}</p> : ""}
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2  active text-sm font-medium text-gray-90">Your Email</label>
          <input value={registerForm.values.email} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} name="email" type="text" id="email" className=" border text-sm rounded-lg block w-full p-2.5  " />
          {registerForm.touched.email && registerForm.errors.email ? <p className='text-red-700'>{registerForm.errors.email}</p> : ""}
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 active text-sm font-medium text-gray-90">Your password</label>
          <input value={registerForm.values.password} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} name="password" type="password" id="password" className=" border text-sm rounded-lg block w-full p-2.5  " />
          {registerForm.touched.password && registerForm.errors.password ? <p className='text-red-700'>{registerForm.errors.password}</p> : ""}
        </div>
        <div className="mb-5">
          <label htmlFor="rePassword" className="block mb-2 active text-sm font-medium text-gray-90">Your Repassword</label>
          <input value={registerForm.values.rePassword} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} name="rePassword" type="password" id="rePassword" className=" border text-sm rounded-lg block w-full p-2.5  " />
          {registerForm.touched.rePassword && registerForm.errors.rePassword ? <p className='text-red-700'>{registerForm.errors.rePassword}</p> : ""}
        </div>
        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 active text-sm font-medium text-gray-90">Your phone</label>
          <input value={registerForm.values.phone} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} name="phone" type="tel" id="phone" className=" border text-sm rounded-lg block w-full p-2.5  " />
          {registerForm.touched.phone && registerForm.errors.phone ? <p className='text-red-700'>{registerForm.errors.phone}</p> : ""}
        </div>

        <button type="submit" disabled={!(registerForm.isValid && registerForm.dirty)} className="disabled:bg-green-200 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  ">Submit</button>
      </form>
    </>
  )
}
