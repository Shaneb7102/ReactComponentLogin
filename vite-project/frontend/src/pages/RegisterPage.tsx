import "../App.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { registerUser, RegisterCredentials } from "../services/api";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    name: "",
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
      setMessage("Please fill in all required fields");
      return;
    }

    const data = await registerUser(credentials);

    if (data?.message) {
      setMessage("Registration successful!");
      // You could either automatically log them in:
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      navigate("/login");
    } else {
      setMessage("Registration failed. Email may already exist.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Register</h2>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={credentials.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
            className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Register
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-blue-500">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;