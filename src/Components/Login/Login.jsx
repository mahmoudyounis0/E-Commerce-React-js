import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThreeDots } from "react-loader-spinner";
import { authcontext } from "../../context/AuthContext";
import "./Login.css";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const { setToken } = useContext(authcontext);
  const navigator = useNavigate();
  useEffect(() => {
    document.title = "Login";
  });
  const loginDeatils = {
    email: "",
    password: "",
  };
  function sendData(values) {
    setloading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((x) => {        
        toast.success(x.data.message, {
          duration: 3000,
          position: "top-center",
        });
        logInFormik.resetForm();
        setToken(x.data.token);
        localStorage.setItem("tkn", x.data.token);
        setTimeout(() => {
          navigator("/ourproducts");
        }, 3000);
        setloading(false);
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.errors?.msg || err.response?.data?.message,
          { duration: 3000, position: "top-center" }
        );
        setloading(false);
      });
  }

  const Schema = Yup.object({
    email: Yup.string()
      .email("Must be valid one")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must include at least 8 characters and can contain letters, numbers, or special characters"
      ),
  });

  const logInFormik = useFormik({
    initialValues: loginDeatils,
    onSubmit: sendData,

    validationSchema: Schema,
  });

  return (
    <>
      <div className="container my-4">
        <h1 className="fw-bold w-100 text-center mb-3">Welcome back!</h1>
        <div className="row w-100">
          <form onSubmit={logInFormik.handleSubmit} className="w-100">
            <label htmlFor="loginEmail" className="mb-2 fw-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="loginEmail"
              className="form-control w-100 mb-2"
              placeholder="enter your email..."
              autoComplete="email"
              onBlur={logInFormik.handleBlur}
              onChange={logInFormik.handleChange}
              value={logInFormik.values.email}
            />
            {logInFormik.touched.email && logInFormik.errors.email ? (
              <div className="alert alert-danger mt-2">
                {logInFormik.errors.email}
              </div>
            ) : null}

            <div className="form-group">
              <label htmlFor="loginPassword" className="mb-2 fw-semibold">
                Password
              </label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="loginPassword"
                  className="form-control w-100 mb-2"
                  placeholder="enter your password..."
                  autoComplete="new-password"
                  onBlur={logInFormik.handleBlur}
                  onChange={logInFormik.handleChange}
                  value={logInFormik.values.password}
                />
                <span
                  className="position-absolute z-3 eyeicon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
            </div>
            {logInFormik.touched.password && logInFormik.errors.password ? (
              <div className="alert alert-danger mt-2">
                {logInFormik.errors.password}
              </div>
            ) : null}
            <Link
              to="/forgotPassword"
              className="ms-1 text-sec underline fw-bold"
            >
              Forgotten password?{" "}
            </Link>
            <button type="submit" className="btn bg-main w-100 mt-2 fw-bold">
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
                "Login"
              )}
            </button>
            <p className="text-center mt-1">
              Don't have an account?{" "}
              <Link to="/register" className="text-main underline fw-semibold">
                Join now{" "}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
