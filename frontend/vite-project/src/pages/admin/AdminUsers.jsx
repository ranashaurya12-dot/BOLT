import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      const { data } = await axios.get(
   "https://bolt-cfp7.onrender.com/api/admin/users",
        { withCredentials: true }
      );
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const { data } = await axios.delete(
        `https://bolt-cfp7.onrender.com/api/admin/user/${id}`,
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("User Deleted");
        getUsers();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-white">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 p-8">

      {/* Header */}
      <div className="mb-10">
        <p className="text-blue-500 uppercase tracking-widest text-sm font-semibold">
          Admin Panel
        </p>
        <h1 className="text-4xl font-black text-white mt-1">
          Users Management
        </h1>
        <p className="text-gray-400 mt-2">
          Manage all registered users
        </p>
      </div>

      {/* Stats */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 mb-8">
        <p className="text-gray-400">Total Users</p>
        <h2 className="text-5xl font-black text-white mt-2">
          {users.length}
        </h2>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-800">
              <tr>
                <th className="text-left px-6 py-4 text-gray-400 font-semibold">
                  Name
                </th>
                <th className="text-left px-6 py-4 text-gray-400 font-semibold">
                  Email
                </th>
                <th className="text-left px-6 py-4 text-gray-400 font-semibold">
                  Joined
                </th>
                <th className="text-left px-6 py-4 text-gray-400 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-800 hover:bg-gray-800/50 transition"
                >
                  {/* Name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-white font-semibold">
                        {user.name}
                      </span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-gray-400">
                    {user.email}
                  </td>

                  {/* Joined */}
                  <td className="px-6 py-4 text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500 hover:text-white transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl font-bold text-white">No Users Found</p>
              <p className="text-gray-500 mt-2">Users will appear here after registration.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;