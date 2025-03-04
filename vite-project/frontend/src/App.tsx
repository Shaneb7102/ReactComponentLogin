import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import EndPage from "./EndPage";
import AdminPage from "./AdminPage";
import AuthGuard from "./components/AuthGuard";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route 
  path="/admin" 
  element={
    <AuthGuard>
      <AdminPage />
    </AuthGuard>
  } 
/>
      {/* Protected route that requires authentication */}
      <Route 
        path="/end" 
        element={
          <AuthGuard>
            <EndPage />
          </AuthGuard>
        } 
      />
    </Routes>
  );
};

export default App;