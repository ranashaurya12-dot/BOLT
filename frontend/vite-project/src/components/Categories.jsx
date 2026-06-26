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
  <section className="bg-[#0D0B09] py-24 px-6 md:px-16">

    {/* Header */}
    <div className="text-center mb-16">

      <p className="uppercase tracking-[4px] text-[#EEBA02] text-sm font-semibold mb-3">
        ELITE COLLECTION
      </p>

      <h1
        style={{ fontFamily: "Oswald, sans-serif" }}
        className="text-5xl md:text-7xl italic uppercase font-bold text-[#F5F1E8]"
      >
        Shop By Category
      </h1>

      <div className="w-24 h-1 bg-[#EEBA02] mx-auto mt-5 rounded-full"></div>

      <p className="text-[#9C9589] mt-6 text-lg max-w-2xl mx-auto">
        Choose supplements engineered for strength, recovery and peak
        athletic performance.
      </p>

    </div>

    {/* Cards */}

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

      {categories.map((category, index) => (

        <div
          key={index}
          onClick={() => navigate(`/shop?category=${category.name}`)}
          className="group bg-[#1A1713] border border-[#2C2418] rounded-xl p-8 cursor-pointer hover:border-[#EEBA02] hover:-translate-y-2 transition-all duration-300"
        >

          {/* Icon */}

          <div className="text-6xl text-[#EEBA02] mb-6 transition duration-300 group-hover:scale-110">
            {category.icon}
          </div>

          {/* Name */}

          <h2
            style={{ fontFamily: "Oswald, sans-serif" }}
            className="text-3xl italic uppercase font-bold text-[#F5F1E8]"
          >
            {category.name}
          </h2>

          {/* Description */}

          <p className="text-[#9C9589] mt-4 leading-7">
            {category.desc}
          </p>

          {/* Button */}

          <div className="mt-8 flex items-center justify-between">

            <span className="uppercase tracking-wider text-sm text-[#EEBA02] font-semibold">
              Explore
            </span>

            <div className="w-10 h-10 rounded-full border border-[#EEBA02] flex items-center justify-center text-[#EEBA02] group-hover:bg-[#EEBA02] group-hover:text-black transition">
              →
            </div>

          </div>

        </div>

      ))}

    </div>

  </section>
);
}

export default Categories;