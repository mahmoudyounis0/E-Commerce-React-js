import React, { useState } from "react";
import forgotPassImg from "../../Assets/images/ForgotPass.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Success from "./Success";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ThreeDots } from "react-loader-spinner";
import toast from "react-hot-toast";


export default function Restpassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const navigator = useNavigate();
  function sendReq(values) {
    setloading(true);
    axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .then((x) => {
        //token x.data.token
        document.querySelector(".success-container").classList.remove("d-none");
        setTimeout(() => {
          navigator("/login");
          document.querySelector(".success-container").classList.add("d-none");
        }, 5000);
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.message || "An error occurred.",
          { duration: 3000, position: "top-center" }
        );
        setTimeout(() => {
        }, 5000);
      })
      .finally(() => {
        setloading(false);
      });
  }
  const Schema = Yup.object({
    email: Yup.string()
      .email("Must be valid one")
      .required("Email is required"),
    newPassword: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must include at least 8 characters and can contain letters, numbers, or special characters"
      ),
  });
  const restPasswordFormik = useFormik({
    initialValues: { email: "", newPassword: "" },
    onSubmit: sendReq,
    validationSchema: Schema,
  });
  return (
    <>
      <div className="success-container d-none">
        <Success />
      </div>
      <div className="container min-vh my-4">
        <div className="row justify-content-center">
          <img className="w-25" src={forgotPassImg} alt="forgot password" />
          <h1 className="fw-semibold text-center">Reset Password</h1>
          <p className="font-sm text-center">
            Enter your email address below, and new password to change it
          </p>
          <form onSubmit={restPasswordFormik.handleSubmit}>
            <label htmlFor="emailForRestPassword" className="mb-2 fw-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="emailForRestPassword"
              className="form-control w-100 mb-2"
              placeholder="enter your email..."
              autoComplete="email"
              onBlur={restPasswordFormik.handleBlur}
              onChange={restPasswordFormik.handleChange}
              value={restPasswordFormik.values.email}
            />
            {restPasswordFormik.touched.email &&
            restPasswordFormik.errors.email ? (
              <div className="alert alert-danger mt-2">
                {restPasswordFormik.errors.email}
              </div>
            ) : null}

            <label
              htmlFor="PasswordForRestPassword"
              className="mb-2 fw-semibold"
            >
              new password
            </label>
            <div className="position-relative">
              {" "}
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                id="PasswordForRestPassword"
                className="form-control w-100 mb-2"
                placeholder="enter your new password..."
                autoComplete="password"
                onBlur={restPasswordFormik.handleBlur}
                onChange={restPasswordFormik.handleChange}
                value={restPasswordFormik.values.newPassword}
              />
               <span
                className="position-absolute z-3 eyeicon"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
            {restPasswordFormik.touched.newPassword &&
            restPasswordFormik.errors.newPassword ? (
              <div className="alert alert-danger mt-2">
                {restPasswordFormik.errors.newPassword}
              </div>
            ) : null}
            <button
              type="submit"
              className="btn bg-main w-100 mt-2 fw-bold"
              disabled={
                loading ||
                !restPasswordFormik.isValid ||
                !restPasswordFormik.dirty
              }
            >
             {loading ?<ThreeDots
                visible={true}
                height="40"
                width="40"
                color="#fff"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />: "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
