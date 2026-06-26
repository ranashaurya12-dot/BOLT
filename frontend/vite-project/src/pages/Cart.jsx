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
       "https://bolt-cfp7.onrender.com/api/cart/get-cart",
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
        `https://bolt-cfp7.onrender.com/api/cart/update-cart/${cartId}`,
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
       `https://bolt-cfp7.onrender.com/api/cart/delete-cart/${cartId}`,
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
        "https://bolt-cfp7.onrender.com/api/order/place-order",
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
  <div className="min-h-screen bg-[#0D0B09] flex items-center justify-center px-4">
    <div className="w-full max-w-xl rounded-lg border border-[#2C2418] bg-[#15120F] p-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
      <div className="mb-6 text-7xl">🛒</div>

      <h1 className="font-['Oswald'] text-5xl font-bold italic uppercase tracking-tight text-[#F5F1E8] leading-tight">
        Your Cart
        <span className="block text-[#EEBA02]">Is Empty</span>
      </h1>

      <p className="mt-5 text-lg leading-relaxed text-[#9C9589]">
        Add premium supplements and fuel your fitness journey.
      </p>

      <button
        onClick={() => navigate("/shop")}
        className="mt-10 rounded-lg bg-[#EEBA02] px-10 py-4 text-lg font-bold text-black transition-all duration-300 hover:scale-[1.03] hover:bg-[#FFD35C]"
      >
        Explore Products
      </button>
    </div>
  </div>
)

}

return (
  <div className="min-h-screen bg-[#0D0B09] px-4 py-10 md:px-10 lg:px-16">

    {/* Header */}
    <div className="mb-12 border-b border-[#2C2418] pb-8">
      <p className="font-['Oswald'] text-sm font-semibold uppercase tracking-[8px] text-[#8C7437] italic">
        Premium Supplements
      </p>

      <h1 className="mt-4 font-['Oswald'] text-5xl font-bold uppercase italic tracking-tight text-[#F5F1E8] md:text-6xl">
        Shopping Cart
      </h1>

      <p className="mt-4 text-lg text-[#9C9589]">
        {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
      </p>
    </div>

    {/* Layout */}
    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-3">

      {/* Cart Items */}
      <div className="space-y-6 lg:col-span-2">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="group flex flex-col gap-6 rounded-lg border border-[#2C2418] bg-[#15120F] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#8C7437] hover:shadow-[0_20px_40px_rgba(238,186,2,0.08)] md:flex-row"
          >
            {/* Image */}
            <div className="overflow-hidden rounded-lg border border-[#2C2418] flex-shrink-0">
              <img
                src={item.product?.image}
                alt={item.product?.name}
                className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:w-44"
              />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col justify-between">

              <div>
                <p className="font-['Oswald'] text-sm font-semibold uppercase tracking-[3px] text-[#8C7437] italic">
                  {item.product?.category}
                </p>

                <h2 className="mt-2 font-['Oswald'] text-3xl font-bold uppercase italic tracking-tight text-[#F5F1E8]">
                  {item.product?.name}
                </h2>

                <div className="mt-4 flex items-center gap-4">
                  <p className="text-3xl font-bold text-[#EEBA02]">
                    ₹{item.product?.price}
                  </p>

                  {item.product?.discountPrice > 0 && (
                    <p className="text-sm text-[#9C9589] line-through">
                      ₹{item.product?.discountPrice}
                    </p>
                  )}
                </div>

                <p className="mt-3 text-sm text-[#9C9589]">
                  Subtotal:
                  <span className="ml-2 font-bold text-[#EEBA02]">
                    ₹{(item.product?.price || 0) * item.quantity}
                  </span>
                </p>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">

                {/* Quantity */}
                <div className="flex items-center gap-5 rounded-lg border border-[#2C2418] bg-[#0D0B09] px-5 py-3">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="w-6 text-center text-xl font-bold text-[#F5F1E8] transition hover:text-[#EEBA02]"
                  >
                    -
                  </button>

                  <span className="min-w-[20px] text-center text-lg font-bold text-[#F5F1E8]">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="w-6 text-center text-xl font-bold text-[#F5F1E8] transition hover:text-[#EEBA02]"
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item._id)}
                  className="rounded-lg border border-[#8C7437] px-5 py-2 text-sm font-semibold uppercase tracking-wide text-[#9C9589] transition hover:border-[#EEBA02] hover:text-[#EEBA02]"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="sticky top-8 rounded-lg border border-[#2C2418] bg-[#15120F] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">

        <h2 className="font-['Oswald'] text-3xl font-bold uppercase italic tracking-tight text-[#F5F1E8]">
          Order Summary
        </h2>

        <div className="mt-8 space-y-5">

          <div className="flex items-center justify-between">
            <p className="text-[#9C9589]">
              Subtotal ({cartItems.length} items)
            </p>

            <p className="font-bold text-[#F5F1E8]">
              ₹{totalAmount}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[#9C9589]">Shipping</p>

            <p className="font-bold text-[#F5F1E8]">
              ₹99
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[#9C9589]">Tax</p>

            <p className="font-bold text-[#EEBA02]">
              Free
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-[#2C2418] pt-6">
            <p className="font-['Oswald'] text-xl font-bold uppercase italic text-[#F5F1E8]">
              Total
            </p>

            <p className="text-3xl font-bold text-[#EEBA02]">
              ₹{totalAmount + 99}
            </p>
          </div>
        </div>

        <button
          onClick={placeOrder}
          disabled={loading}
          className="mt-8 w-full rounded-lg bg-[#EEBA02] py-4 text-lg font-bold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-[#FFD35C] disabled:opacity-50"
        >
          {loading ? "Placing Order..." : "Proceed To Checkout"}
        </button>

        <button
          onClick={() => navigate("/shop")}
          className="mt-4 w-full rounded-lg border border-[#2C2418] py-4 text-sm font-semibold uppercase tracking-wide text-[#9C9589] transition-all duration-300 hover:border-[#8C7437] hover:bg-[#0D0B09] hover:text-[#F5F1E8]"
        >
          Continue Shopping
        </button>

        {/* Security note */}
        <p className="mt-6 text-center text-xs text-[#8C7437]">
          🔒 Secure checkout — your data is protected
        </p>

      </div>
    </div>
  </div>
)
}

export default Cart