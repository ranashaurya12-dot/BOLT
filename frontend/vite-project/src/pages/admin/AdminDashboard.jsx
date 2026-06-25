import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getStats = async () => {
    try {
      const { data } = await axios.get(
       "http://localhost:4000/api/admin/stats",
        { withCredentials: true }
      );
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStats();
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
      <div className="mb-10 flex justify-between items-center">
        <div>
          <p className="text-blue-500 uppercase tracking-widest text-sm font-semibold">
            Admin Panel
          </p>
          <h1 className="text-4xl font-black text-white mt-1">
            Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Welcome back! Here's what's happening in your store.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        {/* Users */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 hover:border-blue-500 transition">
          <div className="text-4xl mb-4">👥</div>
          <p className="text-gray-400">Total Users</p>
          <h2 className="text-5xl font-black text-white mt-2">
            {stats?.totalUsers}
          </h2>
        </div>

        {/* Products */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 hover:border-blue-500 transition">
          <div className="text-4xl mb-4">📦</div>
          <p className="text-gray-400">Total Products</p>
          <h2 className="text-5xl font-black text-white mt-2">
            {stats?.totalProducts}
          </h2>
        </div>

        {/* Orders */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 hover:border-blue-500 transition">
          <div className="text-4xl mb-4">🛒</div>
          <p className="text-gray-400">Total Orders</p>
          <h2 className="text-5xl font-black text-white mt-2">
            {stats?.totalOrders}
          </h2>
        </div>

        {/* Revenue */}
        <div className="bg-gray-900 border border-blue-500/30 rounded-3xl p-6 hover:border-blue-500 transition">
          <div className="text-4xl mb-4">💰</div>
          <p className="text-gray-400">Total Revenue</p>
          <h2 className="text-5xl font-black text-blue-500 mt-2">
            ₹{stats?.totalRevenue}
          </h2>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <button
          onClick={() => navigate("/admin/products")}
          className="bg-gray-900 border border-gray-800 rounded-3xl p-6 text-left hover:border-blue-500 transition group"
        >
          <div className="text-3xl mb-3">📦</div>
          <h3 className="text-xl font-bold text-white">Manage Products</h3>
          <p className="text-gray-400 mt-2">Add, edit or delete products</p>
          <p className="text-blue-500 mt-4 group-hover:underline">
            Go to Products →
          </p>
        </button>

        <button
          onClick={() => navigate("/admin/orders")}
          className="bg-gray-900 border border-gray-800 rounded-3xl p-6 text-left hover:border-blue-500 transition group"
        >
          <div className="text-3xl mb-3">🛒</div>
          <h3 className="text-xl font-bold text-white">Manage Orders</h3>
          <p className="text-gray-400 mt-2">View and update order status</p>
          <p className="text-blue-500 mt-4 group-hover:underline">
            Go to Orders →
          </p>
        </button>

        <button
          onClick={() => navigate("/admin/users")}
          className="bg-gray-900 border border-gray-800 rounded-3xl p-6 text-left hover:border-blue-500 transition group"
        >
          <div className="text-3xl mb-3">👥</div>
          <h3 className="text-xl font-bold text-white">Manage Users</h3>
          <p className="text-gray-400 mt-2">View and delete users</p>
          <p className="text-blue-500 mt-4 group-hover:underline">
            Go to Users →
          </p>
        </button>

      </div>

      {/* Store Overview */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8">
        <h2 className="text-2xl font-black text-white mb-6">
          Store Overview
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-2xl p-5">
            <h3 className="font-bold text-white text-lg">Products</h3>
            <p className="text-gray-400 mt-2">
              You have{" "}
              <span className="text-blue-500 font-bold">
                {stats?.totalProducts}
              </span>{" "}
              products listed.
            </p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-5">
            <h3 className="font-bold text-white text-lg">Orders</h3>
            <p className="text-gray-400 mt-2">
              Customers placed{" "}
              <span className="text-blue-500 font-bold">
                {stats?.totalOrders}
              </span>{" "}
              orders total.
            </p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-5">
            <h3 className="font-bold text-white text-lg">Revenue</h3>
            <p className="text-gray-400 mt-2">
              Total earnings:{" "}
              <span className="text-blue-500 font-bold">
                ₹{stats?.totalRevenue}
              </span>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;