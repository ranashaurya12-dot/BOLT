import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FiShoppingCart, FiX, FiMenu, FiLogOut, FiPackage, FiHome, FiShoppingBag, FiInfo } from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";
import logo from "../assets/boltfuel.jpeg";

function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  if (location.pathname.startsWith("/admin")) return null;

  const logoutHandler = async () => {
    try {
      await axios.post(
        "https://bolt-cfp7.onrender.com/api/auth/logout",
        {},
        { withCredentials: true }
      );
      toast.success("Logged Out Successfully");
      setUser(null);
      setMenuOpen(false);
    } catch {
      toast.error("Something went wrong");
    }
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: "/", label: "Home", icon: <FiHome /> },
    { to: "/shop", label: "Shop", icon: <FiShoppingBag /> },
    { to: "/about", label: "About", icon: <FiInfo />, onClick: () => navigate("/about") },
    ...(user ? [{ to: "/orders", label: "Orders", icon: <FiPackage /> }] : []),
  ];

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(238,186,2,0.5); }
          70%  { box-shadow: 0 0 0 8px rgba(238,186,2,0); }
          100% { box-shadow: 0 0 0 0 rgba(238,186,2,0); }
        }
        .nav-link-underline {
          position: relative;
        }
        .nav-link-underline::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 2px;
          background: #EEBA02;
          border-radius: 2px;
          transition: width 0.25s ease;
        }
        .nav-link-underline:hover::after,
        .nav-link-underline.active::after {
          width: 100%;
        }
        .mobile-menu-enter {
          animation: slideDown 0.28s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .mobile-link-enter {
          animation: slideInRight 0.3s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .avatar-pulse {
          animation: pulse-ring 2.5s ease-out infinite;
        }
        .hamburger-line {
          display: block;
          width: 22px;
          height: 2px;
          background: #fff;
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          transform-origin: center;
        }
        .hamburger-open .line-top    { transform: translateY(6px) rotate(45deg); }
        .hamburger-open .line-mid    { opacity: 0; transform: scaleX(0); }
        .hamburger-open .line-bot    { transform: translateY(-6px) rotate(-45deg); }
        .scrolled-nav {
          box-shadow: 0 4px 32px rgba(0,0,0,0.45);
        }
      `}</style>

      <nav
        className={`sticky top-0 z-50 bg-[#0D0B09]/96 backdrop-blur-md border-b border-[#2C2418] transition-all duration-300 ${
          scrolled ? "scrolled-nav" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-4 sm:px-6 lg:px-12">

          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0 group">
            <img
              src={logo}
              alt="Bolt Fuel"
              className="h-14 sm:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-semibold">
            {navLinks.map(({ to, label, onClick }) => (
              <li key={label}>
                {onClick ? (
                  <button
                    onClick={onClick}
                    className={`nav-link-underline transition-colors duration-200 ${
                      isActive(to) ? "text-[#EEBA02] active" : "text-white hover:text-[#EEBA02]"
                    }`}
                  >
                    {label}
                  </button>
                ) : (
                  <Link
                    to={to}
                    className={`nav-link-underline transition-colors duration-200 ${
                      isActive(to) ? "text-[#EEBA02] active" : "text-white hover:text-[#EEBA02]"
                    }`}
                  >
                    {label}
                  </Link>
                )}
              </li>
            ))}

            {user?.isAdmin && (
              <li>
                <Link
                  to="/admin"
                  className="flex items-center gap-1.5 bg-[#EEBA02] text-black px-4 py-1.5 rounded-lg font-bold hover:bg-yellow-300 transition-all duration-200 hover:shadow-[0_0_14px_rgba(238,186,2,0.5)]"
                >
                  <MdAdminPanelSettings size={16} />
                  Admin
                </Link>
              </li>
            )}
          </ul>

          {/* Right: Cart + Auth (desktop) + Hamburger */}
          <div className="flex items-center gap-3 sm:gap-5">

            {user && (
              <Link to="/cart" className="relative group">
                <FiShoppingCart className="text-xl sm:text-2xl text-white group-hover:text-[#EEBA02] transition-colors duration-200" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#EEBA02] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </Link>
            )}

            {/* Desktop auth */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#EEBA02] flex items-center justify-center text-black font-bold text-sm avatar-pulse select-none">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white font-medium text-sm">{user.name}</span>
                  </div>
                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-1.5 border border-[#EEBA02] text-[#EEBA02] px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-[#EEBA02] hover:text-black transition-all duration-200"
                  >
                    <FiLogOut size={14} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button className="text-white text-sm hover:text-[#EEBA02] transition-colors duration-200">
                      Login
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="bg-[#EEBA02] text-black px-5 py-2 rounded-lg text-sm font-bold hover:bg-yellow-300 transition-all duration-200 hover:shadow-[0_0_14px_rgba(238,186,2,0.4)]">
                      Get Started
                    </button>
                  </Link>
                </>
              )}
            </div>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden flex flex-col gap-[5px] items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <div className={menuOpen ? "hamburger-open" : ""}>
                <span className="hamburger-line line-top" />
                <span className="hamburger-line line-mid mt-[4px]" />
                <span className="hamburger-line line-bot mt-[4px]" />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mobile-menu-enter bg-[#0D0B09]/98 border-t border-[#2C2418] px-5 pt-4 pb-6">

            {/* User info (mobile) */}
            {user && (
              <div
                className="mobile-link-enter flex items-center gap-3 mb-5 pb-4 border-b border-[#2C2418]"
                style={{ animationDelay: "0ms" }}
              >
                <div className="w-10 h-10 rounded-full bg-[#EEBA02] flex items-center justify-center text-black font-bold avatar-pulse select-none">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{user.name}</p>
                  <p className="text-[#888] text-xs">Member</p>
                </div>
              </div>
            )}

            {/* Nav links */}
            <ul className="flex flex-col gap-1 mb-5">
              {navLinks.map(({ to, label, icon, onClick }, i) => (
                <li
                  key={label}
                  className="mobile-link-enter"
                  style={{ animationDelay: `${i * 45}ms` }}
                >
                  {onClick ? (
                    <button
                      onClick={onClick}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
                        isActive(to)
                          ? "bg-[#EEBA02]/15 text-[#EEBA02]"
                          : "text-white hover:bg-white/8 hover:text-[#EEBA02]"
                      }`}
                    >
                      <span className="text-base opacity-70">{icon}</span>
                      {label}
                    </button>
                  ) : (
                    <Link
                      to={to}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
                        isActive(to)
                          ? "bg-[#EEBA02]/15 text-[#EEBA02]"
                          : "text-white hover:bg-white/8 hover:text-[#EEBA02]"
                      }`}
                    >
                      <span className="text-base opacity-70">{icon}</span>
                      {label}
                    </Link>
                  )}
                </li>
              ))}

              {user?.isAdmin && (
                <li
                  className="mobile-link-enter"
                  style={{ animationDelay: `${navLinks.length * 45}ms` }}
                >
                  <Link
                    to="/admin"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider bg-[#EEBA02]/20 text-[#EEBA02] hover:bg-[#EEBA02]/30 transition-all duration-200"
                  >
                    <MdAdminPanelSettings className="text-base" />
                    Admin Panel
                  </Link>
                </li>
              )}
            </ul>

            {/* Auth actions (mobile) */}
            <div
              className="mobile-link-enter border-t border-[#2C2418] pt-4"
              style={{ animationDelay: `${(navLinks.length + 1) * 45}ms` }}
            >
              {user ? (
                <button
                  onClick={logoutHandler}
                  className="w-full flex items-center justify-center gap-2 border border-[#EEBA02] text-[#EEBA02] py-3 rounded-xl font-semibold hover:bg-[#EEBA02] hover:text-black transition-all duration-200"
                >
                  <FiLogOut size={16} />
                  Logout
                </button>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link to="/login" className="w-full">
                    <button className="w-full border border-white/20 text-white py-3 rounded-xl font-semibold hover:border-[#EEBA02] hover:text-[#EEBA02] transition-all duration-200">
                      Login
                    </button>
                  </Link>
                  <Link to="/register" className="w-full">
                    <button className="w-full bg-[#EEBA02] text-black py-3 rounded-xl font-bold hover:bg-yellow-300 transition-all duration-200 hover:shadow-[0_0_18px_rgba(238,186,2,0.45)]">
                      Get Started
                    </button>
                  </Link>
                </div>
              )}
            </div>

          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;