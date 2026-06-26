import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import toast from "react-hot-toast";
function Register() {
const {setUser}=useContext(AuthContext);
  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
       "https://bolt-cfp7.onrender.com/api/auth/register",
        {
          name,
          email,
          password
        },
        {
          withCredentials:true
        }
      );

      if(response.data.success){

        // clear inputs
        setName("");
        setEmail("");
        setPassword("");
        setUser(response.data.user);
       toast.success("register successfull")
        // redirect to home
        navigate("/");

      } else {

      // toast.error(error.response.data.message);

      }

    } catch (error) {

   toast.error(error.response.data.message);

    }

  };
return (

  <div className="min-h-screen bg-[#0D0B09] flex items-center justify-center px-4 relative overflow-hidden">

    {/* Background Glow */}
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-[#EEBA02]/10 blur-3xl pointer-events-none" />

    <form
      onSubmit={submitHandler}
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
        onChange={(e)=>setName(e.target.value)}
        className="w-full rounded-lg border border-[#2C2418] bg-[#0D0B09] p-4 mb-5 text-[#F5F1E8] placeholder-[#6F685C] outline-none transition-all duration-300 focus:border-[#EEBA02]"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        className="w-full rounded-lg border border-[#2C2418] bg-[#0D0B09] p-4 mb-5 text-[#F5F1E8] placeholder-[#6F685C] outline-none transition-all duration-300 focus:border-[#EEBA02]"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        className="w-full rounded-lg border border-[#2C2418] bg-[#0D0B09] p-4 mb-8 text-[#F5F1E8] placeholder-[#6F685C] outline-none transition-all duration-300 focus:border-[#EEBA02]"
      />

      <button
        className="w-full rounded-lg bg-[#EEBA02] py-4 text-lg font-bold uppercase tracking-wide text-black transition-all duration-300 hover:scale-[1.02] hover:bg-[#FFD35C]"
      >
        Register
      </button>

      <p className="mt-6 text-center text-[#9C9589]">
        Already have an account?{" "}
        <span className="font-semibold text-[#EEBA02]">
          Login
        </span>
      </p>

    </form>

  </div>

);
}

export default Register;