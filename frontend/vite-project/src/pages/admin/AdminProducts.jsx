import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

const getProducts = async () => {
  try {
    const { data } = await axios.get(
      "https://bolt-cfp7.onrender.com/api/admin/products",
      { withCredentials: true }
    );

    if (data.success) {
      setProducts(data.products);
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch products");
  } finally {
    setLoading(false);
  }
};

const deleteProduct = async (id) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;

  try {
    const { data } = await axios.delete(
      `https://bolt-cfp7.onrender.com/api/admin/product/${id}`,
      { withCredentials: true }
    );

    if (data.success) {
      toast.success("Product Deleted");
      getProducts();
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete product");
  }
};;

  useEffect(() => {
    getProducts();
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
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-blue-500 uppercase tracking-widest text-sm font-semibold">
            Admin Panel
          </p>
          <h1 className="text-4xl font-black text-white mt-1">
            Products
          </h1>
          <p className="text-gray-400 mt-2">
            Manage all store products
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/add-product")}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl transition font-semibold"
        >
          + Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 mb-8">
        <p className="text-gray-400">Total Products</p>
        <h2 className="text-5xl font-black text-white mt-2">
          {products.length}
        </h2>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-800">
              <tr>
                <th className="text-left px-6 py-4 text-gray-400 font-semibold">Product</th>
                <th className="text-left px-6 py-4 text-gray-400 font-semibold">Category</th>
                <th className="text-left px-6 py-4 text-gray-400 font-semibold">Price</th>
                <th className="text-left px-6 py-4 text-gray-400 font-semibold">Discount</th>
                <th className="text-left px-6 py-4 text-gray-400 font-semibold">Stock</th>
                <th className="text-left px-6 py-4 text-gray-400 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-gray-800 hover:bg-gray-800/50 transition"
                >
                  {/* Product */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-xl object-cover border border-gray-700"
                      />
                      <div>
                        <h4 className="font-semibold text-white">
                          {product.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {product.description?.slice(0, 40)}...
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                      {product.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 text-white font-semibold">
                    ₹{product.price}
                  </td>

                  {/* Discount */}
                  <td className="px-6 py-4 text-green-400 font-medium">
                    ₹{product.discountPrice}
                  </td>

                  {/* Stock */}
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${product.stock > 10
                        ? "bg-green-500/20 text-green-400"
                        : product.stock > 0
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                        className="px-4 py-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-lg hover:bg-yellow-500 hover:text-black transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500 hover:text-white transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <p className="text-2xl font-bold">No Products Found</p>
              <button
                onClick={() => navigate("/admin/add-product")}
                className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-500 transition"
              >
                Add First Product
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;