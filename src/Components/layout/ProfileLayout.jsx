import React from "react";
import { Outlet } from "react-router-dom";
import AsideNav from "../AsideNav/AsideNav";
import './Aside.css'
export default function ProfileLayout() {
  return (
    <>
      <div className="container-fluid w-100">
      <div className="row">
        <div className="col-4 col-md-3 translate">
          <AsideNav />
        </div>
        <div className="col-8 col-md-9">
          <Outlet />
        </div>
      </div>
      </div>
    </>
  );
}
