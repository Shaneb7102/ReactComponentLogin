import "../App.css";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { loginUser, LoginCredentials } from "../services/api";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the page they were trying to access before being redirected to login
  const from = location.state?.from?.pathname || "/end";
  
  const [credentials, setCredentials] = useState<LoginCredentials>({
      email: "",
      password: "",
  });

  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!credentials.email || !credentials.password) {
      setMessage("Please enter both email and password");
      return;
    }
    
    const data = await loginUser(credentials);

    if (data?.token) {
      localStorage.setItem("token", data.token);
      setMessage("Login Successful!");
      // Navigate to the protected page they were trying to access, or to EndPage
      navigate(from);
    } else {
      setMessage("Invalid Credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>
            <form className="mt-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                    Login
                </button>
            </form>
            {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
            <p className="mt-4 text-center text-sm text-gray-600">
                Don't have an account? <a href="/register" className="text-blue-500">Sign up</a>
            </p>
        </div>
    </div>
  );
};

export default LoginPage;