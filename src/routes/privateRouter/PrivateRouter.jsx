import { Navigate } from "react-router-dom";
import React from "react";
import { useAuth } from '../../hooks/useAuth';

export const PrivateRouters = ({ children }) => {
  const { isAuthenticated } = useAuth();
  console.log('🚀 ~ PrivateRouters ~ isAuthenticated:', isAuthenticated)

  return isAuthenticated ? children : <Navigate to="/login" />;
};
