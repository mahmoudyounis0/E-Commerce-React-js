import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import GetStarted from "./../ButtonGetStarted/GetStarted";
import { authcontext } from "./../../context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const { token,logout } = useContext(authcontext);
  return (
    <>
      <section className="home w-100 vh-100 pt-1">
        {" "}
        <div className="container w-100 h-75">
          <h1 className="head-nav text-center mt-4">
            We Bring Store To Ur Door
          </h1>
          <nav>
            <ul className="nav-type">
              <li
                className={
                  location.pathname === "/home" || location.pathname === "/"
                    ? "active"
                    : ""
                }
              >
                <Link to="/home">
                  <i className="fa fa-home"></i>
                  <span className="nav-text">Home</span>
                </Link>
              </li>
              <li className={location.pathname === "/about" ? "active" : ""}>
                <Link to="/about">
                  <i className="fa fa-info-circle"></i>
                  <span className="nav-text">About</span>
                </Link>
              </li>
              <li
                className={
                  token
                    ? location.pathname === "/ourproducts"
                      ? "active"
                      : location.pathname === "/register"
                      ? "active"
                      : ""
                    : ""
                }
              >
                <Link to={token ? "ourproducts" : "/register"}>
                  <i className={token ? " fa fa-box" : "fa fa-user-plus"}></i>
                  <span className="nav-text">
                    {token ? "OurProducts" : "Register"}
                  </span>
                </Link>
              </li>
              <li
                className={
                  token
                    ? location.pathname === "/categories"
                      ? "active"
                      : location.pathname === "/login"
                      ? "active"
                      : ""
                    : ""
                }
              >
                <Link to='/login' onClick={logout}>
                  <i className={token ? "fa fa-sign-out-alt" : "fa fa-sign-in-alt"}></i>
                  <span className="nav-text">
                    {token ? "logout" : "login"}
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="home-content text-white mt-5 d-flex flex-column justify-content-center align-items-center">
            <h1 className="homeh1 text-center mt-4 d-none">
              We Bring Store To Ur Door
            </h1>
            <h2 className="h1 fw-semibold hh-home">Pick. Pack. Delivered.</h2>
            <p className=" ph-head fw-semibold">
              Discover what you love, and we’ll bring it straight to your door,
              hassle-free.
            </p>
            <Link to={token ? "ourproducts" : "/register"}>
              {token ? <GetStarted text={"Explore Now"} /> : <GetStarted />}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
