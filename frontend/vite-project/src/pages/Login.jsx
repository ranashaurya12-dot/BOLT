import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "https://bolt-cfp7.onrender.com/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      if (response.data.success) {
        setEmail("");
        setPassword("");
        setUser(response.data.user);
        toast.success("Login Successful");
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="min-h-screen bg-[#0D0B09] flex items-center justify-center px-4 relative overflow-hidden">

    {/* Background glow */}
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#EEBA02]/10 rounded-full blur-3xl pointer-events-none" />

    <div className="w-full max-w-md z-10">

      {/* Logo */}
      <div className="text-center mb-10">
        <h1 className="font-['Oswald'] text-5xl font-bold italic uppercase tracking-tight text-[#EEBA02]">
        BOLT FUEL
        </h1>
        <div className="w-20 h-[2px] bg-[#8C7437] mx-auto mt-4"></div>
        <p className="text-[#9C9589] mt-4 text-base">
          Welcome back! Login to continue
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={submitHandler}
        className="bg-[#15120F] border border-[#2C2418] rounded-lg p-8 shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
      >
        <h2 className="font-['Oswald'] text-4xl font-bold italic uppercase tracking-tight text-[#F5F1E8] mb-8">
          Login
        </h2>

        {/* Email */}
        <div className="mb-6">
          <label className="block font-['Oswald'] text-xs uppercase tracking-[2px] text-[#8C7437] mb-2">
            Email Address
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-[#2C2418] bg-[#0D0B09] p-4 text-[#F5F1E8] placeholder-[#6F685C] outline-none transition-all duration-300 focus:border-[#EEBA02]"
          />
        </div>

        {/* Password */}
        <div className="mb-8">
          <label className="block font-['Oswald'] text-xs uppercase tracking-[2px] text-[#8C7437] mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-[#2C2418] bg-[#0D0B09] p-4 text-[#F5F1E8] placeholder-[#6F685C] outline-none transition-all duration-300 focus:border-[#EEBA02]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[#EEBA02] py-4 text-lg font-bold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-[#FFD35C] disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-6 text-[#9C9589]">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#EEBA02] transition-colors duration-300 hover:text-[#FFD35C]"
          >
            Register
          </Link>
        </p>
      </form>

    </div>
  </div>
);
}

export default Login;