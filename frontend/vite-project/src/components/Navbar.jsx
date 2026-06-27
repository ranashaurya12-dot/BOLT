import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FiShoppingCart } from "react-icons/fi";
import logo from "../assets/boltfuel.jpeg";
import { Navigate } from "react-router-dom";
function Navbar() {
  const navigate=useNavigate();
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
    <nav className="sticky top-0 z-50 bg-[#0D0B09]/95 backdrop-blur-md border-b border-[#2C2418] shadow-lg">
  <div className="max-w-7xl mx-auto h-24 flex items-center justify-between px-6 lg:px-12">

    {/* Logo */}
    <Link
      to="/"
      className="flex items-center flex-shrink-0"
    >
      <img
        src={logo}
        alt="Bolt Fuel"
        className="h-20 lg:h-24 w-auto object-contain transition-all duration-300 hover:scale-105"
      />
    </Link>

    {/* Navigation */}
    <ul className="hidden md:flex items-center gap-10 text-sm uppercase tracking-wider font-semibold">

      <Link to="/">
        <li
          className={`transition ${
            isActive("/")
              ? "text-[#EEBA02]"
              : "text-white hover:text-[#EEBA02]"
          }`}
        >
          Home
        </li>
      </Link>

      <Link to="/shop">
        <li
          className={`transition ${
            isActive("/shop")
              ? "text-[#EEBA02]"
              : "text-white hover:text-[#EEBA02]"
          }`}
        >
          Shop
        </li>
      </Link>

      <li className="cursor-pointer text-white hover:text-[#EEBA02] transition">
        Categories
      </li>

      <li className="cursor-pointer text-white hover:text-[#EEBA02] transition" onClick={()=>navigate("/about")}>
        About
      </li>

      {user && (
        <Link to="/orders">
          <li
            className={`transition ${
              isActive("/orders")
                ? "text-[#EEBA02]"
                : "text-white hover:text-[#EEBA02]"
            }`}
          >
            Orders
          </li>
        </Link>
      )}

      {user?.isAdmin && (
        <Link to="/admin">
          <li className="bg-[#EEBA02] text-black px-5 py-2 rounded-lg font-bold hover:bg-yellow-400 transition">
            Admin
          </li>
        </Link>
      )}
    </ul>

    {/* Right Side */}
    <div className="flex items-center gap-5">

      {user && (
        <Link to="/cart">
          <FiShoppingCart className="text-2xl text-white hover:text-[#EEBA02] transition" />
        </Link>
      )}

      {user ? (
        <div className="flex items-center gap-4">

          <div className="hidden md:flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EEBA02] flex items-center justify-center text-black font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <span className="text-white font-medium">
              {user.name}
            </span>
          </div>

          <button
            onClick={logoutHandler}
            className="border border-[#EEBA02] text-[#EEBA02] px-5 py-2 rounded-lg hover:bg-[#EEBA02] hover:text-black transition"
          >
            Logout
          </button>

        </div>
      ) : (
        <div className="flex items-center gap-3">

          <Link to="/login">
            <button className="text-white hover:text-[#EEBA02] transition">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="bg-[#EEBA02] text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 transition">
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