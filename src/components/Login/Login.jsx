import React, { useContext, useEffect, useState } from 'react'
import './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContxet } from '../../context/UserContext'



export default function Login() {
  const [errorMessage, seterrorMessage] = useState(null)
  useEffect(() => {

  }, [])
  let {setUserLogin} = useContext(UserContxet)
  let navgate = useNavigate()
  let baseUrl = 'https://ecommerce.routemisr.com'
  let validYup = Yup.object({
   
    email: Yup.string().required("Email Is Reaquird").email("Email Is Not Valid"),
    password: Yup.string().required("Password Is Requird").matches(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%&*]{6,20}$/, "Enter The Correct password"),
  })
  let initialValues = { 
    email: "",
    password: "",
  }

  function loginApi(data) {
    axios.post(`${baseUrl}/api/v1/auth/signin`, data)
      .then((req) => {
        if (req.data.message == "success") {
          localStorage.setItem("userToken", req.data.token)
          setUserLogin(req.data.token)
             navgate("/")
        }
        
        
      })
      .catch((error) => {
        seterrorMessage(error.response.data.message)

      })

  }
  let loginForm = useFormik({
    initialValues,
    onSubmit: loginApi,
    validationSchema: validYup
  })


  return (
    <>
      {errorMessage ? <div class="p-4 mb-4 text-sm text-center w-1/2 mx-auto text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
       <p>{errorMessage}</p>
      </div>: "" }

      <form onSubmit={loginForm.handleSubmit} className="w-7/12 mx-auto ">

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2  active text-sm font-medium text-gray-90">Your Email</label>
          <input value={loginForm.values.email} onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} name="email" type="text" id="email" className=" border text-sm rounded-lg block w-full p-2.5  " />
          {loginForm.touched.email && loginForm.errors.email ? <p className='text-red-700'>{loginForm.errors.email}</p> : ""}
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 active text-sm font-medium text-gray-90">Your password</label>
          <input value={loginForm.values.password} onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} name="password" type="password" id="password" className=" border text-sm rounded-lg block w-full p-2.5  " />
          {loginForm.touched.password && loginForm.errors.password ? <p className='text-red-700'>{loginForm.errors.password}</p> : ""}
        </div>
     

  
<div className='mb-5'><Link className='text-blue-800' to="/forgetpassword" >ForgetPassword ?</Link></div>
<button type="submit" disabled={!(loginForm.isValid && loginForm.dirty)}  className="disabled:bg-green-200 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  ">Login</button>

      </form>
    </>
  )
}


