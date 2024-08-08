import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
};

export const PublicRoute = ({ isLoggedIn, children }) => {
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return children;
};
