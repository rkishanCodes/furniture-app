import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  // Check if user is an admin
  if (user.role !== "ADMIN") {
    // Redirect to shop if user is not an admin
    return <Navigate to="/shop" />;
  }

  return children;
};

export default AdminRoute;
