import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import { AuthContext } from "../context/AuthContext"

function ProductDetails() {
  const { id } = useParams()
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(
       `http://localhost:4000/api/product/single-product/${id}`
      )
      setProduct(response.data.product)
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login first")
      navigate("/login")
      return
    }
    try {
      setLoading(true)
      const response = await axios.post(
        "http://localhost:4000/api/cart/add-cart",
        { productId: product._id, quantity: 1 },
        { withCredentials: true }
      )
      if (response.data.success) {
        toast.success("Added To Cart")
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  if (!product) {
    return <h1 className="text-4xl p-20">Loading...</h1>
  }

  return (
    <div className="bg-gray-100 min-h-screen px-10 py-20">
      <div className="grid grid-cols-2 gap-16 bg-white p-10 rounded-3xl shadow-lg">

        {/* Product Image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="rounded-3xl w-full h-[550px] object-cover"
          />
        </div>

        {/* Product Info */}
        <div>

          <p className="text-blue-500 text-lg font-semibold">
            {product.category}
          </p>

          <h1 className="text-5xl font-bold mt-4 leading-tight">
            {product.name}
          </h1>

          <div className="flex gap-4 items-center mt-6">
            <p className="text-4xl text-blue-500 font-bold">
              ₹{product.price}
            </p>
            {product.discountPrice > 0 && (
              <p className="line-through text-gray-400 text-2xl">
                ₹{product.discountPrice}
              </p>
            )}
          </div>

          <p className="text-gray-600 text-lg mt-8 leading-8">
            {product.description}
          </p>

          <p className={`mt-4 font-semibold ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}>
            {product.stock > 0 ? `In Stock (${product.stock} left)` : "Out of Stock"}
          </p>

          {/* Buttons */}
          <div className="flex gap-6 mt-12">
            <button
              onClick={handleAddToCart}
              disabled={loading || product.stock === 0}
              className="bg-black text-white px-10 py-4 rounded-xl hover:bg-blue-500 transition disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add To Cart"}
            </button>

            <button
              onClick={() => {
                handleAddToCart()
                navigate("/cart")
              }}
              disabled={loading || product.stock === 0}
              className="border border-black px-10 py-4 rounded-xl hover:bg-black hover:text-white transition disabled:opacity-50"
            >
              Buy Now
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductDetails