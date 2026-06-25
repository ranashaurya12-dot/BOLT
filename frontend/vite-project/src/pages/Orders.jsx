import { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Orders() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "https://bolt-cfp7.onrender.com/api/order/my-orders",
        { withCredentials: true }
      );

      setOrders(response.data.orders || []);
    } catch (error) {
      console.error(error);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/login");
      return;
    }

    fetchOrders();
  }, [user, loading]);

  const cancelOrder = async (orderId) => {
    try {
      const response = await axios.put(
        `https://bolt-cfp7.onrender.com/api/order/cancel-order/${orderId}`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Order Cancelled");
        fetchOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (ordersLoading) {
    return <h1 className="text-4xl p-20">Loading...</h1>;
  }

  const activeOrders = orders.filter(
    (order) => order.status !== "Cancelled"
  );

  if (activeOrders.length === 0) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">No Orders Yet</h1>

          <button
            onClick={() => navigate("/shop")}
            className="bg-blue-500 text-white px-10 py-4 rounded-xl hover:bg-blue-600 transition"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen px-10 py-20">
      <h1 className="text-5xl font-bold mb-12">My Orders</h1>

      <div className="space-y-8">
        {activeOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-8 rounded-3xl shadow-lg"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-gray-400 text-sm">Order ID</p>
                <p className="font-semibold">
                  #{order._id.slice(-8).toUpperCase()}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Date</p>
                <p className="font-semibold">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Total</p>
                <p className="font-semibold text-blue-500 text-xl">
                  ₹{order.totalAmount}
                </p>
              </div>

              <span
                className={`px-6 py-2 rounded-full font-semibold text-white
                  ${order.status === "Pending" ? "bg-yellow-500" : ""}
                  ${order.status === "Shipped" ? "bg-blue-500" : ""}
                  ${order.status === "Delivered" ? "bg-green-500" : ""}
                  ${order.status === "Cancelled" ? "bg-red-500" : ""}
                `}
              >
                {order.status}
              </span>

              {order.status === "Pending" && (
                <button
                  onClick={() => cancelOrder(order._id)}
                  className="border border-red-500 text-red-500 px-6 py-2 rounded-full hover:bg-red-500 hover:text-white transition"
                >
                  Cancel
                </button>
              )}
            </div>

            {/* Products */}
            <div className="space-y-4 border-t pt-6">
              {order.products.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-6"
                >
                  {item.product ? (
                    <>
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-xl"
                      />

                      <div className="flex-1">
                        <h2 className="text-xl font-bold">
                          {item.product.name}
                        </h2>

                        <p className="text-gray-400">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <p className="text-blue-500 font-bold text-xl">
                        ₹{item.product.price * item.quantity}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-20 h-20 rounded-xl bg-gray-200 flex items-center justify-center">
                        ❌
                      </div>

                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-red-500">
                          Product Deleted
                        </h2>

                        <p className="text-gray-400">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <p className="text-red-500 font-bold">
                        Product unavailable
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;