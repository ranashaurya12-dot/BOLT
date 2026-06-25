import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ← add

  const getUser = async () => {
    try {
      const response = await axios.get(
        "https://bolt-cfp7.onrender.com/api/auth/me",
        { withCredentials: true }
      );
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // ← add
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}> 
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;