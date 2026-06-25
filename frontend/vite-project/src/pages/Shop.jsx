import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";

function Shop() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/product/products",
        {
          params: { search, category, sort },
        }
      );

      console.log(response.data);

      setProducts(response.data.products || []);
    } catch (error) {
      console.error(error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category, sort]);

  return (
    <div className="bg-gray-100 min-h-screen px-10 py-20">
      <h1 className="text-5xl font-bold mb-10">Shop Products</h1>

      {/* Filters */}
      <div className="flex gap-6 mb-12 flex-wrap">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-4 rounded-xl w-80 outline-none"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-4 rounded-xl outline-none"
        >
          <option value="">All Categories</option>
          <option value="Protein">Protein</option>
          <option value="Creatine">Creatine</option>
          <option value="Mass Gainer">Mass Gainer</option>
          <option value="Pre Workout">Pre Workout</option>
          <option value="Amino Acids">Amino Acids</option>
          <option value="Vitamins">Vitamins</option>
          <option value="Weight Loss">Weight Loss</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-4 rounded-xl outline-none"
        >
          <option value="">Sort By</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="newest">Newest First</option>
        </select>

        {(search || category || sort) && (
          <button
            onClick={() => {
              setSearch("");
              setCategory("");
              setSort("");
            }}
            className="bg-red-500 text-white px-6 py-4 rounded-xl hover:bg-red-600 transition"
          >
            Clear Filters
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold text-gray-500">
            No products found
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-10">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Shop;