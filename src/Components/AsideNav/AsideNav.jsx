import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import "./AsideNav.css";
export default function AsideNav() {
  return (
    <div className="aside-nav d-flex flex-column bg-white rounded-2 mt-0 p-2 min-vh w-100 position-relative">
      <div className="setting position-absolute top-0 start-100">
        <button className="btn bg-main rounded-3">
          <i class="fa-solid fa-gear font-sm"></i>
        </button>
      </div>
      <h4 className="mb-4 cursor-pointer fs-5 text-center fw-bold">
        Dashboard
      </h4>
      <div className="nav flex-column fw-semibold">
        <li className="nav-item mb-2">
          <NavLink
            to="/Profile"
            end
            className={({ isActive }) =>
              isActive
                ? "nav-link text-main fw-bold active"
                : "nav-link text-dark"
            }
          >
            Profile
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="/Profile/address"
            className={({ isActive }) =>
              isActive
                ? "nav-link text-main fw-bold active"
                : "nav-link text-dark"
            }
          >
            Address
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to={`/Profile/allorders`}
            className={({ isActive }) =>
              isActive
                ? "nav-link text-main fw-bold active"
                : "nav-link text-dark"
            }
          >
            Orders
          </NavLink>
        </li>
      </div>
    </div>
  );
}
