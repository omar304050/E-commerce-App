import React, { useContext, useEffect, useState } from "react";
import "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { UserContxet } from "../../context/UserContext";
import auth_api from "../../apis/auth_api";

export default function Login() {
  const [errorMessage, seterrorMessage] = useState(null);

  let { setUserLogin } = useContext(UserContxet);
  let navgate = useNavigate();
  let baseUrl = "https://ecommerce.routemisr.com";
  let validYup = Yup.object({
    email: Yup.string()
      .required("Email Is Reaquird")
      .email("Email Is Not Valid"),
    password: Yup.string()
      .required("Password Is Requird")
      .matches(
        /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%&*]{6,20}$/,
        "Enter The Correct password"
      ),
  });
  let initialValues = {
    email: "",
    password: "",
  };

  function loginApi(data) {
    auth_api
      .loginApi(data)
      .then((req) => {
        if (req.data.message == "success") {
          localStorage.setItem("userToken", req.data.token);
          setUserLogin(req.data.token);
          navgate("/");
        }
      })
      .catch((error) => {
        seterrorMessage(error.response.data.message);
      });
  }
  let loginForm = useFormik({
    initialValues,
    onSubmit: loginApi,
    validationSchema: validYup,
  });

  return (
    <>
      <h1 className="text-green-600 text-center font-extrabold text-3xl md:text-4xl lg:text-5xl my-6">
        Login Now
      </h1>

      {errorMessage && (
        <div
          className="p-4 mb-6 text-sm text-center w-4/5 max-w-md mx-auto text-red-800 rounded-lg bg-red-100 dark:bg-red-900 dark:text-red-300 shadow-md"
          role="alert"
        >
          <p>{errorMessage}</p>
        </div>
      )}

      <form
        onSubmit={loginForm.handleSubmit}
        className="w-full md:w-7/12 mx-auto  px-6 py-8 bg-white rounded-xl shadow-xl"
      >
        {["email", "password"].map((field) => (
          <div className="mb-6" key={field}>
            <label
              htmlFor={field}
              className="block mb-2 text-sm font-semibold text-gray-800"
            >
              Your {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === "password" ? "password" : "email"}
              id={field}
              name={field}
              value={loginForm.values[field]}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              placeholder={field === "email" ? "example@mail.com" : ""}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400
          focus:border-green-500 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
            />
            {loginForm.touched[field] && loginForm.errors[field] && (
              <p className="mt-1 text-sm text-red-600">
                {loginForm.errors[field]}
              </p>
            )}
          </div>
        ))}

        <div className="mb-6 text-right">
          <Link
            to="/forgetpassword"
            className="text-green-600 hover:text-green-800 font-semibold text-sm transition"
          >
            Forget Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={!(loginForm.isValid && loginForm.dirty)}
          className="w-full sm:w-auto bg-green-600 disabled:bg-green-300 text-white font-semibold rounded-lg px-6 py-3
      hover:bg-green-700 focus:ring-4 focus:ring-green-300 focus:outline-none transition"
        >
          Login
        </button>
      </form>
    </>
  );
}
