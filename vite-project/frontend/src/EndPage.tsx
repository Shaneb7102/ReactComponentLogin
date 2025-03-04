import "./App.css";
import { Link } from "react-router-dom";
import { getCurrentUser } from "./services/api";

const EndPage: React.FC = () => {
  const user = getCurrentUser();
    
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Hello, Thank you for logging in</h1>
      
      {user?.role === "ADMIN" && (
        <Link 
          to="/admin"
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Admin Panel
        </Link>
      )}
    </div>
  );
};

export default EndPage;