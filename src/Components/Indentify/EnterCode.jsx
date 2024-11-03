import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import forgotPassImg from "../../Assets/images/ForgotPass.png";
import "./entercode.css";
import { ThreeDots } from "react-loader-spinner";
import toast from "react-hot-toast";

export default function OtpInput() {
  const navigator = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const validationSchema = Yup.object({
    resetCode: Yup.string()
      .required("Reset code is required")
      .matches(/^\d{5,6}$/, "Reset code must be 5 or 6 digits"),
  });

  const sendResetCode = (values) => {
    setLoading(true);
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values)
      .then((response) => {
        toast.success(
          response.data.status,
          { duration: 3000, position: "top-center" }
        );
        setTimeout(() => {
          navigator("/restpassword");
        }, 3000);
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Error verifying code",
          { duration: 3000, position: "top-center" }
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: { resetCode: "" },
    validationSchema: validationSchema,
    onSubmit: sendResetCode,
    validateOnChange: true,
    validateOnBlur: false,
  });

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    if (/^\d$/.test(value) || value === "") {
      const resetCodeArray = formik.values.resetCode.split("");
      resetCodeArray[index] = value;
      const newResetCode = resetCodeArray.join("");

      if (newResetCode.length <= 6) {
        formik.setFieldValue("resetCode", newResetCode);
        
        if (value && index < 5 && newResetCode.length < 6) {
          document.getElementById(`resetCode-${index + 1}`).focus();
        }
      }
    }
  };

  return (
    <>
      <div className="container my-4 min-vh">
        <div className="row justify-content-center">
          <img className="w-25" src={forgotPassImg} alt="forgot password" />
          <h2 className="text-center">Enter Reset Code</h2>
          <p className="text-center mb-4">
            Please enter the 5 or 6-digit reset code sent to your email.
          </p>

          <div className="col-12 col-md-6">
            <form onSubmit={formik.handleSubmit}>
              <div className="row justify-content-between">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="col-2">
                    <input
                      type="text"
                      id={`resetCode-${index}`}
                      maxLength="1"
                      className="form-control resetCode-input text-center fs-4"
                      onChange={(e) => handleInputChange(e, index)}
                      onBlur={formik.handleBlur}
                      value={formik.values.resetCode[index] || ""}
                    />
                  </div>
                ))}
              </div>
              {formik.touched.resetCode && formik.errors.resetCode && (
                <div className="alert alert-danger mt-2">
                  {formik.errors.resetCode}
                </div>
              )}
              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="btn bg-main fw-semibold w-100 w-md-auto px-4"
                  disabled={loading }
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
                    "Verify"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
