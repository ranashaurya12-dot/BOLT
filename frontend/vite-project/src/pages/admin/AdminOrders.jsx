import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  IndianRupee,
  ShoppingBag,
  Search,
  User,
  Calendar,
} from "lucide-react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

const getOrders = async () => {
  try {
    setLoading(true);

    const { data } = await axios.get(
      "http://localhost:4000/api/admin/orders",
      { withCredentials: true }
    );

    if (data.success) {
      setOrders(data.orders || []);
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch orders");
  } finally {
    setLoading(false);
  }
};

const updateStatus = async (id, status) => {
  try {
    const { data } = await axios.put(
      `http://localhost:4000/api/admin/order/${id}`,
      { status },
      { withCredentials: true }
    );

    if (data.success) {
      toast.success("Status Updated");
      getOrders();
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to update status");
  }
};

  useEffect(() => {
    getOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Shipped": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Delivered": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Cancelled": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending": return <Package size={16} />;
      case "Shipped": return <Truck size={16} />;
      case "Delivered": return <CheckCircle size={16} />;
      case "Cancelled": return <XCircle size={16} />;
      default: return <Package size={16} />;
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const name = order?.user?.name?.toLowerCase() || "";
      const email = order?.user?.email?.toLowerCase() || "";
      return (
        name.includes(search.toLowerCase()) ||
        email.includes(search.toLowerCase())
      );
    });
  }, [orders, search]);

// ✅ Bug #3 fix — exclude cancelled from revenue
const totalRevenue = orders
  .filter((o) => o.status !== "Cancelled")
  .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

// ✅ exclude cancelled from total orders count
const activeOrders = orders.filter((o) => o.status !== "Cancelled");
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const deliveredOrders = orders.filter((o) => o.status === "Delivered").length;

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
          Orders Dashboard
        </h1>
        <p className="text-gray-400 mt-2">
          Manage customer orders and deliveries
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 hover:border-blue-500 transition">
          <ShoppingBag className="text-blue-500" size={35} />
          <h2 className="text-5xl font-black text-white mt-4">{orders.length}</h2>
          <p className="text-gray-400 mt-2">Total Orders</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 hover:border-blue-500 transition">
          <IndianRupee className="text-green-500" size={35} />
          <h2 className="text-5xl font-black text-blue-500 mt-4">₹{totalRevenue}</h2>
          <p className="text-gray-400 mt-2">Total Revenue</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 hover:border-blue-500 transition">
          <Truck className="text-yellow-500" size={35} />
          <h2 className="text-5xl font-black text-white mt-4">{pendingOrders}</h2>
          <p className="text-gray-400 mt-2">Pending Orders</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 hover:border-blue-500 transition">
          <CheckCircle className="text-green-500" size={35} />
          <h2 className="text-5xl font-black text-white mt-4">{deliveredOrders}</h2>
          <p className="text-gray-400 mt-2">Delivered</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-5 mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search by customer name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-2xl pl-12 pr-4 py-3 outline-none focus:border-blue-500 transition"
          />
        </div>
      </div>

      {/* Orders */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-900 border border-gray-800 rounded-3xl p-6 hover:border-blue-500/40 transition"
            >
              <div className="flex flex-col xl:flex-row gap-8 justify-between">

                {/* Left */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h2 className="text-2xl font-black text-white">
                      {order?.user?.name || "Deleted User"}
                    </h2>
                    <span className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${getStatusColor(order?.status)}`}>
                      {getStatusIcon(order?.status)}
                      {order?.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-gray-400">
                    <p className="flex items-center gap-2">
                      <User size={16} />
                      {order?.user?.email || "No Email"}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar size={16} />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Products */}
                  <div className="mt-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-white text-lg">Products</h3>
                      <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                        {order?.products?.length || 0} Items
                      </span>
                    </div>
                    <div className="space-y-3">
                      {order?.products?.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center bg-gray-800 rounded-2xl px-4 py-3"
                        >
                          <span className="text-white font-medium">
                            {item?.product?.name || "Deleted Product"}
                          </span>
                          <span className="text-gray-400">
                            Qty: {item?.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="xl:w-72">
                  <div className="bg-blue-600 rounded-3xl text-white p-6">
                    <p className="text-blue-200">Total Amount</p>
                    <h2 className="text-4xl font-black mt-2">
                      ₹{order?.totalAmount || 0}
                    </h2>
                  </div>

         <div className="mt-5">
  <label className="block font-semibold text-gray-400 mb-2">
    Update Status
  </label>

  {/* ✅ Bug #2 fix — disable dropdown for cancelled orders */}
  {order?.status === "Cancelled" ? (
    <div className="w-full bg-red-500/20 border border-red-500/30 text-red-400 rounded-2xl px-4 py-3 text-center font-semibold">
      Order Cancelled — Cannot Modify
    </div>
  ) : (
    <select
      value={order?.status}
      onChange={(e) => updateStatus(order._id, e.target.value)}
      className="w-full bg-gray-800 border border-gray-700 text-white rounded-2xl px-4 py-3 outline-none focus:border-blue-500 transition"
    >
      <option value="Pending">Pending</option>
      <option value="Shipped">Shipped</option>
      <option value="Delivered">Delivered</option>
      <option value="Cancelled">Cancelled</option>
    </select>
  )}
</div>

                  <div className="mt-5 bg-gray-800 rounded-2xl p-4">
                    <p className="text-xs text-gray-500">ORDER ID</p>
                    <p className="text-gray-400 text-sm mt-1">
                      #{order?._id.slice(-8).toUpperCase()}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-20 text-center">
          <ShoppingBag size={70} className="mx-auto text-gray-700" />
          <h2 className="text-3xl font-bold text-white mt-4">No Orders Found</h2>
          <p className="text-gray-500 mt-2">Orders will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;