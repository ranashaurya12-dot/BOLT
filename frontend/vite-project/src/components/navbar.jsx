import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FiShoppingCart } from "react-icons/fi";

function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const location = useLocation();

  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  const logoutHandler = async () => {
    try {
      await axios.post(
         "http://localhost:4000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      toast.success("Logged Out Successfully");
      setUser(null);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gray-950 text-white px-8 md:px-16 py-5 sticky top-0 z-50 border-b border-gray-800/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link to="/">
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
          BOLT
          </h1>
        </Link>

        {/* Navigation */}
        <ul className="hidden md:flex gap-8 text-base items-center">
          <Link to="/">
            <li className={`transition font-medium ${isActive("/") ? "text-blue-500" : "text-gray-300 hover:text-white"}`}>
              Home
            </li>
          </Link>

          <Link to="/shop">
            <li className={`transition font-medium ${isActive("/shop") ? "text-blue-500" : "text-gray-300 hover:text-white"}`}>
              Shop
            </li>
          </Link>

          <li className="text-gray-300 hover:text-white cursor-pointer transition font-medium">
            Categories
          </li>

          <li className="text-gray-300 hover:text-white cursor-pointer transition font-medium">
            About
          </li>

          {user && (
            <Link to="/orders">
              <li className={`transition font-medium ${isActive("/orders") ? "text-blue-500" : "text-gray-300 hover:text-white"}`}>
                Orders
              </li>
            </Link>
          )}

          {user?.isAdmin && (
            <Link to="/admin">
              <li className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition text-sm">
                Admin Panel
              </li>
            </Link>
          )}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          {user && (
            <Link to="/cart">
              <div className="relative">
                <FiShoppingCart className="text-2xl text-gray-300 hover:text-blue-500 transition" />
              </div>
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-300 text-sm">
                  {user.name}
                </span>
              </div>

              <button
                onClick={logoutHandler}
                className="bg-red-500/20 text-red-400 border border-red-500/30 px-5 py-2 rounded-full hover:bg-red-500 hover:text-white transition text-sm font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <button className="text-gray-300 hover:text-white transition text-sm font-medium">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-full transition text-sm font-bold shadow-lg shadow-blue-500/20">
                  Get Started
                </button>
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;