import React, { useState } from "react";
import "./ForgetPassword.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import auth_api from "../../apis/auth_api";

export default function ForgetPassword() {
  const [errorMessage, seterrorMessage] = useState(null);
  const [replaceForm, setreplaceForm] = useState(true);

  let navgate = useNavigate();
  let validYup = Yup.object({
    email: Yup.string()
      .required("Email Is Reaquird")
      .email("Enter Correct Email"),
  });
  let valid2Yup = Yup.object({
    resetCode: Yup.string().required("Email Is Reaquird"),
  });
  let ForgetPasswordForm = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: ForgetPasswordApi,
    validationSchema: validYup,
  });
  let verifyResetCodeForm = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: verifyResetCodeApi,
    validationSchema: valid2Yup,
  });

  function ForgetPasswordApi(data) {
    auth_api
      .ForgetPasswordApi(data)
      .then((req) => {
        console.log(req);
        if (req.data.statusMsg == "success") {
          setreplaceForm(false);
        }
      })
      .catch((error) => {
        seterrorMessage(error.response.data.message);
      });
  }
  function verifyResetCodeApi(data) {
    auth_api
      .verifyResetCodeApi(data)
      .then((req) => {
        if (req.data.status == "Success") {
          navgate("/updatepassword");
        }
      })
      .catch((error) => {
        seterrorMessage(error.response.data.message);
      });
  }

  return (
    <>
      {errorMessage ? (
        <div
          className="p-4 mb-4 text-sm text-center w-1/2 mx-auto text-red-800 rounded-lg bg-red-50 dark:text-red-400"
          role="alert"
        >
          <p>{errorMessage}</p>
        </div>
      ) : (
        ""
      )}

      {replaceForm ? (
        <div>
          <form
            onSubmit={ForgetPasswordForm.handleSubmit}
            className="w-full md:w-7/12 mx-auto bg-white p-8 rounded-xl shadow-md"
          >
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-semibold text-gray-800"
              >
                Your Email
              </label>
              <input
                value={ForgetPasswordForm.values.email}
                onChange={ForgetPasswordForm.handleChange}
                onBlur={ForgetPasswordForm.handleBlur}
                name="email"
                type="email"
                id="email"
                placeholder="example@mail.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400
        focus:border-green-500 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
              />
              {ForgetPasswordForm.touched.email &&
                ForgetPasswordForm.errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {ForgetPasswordForm.errors.email}
                  </p>
                )}
            </div>

            <button
              type="submit"
              disabled={
                !(ForgetPasswordForm.isValid && ForgetPasswordForm.dirty)
              }
              className="w-full sm:w-auto bg-green-600 disabled:bg-green-300 text-white font-semibold rounded-lg px-6 py-3
      hover:bg-green-700 focus:ring-4 focus:ring-green-300 focus:outline-none transition"
            >
              Send
            </button>
          </form>
        </div>
      ) : (
        <div>
          <form
            onSubmit={verifyResetCodeForm.handleSubmit}
            className="w-full md:w-7/12 mx-auto bg-white p-8 rounded-xl shadow-md"
          >
            <div className="mb-6">
              <label
                htmlFor="resetCode"
                className="block mb-2 text-sm font-semibold text-gray-800"
              >
                Reset Code
              </label>
              <input
                value={verifyResetCodeForm.values.resetCode}
                onChange={verifyResetCodeForm.handleChange}
                onBlur={verifyResetCodeForm.handleBlur}
                name="resetCode"
                type="text"
                id="resetCode"
                placeholder="Enter your reset code"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400
        focus:border-green-500 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
              />
              {verifyResetCodeForm.touched.resetCode &&
                verifyResetCodeForm.errors.resetCode && (
                  <p className="mt-1 text-sm text-red-600">
                    {verifyResetCodeForm.errors.resetCode}
                  </p>
                )}
            </div>

            <button
              type="submit"
              disabled={
                !(verifyResetCodeForm.isValid && verifyResetCodeForm.dirty)
              }
              className="w-full sm:w-auto bg-green-600 disabled:bg-green-300 text-white font-semibold rounded-lg px-6 py-3
      hover:bg-green-700 focus:ring-4 focus:ring-green-300 focus:outline-none transition"
            >
              Reset Code
            </button>
          </form>
        </div>
      )}
    </>
  );
}
