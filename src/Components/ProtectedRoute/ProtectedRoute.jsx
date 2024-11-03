import React from "react";
import { useContext } from "react";
import { authcontext } from "./../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(authcontext);
  if (!token && !localStorage.getItem("tkn")) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}
