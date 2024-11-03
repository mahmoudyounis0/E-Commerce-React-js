  import React from "react";
  import logo from "../../Assets/images/new/bat.png";
  import google from "../../Assets/images/new/google.png";
  import apple from "../../Assets/images/new/apple.png";

  import "./Footer.css";
  export default function Footer() {
    return (
      <>
        <footer className=" w-100 bg-main-dark py-5 text-white">
          <div className="container">
            <div className="d-flex align-items-center">
              {" "}
              <img src={logo} alt="BatCart Logo" className="logo me-2 mb-2" />
              <h5 className="fw-bold">Get the BatCart App</h5>
            </div>
            <p>
              We will send you a link open it on your phone to download the app
            </p>
            <div className="sConatiner">
              <div className="getApp d-flex justify-content-around align-items-center">
                <label htmlFor="footerEmail" className="visually-hidden">Email</label>
                <input
                  type="email"
                  name="footerEmail"
                  id="footerEmail"
                  className="form-control w-75"
                  placeholder="enter your email...."
                />
                <button className="btn bg-main text-white fw-semibold">
                  Get App Link
                </button>
              </div>
              <div className="last mt-3 d-flex justify-content-between">
                <div className="payment-partenrs d-flex flex-column gap-3 mb-2">
                  <h6 className="fw-semibold">Payment Partners</h6>
                  <div className="icons d-flex justify-content-evenly w-100 gap-4 ">
                  <i className="fa-3 fa-brands fa-amazon-pay"></i>
                  <i className="fa-3 fa-brands fa-cc-mastercard"></i>
                  <i className="fa-3 fa-brands fa-paypal"></i>
                  <i className="fa-3 fa-brands fa-apple-pay"></i>
                </div>
                </div>
                <div className="GetDelv d-flex flex-column gap-3 mt-3">
                  <h6 className="fw-semibold">Get deliveries with BatCart</h6>
                  <div className="icons-getapp d-flex gap-4">
                  <img src={google} alt="Google Play logo" className="spec mb-2" />
                  <img src={apple} alt="Apple Store logo" className="spec mb-2" />
                  </div>
                </div>
              </div>
            </div>  
          </div>
        </footer>
      </>
    );
  }