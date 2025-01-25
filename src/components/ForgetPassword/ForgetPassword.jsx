import React, { useEffect, useState } from 'react'
import './ForgetPassword.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



export default function ForgetPassword() {
  const [errorMessage, seterrorMessage] = useState(null)
  const [replaceForm, setreplaceForm] = useState(true)
  useEffect(() => {

  }, [])
 
  let navgate = useNavigate()
  let baseUrl = 'https://ecommerce.routemisr.com'
  let validYup = Yup.object({
   
    email: Yup.string().required("Email Is Reaquird").email("Enter Correct Email"),
   
  })
  let valid2Yup = Yup.object({
   
    resetCode: Yup.string().required("Email Is Reaquird"),
   
  })
  let ForgetPasswordForm = useFormik({
    initialValues:{
      email:""
    },
    onSubmit: ForgetPasswordApi,
    validationSchema: validYup
  })
  let verifyResetCodeForm = useFormik({
    initialValues:{
      resetCode:""
    },
    onSubmit: verifyResetCodeApi,
    validationSchema: valid2Yup
  })
  
  function ForgetPasswordApi(data) {
    axios.post(`${baseUrl}/api/v1/auth/forgotPasswords`, data)
      .then((req) => {
     console.log(req);
     if (req.data.statusMsg == 'success') {
      setreplaceForm(false)
      
     }
       
      })
      .catch((error) => {
        seterrorMessage(error.response.data.message)

      })

  }
  function verifyResetCodeApi(data) {
    axios.post(`${baseUrl}/api/v1/auth/verifyResetCode`, data)
      .then((req) => {
    if (req.data.status == "Success") {
      navgate("/updatepassword")
    } 
      })
      .catch((error) => {
        seterrorMessage(error.response.data.message)

      })

  }

  
  
  return (
    <>
      {errorMessage ? <div className="p-4 mb-4 text-sm text-center w-1/2 mx-auto text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
       <p>{errorMessage}</p>
      </div>: "" }

      
      {replaceForm ?    <div>
        <form onSubmit={ForgetPasswordForm.handleSubmit} className="w-7/12 mx-auto ">

<div className="mb-5">
  <label htmlFor="email" className="block mb-2  active text-sm font-medium text-gray-90">Your Email</label>
  <input value={ForgetPasswordForm.values.email} onChange={ForgetPasswordForm.handleChange} onBlur={ForgetPasswordForm.handleBlur} name="email" type="text" id="email" className=" border text-sm rounded-lg block w-full p-2.5  " />
  {ForgetPasswordForm.touched.email && ForgetPasswordForm.errors.email ? <p className='text-red-700'>{ForgetPasswordForm.errors.email}</p> : ""}
</div>

<button type="submit" disabled={!(ForgetPasswordForm.isValid && ForgetPasswordForm.dirty)}  className="disabled:bg-green-200 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  ">Send</button>
</form>
      </div> :    <div>
        <form onSubmit={verifyResetCodeForm.handleSubmit} className="w-7/12 mx-auto ">

<div className="mb-5">
  <label htmlFor="resetCode" className="block mb-2  active text-sm font-medium text-gray-90">Resetcode</label>
  <input value={verifyResetCodeForm.values.resetCode} onChange={verifyResetCodeForm.handleChange} onBlur={verifyResetCodeForm.handleBlur} name="resetCode" type="string" id="resetCode" className=" border text-sm rounded-lg block w-full p-2.5  " />
  {verifyResetCodeForm.touched.resetCode && verifyResetCodeForm.errors.resetCode ? <p className='text-red-700'>{verifyResetCodeForm.errors.resetCode}</p> : ""}
</div>

<button type="submit" disabled={!(verifyResetCodeForm.isValid && verifyResetCodeForm.dirty)}  className="disabled:bg-green-200 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  ">Reset Code</button>
</form>
      </div> }
   

   
    </>
  )
}


