import { useNavigate } from "react-router-dom"

function Hero() {
  const navigate = useNavigate()

  return (
    <section className="bg-gray-950 text-white min-h-screen flex items-center px-8 md:px-20 relative overflow-hidden">

      {/* Background glow effects */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Left content */}
      <div className="flex-1 z-10">

        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full mb-6">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
            Premium Fitness Supplements
          </p>
        </div>

        <h1 className="text-7xl md:text-8xl font-black leading-tight max-w-2xl">
          Fuel Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            Strength
          </span>
        </h1>

        <p className="text-gray-400 text-xl mt-6 max-w-xl leading-8">
          High-quality whey protein, creatine, and performance supplements engineered for serious athletes.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/shop")}
            className="bg-blue-600 hover:bg-blue-500 px-10 py-4 rounded-xl text-lg font-bold transition hover:scale-105 shadow-lg shadow-blue-500/20"
          >
            Shop Now
          </button>

          <button
            onClick={() => navigate("/shop")}
            className="border border-gray-700 px-10 py-4 rounded-xl text-lg hover:border-blue-500 hover:text-blue-500 transition"
          >
            Explore Products →
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-12 mt-16">
          <div className="border-l-2 border-blue-500 pl-4">
            <h2 className="text-4xl font-black text-white">10k+</h2>
            <p className="text-gray-400 mt-1">Happy Customers</p>
          </div>
          <div className="border-l-2 border-blue-500 pl-4">
            <h2 className="text-4xl font-black text-white">50+</h2>
            <p className="text-gray-400 mt-1">Products</p>
          </div>
          <div className="border-l-2 border-blue-500 pl-4">
            <h2 className="text-4xl font-black text-white">100%</h2>
            <p className="text-gray-400 mt-1">Pure Quality</p>
          </div>
        </div>

      </div>

      {/* Right side image */}
      <div className="flex-1 justify-center hidden md:flex z-10">
        <div className="relative">
          {/* Glow behind image */}
          <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-2xl" />
          <img
            src="https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600"
            className="w-[480px] h-[580px] object-cover rounded-3xl relative z-10 border border-gray-800"
          />

          {/* Floating badge */}
          <div className="absolute -bottom-6 -left-6 bg-gray-900 border border-gray-800 rounded-2xl p-4 z-20 shadow-2xl">
            <p className="text-gray-400 text-sm">Trusted by</p>
            <p className="text-white font-black text-2xl">10,000+ Athletes</p>
          </div>

          {/* Floating badge 2 */}
          <div className="absolute -top-6 -right-6 bg-blue-600 rounded-2xl p-4 z-20 shadow-2xl">
            <p className="text-white font-black text-xl">100%</p>
            <p className="text-blue-200 text-sm">Pure Quality</p>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero