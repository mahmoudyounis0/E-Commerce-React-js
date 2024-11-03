import React, { useState } from "react";
import forgotPassImg from "../../Assets/images/ForgotPass.png";
import { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import toast from "react-hot-toast";
export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();
  useEffect(() => {
    document.title = "Forgot Password";
  }, []);

  const userdata = {
    email: "",
  };
  const Schema = Yup.object({
    email: Yup.string()
      .email("Must be valid one")
      .required("Email is required"),
  });
  function sendreq(values) {
    setLoading(true);
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .then((x) => {
        toast.success(
          x.data?.message,
          { duration: 3000, position: "top-center" }
        );
        setTimeout(() => {
          navigator("/entercode");
        }, 5000);
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.message,
          { duration: 3000, position: "top-center" }
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const ForgotFormik = useFormik({
    initialValues: userdata,
    onSubmit: sendreq,
    validationSchema: Schema,
  });
  return (
    <>
      <div className="container my-4 min-vh">
        <div className="row justify-content-center align-items-center">
          <img className="w-25" src={forgotPassImg} alt="forgot password" />
          <h1 className="text-center">Forgot Password</h1>
          <p className="font-sm text-center">
            Enter your email address below, and we'll send you a rest code if it
            already exists
          </p>

          <form onSubmit={ForgotFormik.handleSubmit}>
            <label htmlFor="emailForgot" className="mb-2 fw-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="emailForgot"
              className="form-control w-100 mb-2"
              placeholder="enter your email..."
              autoComplete="email"
              onBlur={ForgotFormik.handleBlur}
              onChange={ForgotFormik.handleChange}
              value={ForgotFormik.values.email}
            />
            {ForgotFormik.touched.email && ForgotFormik.errors.email ? (
              <div className="alert alert-danger mt-2">
                {ForgotFormik.errors.email}
              </div>
            ) : null}
            <button
              type="submit"
              className="btn bg-main w-100 mt-2 fw-bold"
              disabled={loading || !ForgotFormik.isValid || !ForgotFormik.dirty}
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
