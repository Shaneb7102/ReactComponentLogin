import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EndPage from "./pages/EndPage";
import AdminPage from "./pages/AdminPage";
import AuthGuard from "./components/AuthGuard";

const App: React.FC = () => {
  return (
    <HashRouter>
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
        <Route 
          path="/end" 
          element={
            <AuthGuard>
              <EndPage />
            </AuthGuard>
          } 
        />
      </Routes>
    </HashRouter>
  );
};

export default App;