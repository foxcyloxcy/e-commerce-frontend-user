import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ isLoggedIn, children }) => {
  const location = useLocation();
  if (!isLoggedIn) {
    return <Navigate to={location.pathname} />;
  }
  return children;
};

export const PublicRoute = ({ isLoggedIn, children }) => {
  const location = useLocation();
  if (isLoggedIn) {
    return <Navigate to={location.pathname} />;
  }
  return children;
};
