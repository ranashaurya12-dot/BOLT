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
      <div className="min-h-screen bg-[#0D0B09] flex items-center justify-center px-4">
        <div className="bg-[#15120F] border border-[#2C2418] rounded-lg p-8 sm:p-12 max-w-lg w-full text-center shadow-[0_20px_60px_rgba(0,0,0,0.5)]">

          <h1 className="font-['Oswald'] text-3xl sm:text-4xl md:text-5xl font-bold italic uppercase tracking-tight text-[#F5F1E8]">
            No Orders Yet
          </h1>

          <p className="mt-4 text-[#9C9589]">
            Your premium supplement orders will appear here.
          </p>

          <button
            onClick={() => navigate("/shop")}
            className="mt-8 bg-[#EEBA02] hover:bg-[#FFD35C] text-black px-8 py-4 rounded-lg font-bold transition-all duration-300"
          >
            Start Shopping
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0B09] px-4 py-10 sm:px-6 sm:py-14 md:px-10 lg:px-16">

      {/* Header */}
      <div className="mb-8 sm:mb-12 border-b border-[#2C2418] pb-6 sm:pb-8">
        <p className="font-['Oswald'] text-xs sm:text-sm uppercase italic tracking-[4px] sm:tracking-[8px] text-[#8C7437]">
          Premium Orders
        </p>

        <h1 className="mt-3 sm:mt-4 font-['Oswald'] text-3xl sm:text-5xl md:text-6xl font-bold italic uppercase tracking-tight text-[#F5F1E8]">
          My Orders
        </h1>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {activeOrders.map((order) => (
          <div
            key={order._id}
            className="rounded-lg border border-[#2C2418] bg-[#15120F] p-4 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition-all duration-300 hover:border-[#8C7437]"
          >
            {/* Header */}
            <div className="flex flex-wrap items-start sm:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">

              <div className="flex flex-wrap gap-4 sm:gap-6">
                <div>
                  <p className="font-['Oswald'] text-xs uppercase tracking-[2px] text-[#8C7437]">
                    Order ID
                  </p>
                  <p className="font-semibold text-sm sm:text-base text-[#F5F1E8]">
                    #{order._id.slice(-8).toUpperCase()}
                  </p>
                </div>

                <div>
                  <p className="font-['Oswald'] text-xs uppercase tracking-[2px] text-[#8C7437]">
                    Date
                  </p>
                  <p className="font-semibold text-sm sm:text-base text-[#F5F1E8]">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="font-['Oswald'] text-xs uppercase tracking-[2px] text-[#8C7437]">
                    Total
                  </p>
                  <p className="text-lg sm:text-2xl font-bold text-[#EEBA02]">
                    ₹{order.totalAmount}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <span
                  className={`px-4 sm:px-5 py-2 rounded-lg text-sm sm:text-base font-semibold uppercase tracking-wide
                    ${
                      order.status === "Pending"
                        ? "bg-[#8C7437] text-black"
                        : ""
                    }
                    ${
                      order.status === "Shipped"
                        ? "bg-[#EEBA02] text-black"
                        : ""
                    }
                    ${
                      order.status === "Delivered"
                        ? "bg-green-700 text-white"
                        : ""
                    }
                    ${
                      order.status === "Cancelled"
                        ? "bg-red-700 text-white"
                        : ""
                    }
                  `}
                >
                  {order.status}
                </span>

                {order.status === "Pending" && (
                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="rounded-lg border border-red-700 px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold uppercase tracking-wide text-red-400 transition-all duration-300 hover:bg-red-700 hover:text-white"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Products */}
            <div className="space-y-4 sm:space-y-5 border-t border-[#2C2418] pt-6 sm:pt-8">
              {order.products.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 rounded-lg border border-[#2C2418] bg-[#0D0B09] p-4 transition-all duration-300 hover:border-[#8C7437]"
                >
                  {item.product ? (
                    <>
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="h-16 w-16 sm:h-24 sm:w-24 rounded-lg border border-[#2C2418] object-cover flex-shrink-0"
                        />

                        <div className="flex-1 sm:hidden">
                          <h2 className="font-['Oswald'] text-lg font-bold italic uppercase tracking-tight text-[#F5F1E8]">
                            {item.product.name}
                          </h2>
                          <p className="mt-1 text-sm text-[#9C9589]">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>

                      <div className="hidden sm:block flex-1">
                        <h2 className="font-['Oswald'] text-2xl font-bold italic uppercase tracking-tight text-[#F5F1E8]">
                          {item.product.name}
                        </h2>

                        <p className="mt-2 text-[#9C9589]">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <p className="text-lg sm:text-2xl font-bold text-[#EEBA02] w-full sm:w-auto text-right sm:text-left">
                        ₹{item.product.discountPrice * item.quantity}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="flex h-16 w-16 sm:h-24 sm:w-24 items-center justify-center rounded-lg border border-[#2C2418] bg-[#15120F] text-2xl sm:text-3xl flex-shrink-0">
                        ❌
                      </div>

                      <div className="flex-1">
                        <h2 className="font-['Oswald'] text-lg sm:text-2xl font-bold italic uppercase text-red-500">
                          Product Deleted
                        </h2>

                        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-[#9C9589]">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold text-sm sm:text-base text-red-500">
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