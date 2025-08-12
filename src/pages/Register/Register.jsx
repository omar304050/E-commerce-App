import React, { useContext, useEffect, useState } from "react";
import "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {UserContxet} from "../../context/UserContext"
import auth_api from "../../apis/auth_api";

export default function Register() {
  const [errorMessage, seterrorMessage] = useState(null);

  let { setUserLogin } = useContext(UserContxet);

  let navigate = useNavigate();
  let validYup = Yup.object({
    name: Yup.string()
      .required("Name Is Requird")
      .min(3, " Min Char 2 ")
      .max(15, "Max Char 15"),
    email: Yup.string()
      .required("Email Is Reaquird")
      .email("Email Is Not Valid"),
    password: Yup.string()
      .required("Password Is Requird")
      .matches(
        /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%&*]{6,20}$/,
        "Enter The Correct password"
      ),
    rePassword: Yup.string()
      .required("Password Is Requird")
      .oneOf([Yup.ref("password")], "Repassword is Not Matched"),
    phone: Yup.string()
      .required("Phone Is Requird")
      .matches(/^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/, "Enter Correct Number "),
  });
  let initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  function registerApi(data) {
    auth_api
      .registerApi(data)
      .then((req) => {
        if (req.data.message === "success") {
          localStorage.setItem("userToken", req.data.token);
          setUserLogin(req.data.token);
          navigate("/");
        }
      })
      .catch((error) => {
        seterrorMessage(error.response.data.message);
      });
  }
  let registerForm = useFormik({
    initialValues,
    onSubmit: registerApi,
    validationSchema: validYup,
  });

  return (
    <>
      <h1 className="text-green-500 text-center font-extrabold text-3xl md:text-4xl lg:text-5xl my-4 ">
        Register Now
      </h1>
      {errorMessage ? (
        <div
          class="p-4 mb-4 text-sm text-center w-1/2 mx-auto text-red-800 rounded-lg bg-red-50 dark:text-red-400"
          role="alert"
        >
          <p>{errorMessage}</p>
        </div>
      ) : (
        ""
      )}

<form onSubmit={registerForm.handleSubmit} className="w-full md:w-7/12 mx-auto bg-white p-8 rounded-xl shadow-lg">
  {["name", "email", "password", "rePassword", "phone"].map((field) => (
    <div className="mb-6" key={field}>
      <label htmlFor={field} className="block mb-2 text-sm font-semibold text-gray-800">
        Your {field === "rePassword" ? "Re-password" : field.charAt(0).toUpperCase() + field.slice(1)}
      </label>
      <input
        type={field.toLowerCase().includes("password") ? "password" : field === "phone" ? "tel" : "text"}
        name={field}
        id={field}
        value={registerForm.values[field]}
        onChange={registerForm.handleChange}
        onBlur={registerForm.handleBlur}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400
          focus:border-green-500 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
        placeholder={
          field === "email" ? "example@mail.com" : field === "phone" ? "+20 1xxxxxxxxx" : ""
        }
      />
      {registerForm.touched[field] && registerForm.errors[field] && (
        <p className="mt-1 text-sm text-red-600">{registerForm.errors[field]}</p>
      )}
    </div>
  ))}

  <button
    type="submit"
    disabled={!(registerForm.isValid && registerForm.dirty)}
    className="w-full sm:w-auto bg-green-600 disabled:bg-green-300 text-white font-semibold rounded-lg px-6 py-3
      hover:bg-green-700 focus:ring-4 focus:ring-green-300 focus:outline-none transition"
  >
    Submit
  </button>
</form>


    </>
  );
}
