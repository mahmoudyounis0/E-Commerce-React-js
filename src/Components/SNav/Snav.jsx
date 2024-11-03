import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../Assets/images/new/bat.png";
import "./Snav.css";
import { authcontext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";

export default function Snav() {
  const location = useLocation();
  const { token, logout } = useContext(authcontext);
  const { count } = useContext(CartContext);
  return (
    <>
      <section className="snav bg-main-dark rounded-2 speacailContainer shadow">
        <div className="container">
          <nav className="w-100 pe-3">
            <div className="innerNav d-flex w-100 align-items-center">
              <Link to="/home" className="me-5">
                <img src={logo} alt="BatCartLogo" className="logo" />
              </Link>
              {!token ? (
                <ul className="nav-type specul z-3" id="nav2">
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
                  <li
                    className={location.pathname === "/about" ? "active" : ""}
                  >
                    <Link to="/about">
                      <i className="fa fa-info-circle"></i>
                      <span className="nav-text">About</span>
                    </Link>
                  </li>
                  <li
                    className={
                      location.pathname === "/register" ? "active" : ""
                    }
                  >
                    <Link to="/register">
                      <i className="fa fa-user-plus"></i>
                      <span className="nav-text">Register</span>
                    </Link>
                  </li>
                  <li
                    className={location.pathname === "/login" ? "active" : ""}
                  >
                    <Link to="/login">
                      <i className="fa fa-sign-in-alt"></i>
                      <span className="nav-text">Login</span>
                    </Link>
                  </li>
                </ul>
              ) : (
                <>
                  <ul className="nav-type specul z-3" id="nav2">
                    <li
                      className={
                        location.pathname === "/ourproducts" ||
                        location.pathname === "/"
                          ? "active"
                          : ""
                      }
                    >
                      <Link to="/ourproducts">
                        <i className="fa fa-box"></i>
                        <span className="nav-text">Our Products</span>
                      </Link>
                    </li>
                    <li
                      className={`dropdown  ${
                        location.pathname === "/categories" ||
                        location.pathname === "/brands"
                          ? "active"
                          : ""
                      }`}
                    >
                      <Link
                        to="#"
                        className="nav-link dropdown-toggle"
                        id="categoriesDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fa fa-list"></i>
                        <span className="nav-text">Explore</span>
                      </Link>
                      <ul
                        className="dropdown-menu exploer"
                        aria-labelledby="categoriesDropdown"
                      >
                        <li>
                          <Link to="/categories" className="dropdown-item">
                            Categories
                          </Link>
                        </li>
                        <li>
                          <Link to="/brands" className="dropdown-item">
                            Brands
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li
                      className={
                        location.pathname === "/wishlist" ? "active" : ""
                      }
                    >
                      <Link to="/wishlist">
                        <i className="fa fa-heart"></i>
                        <span className="nav-text">Wishlist</span>
                      </Link>
                    </li>
                    <li
                      className={location.pathname === "/cart" ? "active" : ""}
                    >
                      <Link to="/cart" className="position-relative">
                        <i className="fa fa-cart-shopping"></i>
                        <span className="nav-text">Cart</span>
                        {count ? (
                          <>
                            <p
                              id="count"
                              className="position-absolute badge rounded-pill"
                            >
                              {count}
                            </p>
                          </>
                        ) : (
                          ""
                        )}
                      </Link>
                    </li>
                  </ul>
                  <div className="ms-auto dropdown">
                    <Link
                      to="#"
                      className="dropdown-toggle text-white"
                      id="userDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-regular fa-user text-white fs-5"></i>
                    </Link>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="userDropdown"
                    >
                      <li>
                        <Link to="/profile" className="dropdown-item">
                          Account
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link to="/settings" className="dropdown-item">
                          Settings
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link
                          to="/login"
                          className="dropdown-item"
                          onClick={logout}
                        >
                          <i className="fa fa-sign-out-alt"></i> Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>
      </section>
    </>
  );
}
