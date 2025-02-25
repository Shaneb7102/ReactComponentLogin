import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
    <h2>Think-Thank Research Centre</h2>
    <form>
      
      <button type ="button" onClick={() => navigate("/login")} >Login</button>
      <button type ="button" onClick={() => navigate("/register")}>Register</button>

    </form>
  </div>

    </>
  );
};

export default HomePage;