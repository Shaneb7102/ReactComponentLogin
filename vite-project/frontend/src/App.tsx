import React from "react";
import { BrowserRouter as Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EndPage from "./pages/EndPage";
import AdminPage from "./pages/AdminPage";
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