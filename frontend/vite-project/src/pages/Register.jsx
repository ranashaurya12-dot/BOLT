import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import toast from "react-hot-toast";

function Register() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://bolt-cfp7.onrender.com/api/auth/register",
        { name, email, password },
        { withCredentials: true }
      );
      if (response.data.success) {
        setName("");
        setEmail("");
        setPassword("");
        setUser(response.data.user);
        toast.success("Registration successful!");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0B09] flex items-center justify-center px-4 relative overflow-hidden">

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-[#EEBA02]/10 blur-3xl pointer-events-none" />

      <form
        onSubmit={submitHandler}
        style={{
          opacity: visible ? 1 : 0,
          filter: visible ? "blur(0px)" : "blur(12px)",
          transform: visible ? "translateY(0px)" : "translateY(20px)",
          transition: "opacity 0.7s ease, filter 0.7s ease, transform 0.7s ease",
        }}
        className="relative z-10 w-full max-w-md rounded-lg border border-[#2C2418] bg-[#15120F] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
      >
        <div className="text-center mb-8">
          <h1 className="font-['Oswald'] text-5xl font-bold italic uppercase tracking-tight text-[#F5F1E8]">
            Create Account
          </h1>
          <div className="w-20 h-[2px] bg-[#8C7437] mx-auto mt-4"></div>
          <p className="mt-4 text-[#9C9589]">
            Join the premium fitness community.
          </p>
        </div>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          className="w-full rounded-lg border border-[#2C2418] bg-[#0D0B09] p-4 mb-5 text-[#F5F1E8] placeholder-[#6F685C] outline-none transition-all duration-300 focus:border-[#EEBA02] disabled:opacity-50"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="w-full rounded-lg border border-[#2C2418] bg-[#0D0B09] p-4 mb-5 text-[#F5F1E8] placeholder-[#6F685C] outline-none transition-all duration-300 focus:border-[#EEBA02] disabled:opacity-50"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          className="w-full rounded-lg border border-[#2C2418] bg-[#0D0B09] p-4 mb-8 text-[#F5F1E8] placeholder-[#6F685C] outline-none transition-all duration-300 focus:border-[#EEBA02] disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[#EEBA02] py-4 text-lg font-bold uppercase tracking-wide text-black transition-all duration-300 hover:scale-[1.02] hover:bg-[#FFD35C] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="mt-6 text-center text-[#9C9589]">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="font-semibold text-[#EEBA02] cursor-pointer hover:text-[#FFD35C] transition-colors duration-200"
          >
            Login
          </span>
        </p>
      </form>

    </div>
  );
}

export default Register;