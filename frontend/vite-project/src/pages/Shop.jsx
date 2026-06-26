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
        "https://bolt-cfp7.onrender.com/api/product/products",
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
  <div className="min-h-screen bg-[#0D0B09] px-6 py-14 md:px-10 lg:px-16">

    {/* Header */}
    <div className="mb-12 border-b border-[#2C2418] pb-8">
      <p className="font-['Oswald'] text-sm uppercase italic tracking-[8px] text-[#8C7437]">
        Premium Supplements
      </p>

      <h1 className="mt-4 font-['Oswald'] text-5xl md:text-6xl font-bold italic uppercase tracking-tight text-[#F5F1E8]">
        Shop Products
      </h1>

      <p className="mt-4 text-[#9C9589]">
        Discover premium supplements engineered for performance.
      </p>
    </div>

    {/* Filters */}
    <div className="mb-12 flex flex-wrap gap-5 rounded-lg border border-[#2C2418] bg-[#15120F] p-6">

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-80 rounded-lg border border-[#2C2418] bg-[#0D0B09] p-4 text-[#F5F1E8] placeholder-[#6F685C] outline-none transition-all duration-300 focus:border-[#EEBA02]"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="rounded-lg border border-[#2C2418] bg-[#0D0B09] px-5 py-4 text-[#F5F1E8] outline-none transition-all duration-300 focus:border-[#EEBA02]"
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
        className="rounded-lg border border-[#2C2418] bg-[#0D0B09] px-5 py-4 text-[#F5F1E8] outline-none transition-all duration-300 focus:border-[#EEBA02]"
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
          className="rounded-lg border border-[#8C7437] bg-[#EEBA02] px-6 py-4 font-bold uppercase tracking-wide text-black transition-all duration-300 hover:bg-[#FFD35C]"
        >
          Clear Filters
        </button>
      )}
    </div>

    {products.length === 0 ? (
      <div className="flex items-center justify-center rounded-lg border border-[#2C2418] bg-[#15120F] py-24">
        <div className="text-center">
          <h2 className="font-['Oswald'] text-4xl font-bold italic uppercase tracking-tight text-[#F5F1E8]">
            No Products Found
          </h2>

          <p className="mt-4 text-[#9C9589]">
            Try changing your search or filter options.
          </p>
        </div>
      </div>
    ) : (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    )}
  </div>
);
}

export default Shop;