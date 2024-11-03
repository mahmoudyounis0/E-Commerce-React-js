import React, { useContext, useEffect } from "react";
import GetStarted from "./../ButtonGetStarted/GetStarted";
import "./About.css";
import { Link } from 'react-router-dom';
import { authcontext } from './../../context/AuthContext';
export default function About() {
  const {token}=useContext(authcontext)
  useEffect(() => {
    document.title = 'AboutUs'; // Change the document title dynamically
  }, []);
  return (
    <>
      <section id="about">
        <div className="container  my-5">
          <div className="head-about  d-flex justify-content-center align-items-center ">
            <h2 className="text-center h1 fw-bold mb-3 pb-2">About Us</h2>
          </div>
          <div className="row">
            <div className="col-md-6 p-2">
              <div className="item border rounded-2 p-4">
                <h4 className="fw-semibold">
                  Are You Looking for a Specific Item?
                </h4>
                <p>
                  We have what you need. Use our smart search to quickly find
                  the products you're looking for.
                </p>
                <div className="text-center">
                  {" "}
                  <Link to="/register">
                   {token? <GetStarted text={'Explore Now'} /> : <GetStarted />} 
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 p-2">
              <div className="item border rounded-2 p-4">
                <h4 className="fw-semibold">
                  Do You Want to Pay for Products?
                </h4>
                <p>
                  Secure payments with multiple options. Get what you want and
                  pay the way you prefer.
                </p>
                <div className="text-center">
                  {" "}
                  <Link to="/register">
                   {token? <GetStarted text={'Explore Now'} /> : <GetStarted />} 
                  </Link>
                </div>
              </div>
            </div>
            <h3 className="text-center fw-bold mt-3 pb-3 mb-3 mt-4">
              Why Choose Us?
            </h3>
          </div>
          <div className="row mt-2 justify-content-center">
            <div className="col-12 col-md-4 col-l-3 p-2">
              <div className="crd p-3 text-center">
                <i className="star fa-solid fa-ranking-star fs-3 mb-2"></i>
                <h5 className="fw-bold">Best Products Quality</h5>
                <p>We offer top-tier products from trusted brands.</p>
              </div>
            </div>
            <div className="col-12 col-md-4 col-l-3 p-2">
              <div className="crd p-3 text-center">
                <i className="truck fa-solid fa-truck-fast fs-3 mb-2"></i>
                <h5 className="fw-bold">Fast and Reliable Shipping</h5>
                <p>
                  Get your products delivered to your door quickly and
                  efficiently.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4 col-l-3 p-2">
              <div className="crd p-3 text-center">
                <i className="fa-solid fa-phone-volume fs-3 mb-2 "></i>
                <h5 className="fw-bold">QExceptional Customer Support</h5>
                <p>
                  Our team is always ready to assist you with any questions.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4 col-l-3 p-2">
              <div className="crd p-3 text-center">
                <i className="fa-solid fa-right-left fs-3 mb-2"></i>
                <h5 className="fw-bold">Hassle-Free Returns</h5>
                <p>
                  Not satisfied with your purchase? Return it easily with our
                  no-fuss return policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
