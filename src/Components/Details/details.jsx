import React, { useContext, useState } from "react";
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import toast from "react-hot-toast";
import { CartContext } from "../../context/CartContext";

export default function Details() {
 const {GetLoggedUserCart}= useContext(CartContext)
  const id = useParams();
  const location = useLocation();
  
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [payloading, setPayloading] = useState(false);

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const shippingAddress = {
    details: "",
    phone: "",
    city: "",
  };

  function sendData(values) {
    setPayloading(true);
    console.log(values);
    const requestBody = {
      shippingAddress: shippingAddress,
    };
    if (paymentMethod) {
      if (paymentMethod === "cash") {
        axios
          .post(
            `https://ecommerce.routemisr.com/api/v1/orders/${id.id}`,
            requestBody,
            {
              headers: {
                token: localStorage.getItem("tkn"),
              },
            }
          )
          .then((response) => {
            console.log("Success:", response.data);
            toast.success('Ur Oreder Placed successfully',{
              duration: 3000,
              position:'top-center'
            })
            setTimeout(() => {
              navigate("/Profile/allorders");
            }, 3000);
            GetLoggedUserCart();
            setPayloading(false);
          })
          .catch((error) => {
            console.error("Error submitting cash payment:", error);
            toast.error(error.response.data?.statusMsg,{
              duration: 3000,
              position:'top-center'
            })
            setPayloading(false);
          });
      } else if (paymentMethod === "online") {
        console.log("onlineeeeeeeeeeeeeeeee");
        // https://
        axios.post('https://ecommerce.routemisr.com/api/v1/orders/checkout-session/'+id.id,requestBody,
          {
            headers: {
              token: localStorage.getItem("tkn"),
              },params:{
                 url: `${window.location.origin}`
              }
          }
        ).then((succ)=>{
          window.open(succ.data.session.url,"_self")
          setPayloading(false)
          GetLoggedUserCart();
        }).catch((err)=>{
          console.log(err);
          toast.error(err.response.data.statusMsg,{
            duration: 3000,
            position:'top-center'
          })
          setPayloading(false);
        })
      }
    }
    if (!paymentMethod) {
      console.log("da akeddddddddd ship details");
    }
  }
  const Schema = Yup.object({
    details: Yup.string()
      .required("Name is required")
      .min(6, "enter full name")
      .max(30, "Aeh ya 3m kfayaaa"),
    phone: Yup.string()
      .matches(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        "Phone number must be a valid Egyptian number"
      )
      .required("Phone number is required"),
    city: Yup.string().required("City is required"),
  });
  const shipFormik = useFormik({
    initialValues: shippingAddress,
    onSubmit: sendData,
    validationSchema: Schema,
  });

  return (
    <>
      <div className="container min-vh my-4">
        <div className="row">
          <h4 className="fw-bold">shipping details</h4>
          <form onSubmit={shipFormik.handleSubmit}>
            <div className="row mt-3">
              <div className="col-md-6">
                <label htmlFor="details" className="mb-2 fw-semibold">
                  namee
                </label>
                <input
                  type="text"
                  name="details"
                  id="details"
                  onChange={shipFormik.handleChange}
                  value={shipFormik.values.details}
                  onBlur={shipFormik.handleBlur}
                  className="form-control w-100 mb-2"
                  placeholder="Enter your name..."
                />
                {shipFormik.touched.details && shipFormik.errors.details && (
                  <div className="alert alert-danger mt-2">
                    {shipFormik.errors.details}
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="country" className="mb-2 fw-semibold">
                  Bldnaaa
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  className="form-control w-100 mb-2"
                  value={`Masr Om El Deniaaaaaa`}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="city" className="mb-2 fw-semibold">
                  city
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="form-control w-100 mb-2"
                  placeholder="Enter your city..."
                  onChange={shipFormik.handleChange}
                  value={shipFormik.values.city}
                  onBlur={shipFormik.handleBlur}
                />
              </div>
              <div className="col-md-6 d-flex align-items-center mt-4 pt-2  ">
                <label htmlFor="phone" className="mb-2 fw-semibold">
                  {" "}
                  <select className="p-1 fw-semibold me-1 border-0 ">
                    <option value="+20">🇪🇬+20</option>
                  </select>
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter phone number..."
                  className="form-control mb-2"
                  onChange={shipFormik.handleChange}
                  onBlur={shipFormik.handleBlur}
                  value={shipFormik.values.phone}
                />
              </div>
              {shipFormik.touched.phone && shipFormik.errors.phone && (
                <div className="alert alert-danger mt-2">
                  {shipFormik.errors.phone}
                </div>
              )}
              {shipFormik.touched.city && shipFormik.errors.city && (
                <div className="alert alert-danger mt-2">
                  {shipFormik.errors.city}
                </div>
              )}
              <div className="col-md-6">
                <label htmlFor="street" className="mb-2 fw-semibold"></label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  className="form-control w-100 mb-2"
                  placeholder="street name & num..."
                />
              </div>
              {location.pathname === `/checkout/`+ id.id ? (
                <>
                  {" "}
                  <div className="row fw-semibold">
                    <h5 className="fw-bold">Select Payment Method:</h5>
                    <div className="col-md-6">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="cash"
                        value="cash"
                        onChange={handlePaymentChange}
                        required
                      />
                      <label className="form-check-label ms-1" htmlFor="cash">
                        Cash
                      </label>
                    </div>
                    <div className="col-md-6">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="online"
                        value="online"
                        onChange={handlePaymentChange}
                        required
                      />
                      <label className="form-check-label ms-1" htmlFor="online">
                        Online Payment
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn spbtn bg-main w-100 fw-bold mt-2"
                  >
                    {payloading ? (
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
                      "Pay Now"
                    )}
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="submit"
                    className="btn spbtn bg-main w-100 fw-bold mt-2"
                  >
                    {/* {loading ? (
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
            " Submit Details"
          )} */}
                    Submit Details
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
