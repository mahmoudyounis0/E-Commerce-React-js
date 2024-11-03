import React, { useEffect, useState } from "react";
import "./Register.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link,  useNavigate } from "react-router-dom";
import axios from "axios";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThreeDots } from "react-loader-spinner";
import toast from "react-hot-toast";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [loading, setloading] = useState(false);
  const navigator = useNavigate();
  useEffect(() => {
    document.title = "Register";
  }, []);

  const userData = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  // Yup validation schema
  const Schema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Min characters is 3")
      .max(25, "Max characters is 25"),
    email: Yup.string()
      .email("Must be a valid email")
      .required("Email is required"),
    phone: Yup.string()
      .matches(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        "Phone number must be a valid Egyptian number"
      )
      .required("Phone number is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must include at least 8 characters and can contain letters, numbers, or special characters"
      ),
    rePassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  // Function to send form data
  function sendData(values) {
    setloading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((response) => {
        toast.success(
          response.data.message,
          { duration: 3000, position: "top-center" }
        );

        // Reset form fields
        formik.resetForm();
        setloading(false);
        setTimeout(() => {
          navigator("/login");
        }, 5000);
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.errors?.msg ||
          error.response?.data?.message ||
          "Submission failed",
          { duration: 3000, position: "top-center" }
        );
        setloading(false);
      });
  }

  const formik = useFormik({
    initialValues: userData,
    onSubmit: sendData,
    validationSchema: Schema,
  });

  return (
    <>
      <div className="container my-4">
        <h1 className="fw-bold w-100 text-center">Create an account</h1>
        <div className="row w-100">
          <form onSubmit={formik.handleSubmit}>
            {/* Name Field */}
            <label htmlFor="name" className="mb-2 fw-semibold">
              Name<span className="text-danger">*</span>{" "}
            </label>
            <input
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="name"
              id="name"
              className="form-control w-100 mb-2"
              placeholder="Enter your name..."
            />
            {formik.touched.name && formik.errors.name && (
              <div className="alert alert-danger mt-2">
                {formik.errors.name}
              </div>
            )}

            {/* Email Field */}
            <label htmlFor="email" className="mb-2 fw-semibold">
              Email<span className="text-danger">*</span>{" "}
            </label>
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="email"
              name="email"
              id="email"
              className="form-control w-100 mb-2"
              placeholder="Enter your email..."
              autoComplete="email"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="alert alert-danger mt-2">
                {formik.errors.email}
              </div>
            )}

            {/* Phone Field */}
            <label htmlFor="phone" className="mb-2 fw-semibold">
              Phone<span className="text-danger">*</span>{" "}
            </label>
            <input
              type="number"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              name="phone"
              id="phone"
              className="form-control w-100 mb-2"
              placeholder="Enter your phone number..."
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="alert alert-danger mt-2">
                {formik.errors.phone}
              </div>
            )}

            {/* Password Field */}
            <label htmlFor="password" className="mb-2 fw-semibold">
              Password<span className="text-danger">*</span>{" "}
            </label>
            <div className="position-relative">
              <input
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="form-control w-100 mb-2"
                placeholder="Enter your password..."
                autoComplete="new-password"
              />
              <span
                className="position-absolute z-3 eyeicon"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="alert alert-danger mt-2">
                {formik.errors.password}
              </div>
            )}

            {/* Re-Password Field */}
            <label htmlFor="rePassword" className="mb-2 fw-semibold">
              Repeat Your Password<span className="text-danger">*</span>{" "}
            </label>
            <div className="position-relative">
              <input
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type={showRePassword ? "text" : "password"}
                name="rePassword"
                id="rePassword"
                className="form-control w-100 mb-3"
                placeholder="Repeat your password..."
                autoComplete="new-password"
              />
              <span
                className="position-absolute z-3 eyeicon"
                onClick={() => setShowRePassword(!showRePassword)}
              >
                <FontAwesomeIcon icon={showRePassword ? faEyeSlash : faEye} />
              </span>
            </div>
            {formik.touched.rePassword && formik.errors.rePassword && (
              <div className="alert alert-danger mt-2">
                {formik.errors.rePassword}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn spbtn bg-main w-100 fw-bold"
            >
              {loading ? (
                <ThreeDots
                  visible={true}
                  height="40"
                  width="40"
                  color="#fff"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                " Create account"
              )}
            </button>
            <p className="fw-smeibold text-center">
              Already have an account?
              <Link to="/login" className="underline ms-1 text-main fw-bold">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
