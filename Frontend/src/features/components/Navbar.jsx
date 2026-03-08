import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <Link to="/" className="text-2xl font-bold">MovieSpark</Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
