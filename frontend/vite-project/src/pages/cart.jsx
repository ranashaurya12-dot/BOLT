import { useEffect, useState, useContext } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

function Cart() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [cartLoading, setCartLoading] = useState(true)

  const fetchCart = async () => {
    try {
      const response = await axios.get(
       "http://localhost:4000/api/cart/get-cart",
        { withCredentials: true }
      )
      setCartItems(response.data.cart)
    } catch (error) {
      console.error(error)
    } finally {
      setCartLoading(false)
    }
  }

  useEffect(() => {
    if (!user) {
      navigate("/login")
      return
    }
    fetchCart()
  }, [user])

  const updateQuantity = async (cartId, quantity) => {
    if (quantity < 1) return
    try {
      await axios.put(
        `http://localhost:4000/api/cart/update-cart/${cartId}`,
        { quantity },
        { withCredentials: true }
      )
      fetchCart()
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  const removeItem = async (cartId) => {
    try {
      await axios.delete(
       `http://localhost:4000/api/cart/delete-cart/${cartId}`,
        { withCredentials: true }
      )
      toast.success("Item Removed")
      fetchCart()
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  const placeOrder = async () => {
    try {
      setLoading(true)
      const response = await axios.post(
        "http://localhost:4000/api/order/place-order",
        {},
        { withCredentials: true }
      )
      if (response.data.success) {
        toast.success("Order Placed Successfully")
        setCartItems([])
        navigate("/orders")
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.product?.price || 0) * item.quantity,
    0
  )

  if (cartLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-white">Loading...</h1>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="bg-gray-900 border border-gray-800 rounded-[40px] p-12 max-w-xl w-full text-center shadow-2xl">
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="text-5xl font-black text-white leading-tight">
            Your Cart
            <span className="text-blue-500"> Is Empty</span>
          </h1>
          <p className="text-gray-400 text-lg mt-4 leading-relaxed">
            Add premium supplements and fuel your fitness journey.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="mt-8 bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl text-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/20"
          >
            Explore Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 px-4 md:px-10 lg:px-16 py-10">

      {/* Header */}
      <div className="mb-12">
        <p className="text-blue-500 uppercase tracking-[6px] font-semibold text-sm">
          Premium Supplements
        </p>
        <h1 className="text-5xl md:text-6xl font-black text-white mt-4">
          Shopping Cart
        </h1>
        <p className="text-gray-400 mt-3 text-lg">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="group bg-gray-900 border border-gray-800 rounded-3xl p-6 flex flex-col md:flex-row gap-6 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
            >
              {/* Image */}
              <div className="overflow-hidden rounded-2xl flex-shrink-0">
                <img
                  src={item.product?.image}
                  alt={item.product?.name}
                  className="w-full md:w-44 h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-blue-500 font-semibold uppercase tracking-wider text-sm">
                    {item.product?.category}
                  </p>
                  <h2 className="text-2xl font-black text-white mt-2">
                    {item.product?.name}
                  </h2>
                  <div className="flex items-center gap-3 mt-3">
                    <p className="text-2xl font-black text-white">
                      ₹{item.product?.price}
                    </p>
                    {item.product?.discountPrice > 0 && (
                      <p className="text-gray-500 line-through text-sm">
                        ₹{item.product?.discountPrice}
                      </p>
                    )}
                  </div>
                  <p className="text-gray-400 mt-2 text-sm">
                    Subtotal:
                    <span className="text-blue-500 font-bold ml-2">
                      ₹{(item.product?.price || 0) * item.quantity}
                    </span>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                  {/* Quantity */}
                  <div className="flex items-center gap-4 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="text-xl font-black text-white hover:text-blue-500 transition w-6 text-center"
                    >
                      -
                    </button>
                    <span className="text-lg font-black text-white min-w-[20px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="text-xl font-black text-white hover:text-blue-500 transition w-6 text-center"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-500/70 hover:text-red-400 text-sm font-semibold transition border border-red-500/20 hover:border-red-500/50 px-4 py-2 rounded-xl"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="sticky top-8 bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-black text-white">
            Order Summary
          </h2>

          <div className="mt-8 space-y-5">
            <div className="flex justify-between items-center">
              <p className="text-gray-400">Subtotal ({cartItems.length} items)</p>
              <p className="text-white font-bold">₹{totalAmount}</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-400">Shipping</p>
              <p className="text-white font-bold">₹99</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-400">Tax</p>
              <p className="text-green-400 font-bold">Free</p>
            </div>

            <div className="border-t border-gray-700 pt-5 flex justify-between items-center">
              <p className="text-xl font-black text-white">Total</p>
              <p className="text-2xl font-black text-blue-500">₹{totalAmount + 99}</p>
            </div>
          </div>

          <button
            onClick={placeOrder}
            disabled={loading}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl text-lg font-black transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-blue-500/20 disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Proceed To Checkout"}
          </button>

          <button
            onClick={() => navigate("/shop")}
            className="w-full mt-4 border border-gray-700 text-gray-400 py-4 rounded-2xl font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300 text-sm"
          >
            Continue Shopping
          </button>

          {/* Security note */}
          <p className="text-gray-600 text-xs text-center mt-6">
            🔒 Secure checkout — your data is protected
          </p>
        </div>
      </div>
    </div>
  )
}

export default Cart