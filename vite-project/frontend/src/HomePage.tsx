import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">
        Think-Thank Research Centre
      </h2>
      <div className="space-x-4">
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>

        <button
          type="button"
          onClick={() => navigate("/register")}
          className="px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default HomePage;
