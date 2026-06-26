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
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">

      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md z-10">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            VOLTRA
          </h1>
          <p className="text-gray-400 mt-2">
            Welcome back! Login to continue
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={submitHandler}
          className="bg-gray-900 border border-gray-800 p-8 rounded-3xl shadow-2xl"
        >
          <h2 className="text-3xl font-black text-white mb-8">
            Login
          </h2>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-gray-400 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-800 border border-gray-700 text-white p-4 rounded-xl outline-none focus:border-blue-500 transition placeholder-gray-600"
            />
          </div>

          {/* Password */}
          <div className="mb-8">
            <label className="block text-gray-400 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-800 border border-gray-700 text-white p-4 rounded-xl outline-none focus:border-blue-500 transition placeholder-gray-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-blue-500/20 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center mt-6 text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:text-blue-400 font-semibold">
              Register
            </Link>
          </p>
        </form>

      </div>
    </div>
  );
}

export default Login;