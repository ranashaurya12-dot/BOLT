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
        "https://bolt-cfp7.onrender.com/api/auth/logout",
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
    <nav className="bg-[#0D0B09] border-b border-[#2C2418] text-[#F5F1E8] sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 lg:px-14 py-5">

        {/* Logo */}
        <Link to="/">
          <h1 className="text-3xl font-black tracking-widest uppercase text-[#EEBA02] hover:text-[#FFD35C] transition duration-300">
            ⚡ BOLT FUEL
          </h1>
        </Link>

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-10 text-sm uppercase tracking-wider font-semibold">

          <Link to="/">
            <li
              className={`transition duration-300 ${
                isActive("/")
                  ? "text-[#EEBA02]"
                  : "text-[#F5F1E8] hover:text-[#EEBA02]"
              }`}
            >
              Home
            </li>
          </Link>

          <Link to="/shop">
            <li
              className={`transition duration-300 ${
                isActive("/shop")
                  ? "text-[#EEBA02]"
                  : "text-[#F5F1E8] hover:text-[#EEBA02]"
              }`}
            >
              Shop
            </li>
          </Link>

          <li className="cursor-pointer text-[#F5F1E8] hover:text-[#EEBA02] transition">
            Categories
          </li>

          <li className="cursor-pointer text-[#F5F1E8] hover:text-[#EEBA02] transition">
            About
          </li>

          {user && (
            <Link to="/orders">
              <li
                className={`transition duration-300 ${
                  isActive("/orders")
                    ? "text-[#EEBA02]"
                    : "text-[#F5F1E8] hover:text-[#EEBA02]"
                }`}
              >
                Orders
              </li>
            </Link>
          )}

          {user?.isAdmin && (
            <Link to="/admin">
              <li className="bg-[#EEBA02] text-black px-5 py-2 rounded-md font-bold hover:bg-[#FFD35C] transition">
                Admin
              </li>
            </Link>
          )}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          {user && (
            <Link to="/cart">
              <FiShoppingCart className="text-2xl text-[#F5F1E8] hover:text-[#EEBA02] transition duration-300" />
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-4">

              <div className="hidden md:flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EEBA02] flex items-center justify-center text-black font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <span className="text-[#F5F1E8] font-medium">
                  {user.name}
                </span>
              </div>

              <button
                onClick={logoutHandler}
                className="border border-[#EEBA02] text-[#EEBA02] px-5 py-2 rounded-md hover:bg-[#EEBA02] hover:text-black transition duration-300 font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">

              <Link to="/login">
                <button className="text-[#F5F1E8] hover:text-[#EEBA02] transition font-medium">
                  Login
                </button>
              </Link>

              <Link to="/register">
                <button className="bg-[#EEBA02] text-black px-6 py-2 rounded-md font-bold hover:bg-[#FFD35C] transition duration-300">
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