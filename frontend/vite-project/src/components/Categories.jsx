import { useNavigate } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Whey Protein",
      icon: "💪",
      desc: "Build muscle faster",
      color: "from-blue-600 to-blue-800",
    },
    {
      name: "Creatine",
      icon: "⚡",
      desc: "Boost strength & power",
      color: "from-yellow-600 to-orange-700",
    },
    {
      name: "Mass Gainer",
      icon: "🏋️",
      desc: "Increase calorie intake",
      color: "from-purple-600 to-purple-800",
    },
    {
      name: "Pre Workout",
      icon: "🔥",
      desc: "Maximum energy for workouts",
      color: "from-red-600 to-red-800",
    },
    {
      name: "BCAA",
      icon: "🥤",
      desc: "Support muscle recovery",
      color: "from-green-600 to-green-800",
    },
    {
      name: "Vitamins",
      icon: "🌿",
      desc: "Daily health and wellness",
      color: "from-teal-600 to-teal-800",
    },
  ];

  return (
    <section className="bg-gray-950 py-24 px-6 md:px-16">

      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-blue-500 uppercase tracking-widest text-sm font-semibold mb-3">
          Browse Our Range
        </p>
        <h1 className="text-5xl md:text-6xl font-black text-white">
          Shop By Category
        </h1>
        <p className="text-gray-400 mt-4 text-lg max-w-xl mx-auto">
          Find the perfect supplement for your fitness goals
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() =>
              navigate(`/shop?category=${category.name}`)
            }
            className="group relative bg-gray-900 border border-gray-800 rounded-3xl p-8 cursor-pointer hover:border-blue-500/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden"
          >
            {/* Background gradient on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl`} />

            {/* Icon */}
            <div className="text-6xl mb-5 group-hover:scale-110 transition-transform duration-300">
              {category.icon}
            </div>

            {/* Content */}
            <h2 className="text-2xl font-black text-white">
              {category.name}
            </h2>

            <p className="text-gray-400 mt-2">
              {category.desc}
            </p>

            {/* Arrow */}
            <div className="mt-6 flex items-center gap-2 text-blue-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>Shop Now</span>
              <span>→</span>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}

export default Categories;