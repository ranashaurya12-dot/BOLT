import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    discountPrice: "",
    stock: "",
    image: "",
  });

const getProduct = async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:4000/api/product/single-product/${id}`
    );

    if (data.success) {
      setFormData(data.product);
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch product");
  }
};

useEffect(() => {
  getProduct();
}, []);

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const { data } = await axios.put(
      `http://localhost:4000/api/admin/product/${id}`,
      formData,
      {
        withCredentials: true,
      }
    );

    if (data.success) {
      toast.success("Product Updated Successfully");
      navigate("/admin/products");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("Update Failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-950 p-8">

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <p className="text-blue-500 uppercase tracking-widest text-sm font-semibold">
            Admin Panel
          </p>
          <h1 className="text-4xl font-black text-white mt-1">
            Edit Product
          </h1>
        </div>
        <button
          onClick={() => navigate("/admin/products")}
          className="border border-gray-700 text-gray-400 px-6 py-3 rounded-xl hover:border-blue-500 hover:text-blue-500 transition"
        >
          ← Back
        </button>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Form */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name */}
            <div>
              <label className="block mb-2 text-gray-400 font-medium">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="e.g. Whey Protein"
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl p-3 outline-none focus:border-blue-500 transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 text-gray-400 font-medium">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                rows="3"
                placeholder="Product description..."
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl p-3 outline-none focus:border-blue-500 transition resize-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block mb-2 text-gray-400 font-medium">
                Category
              </label>
              <select
                name="category"
                value={formData.category || ""}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl p-3 outline-none focus:border-blue-500 transition"
              >
                <option value="">Select Category</option>
                <option value="Protein">Protein</option>
                <option value="Creatine">Creatine</option>
                <option value="Mass Gainer">Mass Gainer</option>
                <option value="Pre Workout">Pre Workout</option>
                <option value="Amino Acids">Amino Acids</option>
                <option value="Vitamins">Vitamins</option>
                <option value="Weight Loss">Weight Loss</option>
              </select>
            </div>

            {/* Price + Discount */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-gray-400 font-medium">
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price || ""}
                  onChange={handleChange}
                  placeholder="2999"
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl p-3 outline-none focus:border-blue-500 transition"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-400 font-medium">
                  Discount Price (₹)
                </label>
                <input
                  type="number"
                  name="discountPrice"
                  value={formData.discountPrice || ""}
                  onChange={handleChange}
                  placeholder="3999"
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl p-3 outline-none focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Stock */}
            <div>
              <label className="block mb-2 text-gray-400 font-medium">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock || ""}
                onChange={handleChange}
                placeholder="50"
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl p-3 outline-none focus:border-blue-500 transition"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block mb-2 text-gray-400 font-medium">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                value={formData.image || ""}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl p-3 outline-none focus:border-blue-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold text-lg transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Product"}
            </button>

          </form>
        </div>

        {/* Preview */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 sticky top-8 h-fit">
          <h2 className="text-xl font-bold text-white mb-6">
            Live Preview
          </h2>

          <div className="w-full h-56 bg-gray-800 rounded-2xl overflow-hidden mb-6">
            {formData.image ? (
              <img
                src={formData.image}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600">
                No image yet
              </div>
            )}
          </div>

          <div className="space-y-3">
            <p className="text-blue-500 font-semibold uppercase tracking-wider text-sm">
              {formData.category || "Category"}
            </p>
            <h3 className="text-2xl font-black text-white">
              {formData.name || "Product Name"}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {formData.description || "Product description"}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <p className="text-2xl font-black text-blue-500">
                ₹{formData.price || "0"}
              </p>
              {formData.discountPrice && (
                <p className="text-gray-500 line-through">
                  ₹{formData.discountPrice}
                </p>
              )}
            </div>
            <p className="text-green-500 font-semibold">
              Stock: {formData.stock || "0"}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditProduct;