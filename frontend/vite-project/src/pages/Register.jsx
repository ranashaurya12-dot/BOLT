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

    <div className="bg-gray-100 min-h-screen flex items-center justify-center">

      <form
        onSubmit={submitHandler}
        className="bg-white p-10 rounded-3xl shadow-lg w-[450px]"
      >

        <h1 className="text-4xl font-bold mb-8 text-center">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="w-full border p-4 rounded-xl mb-5 outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full border p-4 rounded-xl mb-5 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full border p-4 rounded-xl mb-5 outline-none"
        />

        <button
          className="bg-blue-500 text-white w-full py-4 rounded-xl text-xl hover:bg-blue-600 transition"
        >
          Register
        </button>

      </form>

    </div>

  );
}

export default Register;