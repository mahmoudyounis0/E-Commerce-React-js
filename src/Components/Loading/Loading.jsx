// src/Components/Loading/Loading.js
import React from "react";
import "./Loading.css"; // Create this CSS file for spinner styles
export default function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-50 w-100 bg-white">
      <div className="loader"></div>
    </div>
  );
}
