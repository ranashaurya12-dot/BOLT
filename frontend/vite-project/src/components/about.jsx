import { useNavigate } from "react-router-dom"

function About() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0D0B09] px-8 md:px-20 py-20">

      {/* Hero */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <p className="text-[#8C7437] uppercase tracking-widest text-sm font-semibold mb-4">
          Our Story
        </p>
        <h1
          style={{ fontFamily: "Oswald, sans-serif" }}
          className="text-6xl md:text-7xl font-bold italic uppercase text-[#F5F1E8] leading-tight"
        >
          About <span className="text-[#EEBA02]">Bolt Fuel</span>
        </h1>
        <p className="text-[#EEBA02] text-2xl mt-6 font-semibold italic">
          Powering Every Rep. Fueling Every Goal.
        </p>
        <p className="text-[#9C9589] text-lg mt-6 leading-8 max-w-3xl mx-auto">
          Bolt Fuel was founded in 2025 as the official nutrition brand of Bolt Fit,
          with one simple mission: to provide athletes, fitness enthusiasts, and everyday
          individuals with supplements they could trust.
        </p>
      </div>

      {/* Story */}
      <div className="max-w-4xl mx-auto bg-[#15120F] border border-[#2C2418] rounded-2xl p-10 mb-12 hover:border-[#8C7437] transition">
        <p className="text-[#9C9589] text-lg leading-8">
          After working closely with hundreds of gym members, the team behind Bolt Fit
          recognized a common problem. Many people struggled to find supplements that
          combined quality, transparency, and value. Too often, products contained
          unnecessary fillers, confusing labels, or inconsistent quality.
        </p>
        <p className="text-[#EEBA02] text-xl font-bold italic mt-6">
          That insight led to the creation of Bolt Fuel.
        </p>
        <p className="text-[#9C9589] text-lg leading-8 mt-6">
          From day one, our goal has been to make sports nutrition simple, reliable,
          and effective. Every product is carefully selected and formulated with
          performance, recovery, and overall wellness in mind, helping our customers
          stay consistent on their fitness journey.
        </p>
        <p className="text-[#9C9589] text-lg leading-8 mt-6">
          We partner with experienced manufacturers that follow strict quality standards
          and good manufacturing practices. Each product is produced using carefully
          sourced ingredients and undergoes quality checks before reaching our customers,
          ensuring safety, consistency, and reliability.
        </p>
        <p className="text-[#9C9589] text-lg leading-8 mt-6">
          Today, Bolt Fuel continues to grow alongside the Bolt Fit community. Whether
          you're stepping into the gym for the first time, training for your next
          competition, or simply striving to become healthier, we're here to support
          your journey with nutrition you can depend on.
        </p>
      </div>

      {/* Mission Vision Promise */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mb-20">

        {/* Mission */}
        <div className="bg-[#15120F] border border-[#2C2418] rounded-2xl p-8 hover:border-[#EEBA02] transition">
          <div className="text-4xl mb-4">🎯</div>
          <h2
            style={{ fontFamily: "Oswald, sans-serif" }}
            className="text-2xl font-bold italic uppercase text-[#EEBA02] mb-4"
          >
            Our Mission
          </h2>
          <p className="text-[#9C9589] leading-7">
            To empower every fitness journey by providing high-quality, trustworthy,
            and performance-driven nutritional supplements.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-[#15120F] border border-[#2C2418] rounded-2xl p-8 hover:border-[#EEBA02] transition">
          <div className="text-4xl mb-4">👁️</div>
          <h2
            style={{ fontFamily: "Oswald, sans-serif" }}
            className="text-2xl font-bold italic uppercase text-[#EEBA02] mb-4"
          >
            Our Vision
          </h2>
          <p className="text-[#9C9589] leading-7">
            To become a trusted fitness nutrition brand that helps people build
            stronger bodies, healthier lifestyles, and lasting confidence.
          </p>
        </div>

        {/* Promise */}
        <div className="bg-[#15120F] border border-[#2C2418] rounded-2xl p-8 hover:border-[#EEBA02] transition">
          <div className="text-4xl mb-4">🤝</div>
          <h2
            style={{ fontFamily: "Oswald, sans-serif" }}
            className="text-2xl font-bold italic uppercase text-[#EEBA02] mb-4"
          >
            Our Promise
          </h2>
          <ul className="text-[#9C9589] leading-8 space-y-2">
            <li>✔ Premium-quality supplements</li>
            <li>✔ Carefully selected ingredients</li>
            <li>✔ Strict quality standards</li>
            <li>✔ Honest, transparent approach</li>
            <li>✔ Dedicated customer support</li>
            <li>✔ Commitment to your fitness goals</li>
          </ul>
        </div>

      </div>

      {/* Values */}
      <div className="max-w-5xl mx-auto mb-20">
        <h2
          style={{ fontFamily: "Oswald, sans-serif" }}
          className="text-4xl font-bold italic uppercase text-[#F5F1E8] text-center mb-10"
        >
          Why Choose <span className="text-[#EEBA02]">Bolt Fuel</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "🧪", title: "Lab Tested", desc: "Every batch tested for purity and potency" },
            { icon: "⚡", title: "Fast Results", desc: "Formulated for maximum absorption and performance" },
            { icon: "🏆", title: "Athlete Approved", desc: "Trusted by athletes across India" },
            { icon: "🌿", title: "Clean Ingredients", desc: "No fillers, no artificial colors, no compromises" },
            { icon: "📦", title: "Fast Delivery", desc: "Pan India delivery within 3-5 business days" },
          
          ].map((item, index) => (
            <div
              key={index}
              className="bg-[#15120F] border border-[#2C2418] rounded-2xl p-6 hover:border-[#EEBA02] transition"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3
                style={{ fontFamily: "Oswald, sans-serif" }}
                className="text-xl font-bold uppercase text-[#F5F1E8] mb-2"
              >
                {item.title}
              </h3>
              <p className="text-[#9C9589] text-sm leading-6">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tagline */}
      <div className="max-w-3xl mx-auto text-center bg-[#15120F] border border-[#2C2418] rounded-2xl p-12 mb-12">
        <p className="text-[#9C9589] text-lg leading-8 mb-6">
          Bolt Fuel isn't just about supplements — it's about giving your body
          the fuel it needs to perform, recover, and grow.
        </p>
        <h2
          style={{ fontFamily: "Oswald, sans-serif" }}
          className="text-3xl font-bold italic uppercase text-[#EEBA02]"
        >
          Train Hard. Recover Smart. Fuel Better.
        </h2>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto text-center">
        <button
          onClick={() => navigate("/shop")}
          className="bg-[#EEBA02] hover:bg-[#FFD35C] text-black px-12 py-4 rounded-lg font-bold uppercase tracking-wide transition hover:scale-105"
        >
          Shop Now
        </button>
      </div>

    </div>
  )
}

export default About