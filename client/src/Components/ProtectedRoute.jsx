import React from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    // If there's no token, redirect to login
    return <Navigate to={'/login'} replace />
  }

  // Otherwise, render the protected component
  return children;
};

export default ProtectedRoute;
