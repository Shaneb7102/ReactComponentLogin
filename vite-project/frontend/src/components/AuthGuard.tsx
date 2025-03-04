import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated, getCurrentUser } from "../services/api";
import React from "react";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, requiredRole = "RESEARCHER" }) => {
  const location = useLocation();
  const authenticated = isAuthenticated();
  const user = getCurrentUser();
  
  // If not authenticated, redirect to login
  if (!authenticated) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }
  
  // Check if user has the required role
  const hasRequiredRole = user?.role === requiredRole || user?.role === "ADMIN";
  if (!hasRequiredRole && requiredRole !== "RESEARCHER") {
    return (
      <Navigate 
        to="/unauthorized" 
        state={{ from: location }} 
        replace 
      />
    );
  }
  
  // User is authenticated and has required role
  return <>{children}</>;
};

export default AuthGuard;