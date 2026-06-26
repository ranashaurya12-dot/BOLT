import { useNavigate } from "react-router-dom"

function Hero() {
  const navigate = useNavigate()

 return (
  <section className="bg-[#0D0B09] text-[#F5F1E8] min-h-screen flex items-center px-8 md:px-20 relative overflow-hidden">

    {/* Background Glow */}
    <div className="absolute -top-20 -left-20 w-[450px] h-[450px] bg-[#EEBA02]/10 rounded-full blur-[140px]" />
    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#8C7437]/10 rounded-full blur-[120px]" />

    {/* Left */}
    <div className="flex-1 z-10">

      <div className="inline-flex items-center gap-2 border border-[#8C7437] bg-[#1A1713] px-5 py-2 rounded-full mb-8">
        <div className="w-2 h-2 bg-[#EEBA02] rounded-full animate-pulse"></div>

        <p className="uppercase tracking-[4px] text-[#EEBA02] text-xs font-semibold">
          Premium Nutrition
        </p>
      </div>
<h1
  style={{
    fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
    fontStyle: "italic",
    fontWeight: 700,
    lineHeight: "0.88",
    letterSpacing: "-1px",
  }}
  className="text-7xl md:text-[8.5rem] uppercase antialiased"
>
  <span className="text-[#F5F1E8] block">ENGINEER</span>
  <span className="text-[#F5F1E8] block">YOUR</span>
  <span className="text-[#EEBA02] block">LIMIT</span>
</h1>
      <p className="text-[#B9B1A5] text-lg md:text-xl mt-8 max-w-xl leading-8">
        Premium whey protein, creatine and performance supplements built for
        athletes who demand strength, endurance and recovery.
      </p>

      <div className="flex gap-5 mt-10 flex-wrap">

        <button
          onClick={() => navigate("/shop")}
          className="bg-[#EEBA02] text-black px-10 py-4 rounded-md font-bold hover:bg-[#FFD35C] transition duration-300"
        >
          SHOP NOW
        </button>

        <button
          onClick={() => navigate("/shop")}
          className="border border-[#8C7437] px-10 py-4 rounded-md hover:border-[#EEBA02] hover:text-[#EEBA02] transition duration-300"
        >
          EXPLORE →
        </button>

      </div>

      {/* Stats */}

      <div className="flex gap-12 mt-20 flex-wrap">

        <div>
          <h2 className="text-5xl font-black text-[#EEBA02]">
            10K+
          </h2>
          <p className="text-[#9C9589] mt-2 uppercase text-sm">
            Happy Customers
          </p>
        </div>

        <div>
          <h2 className="text-5xl font-black text-[#EEBA02]">
            50+
          </h2>
          <p className="text-[#9C9589] mt-2 uppercase text-sm">
            Products
          </p>
        </div>

        <div>
          <h2 className="text-5xl font-black text-[#EEBA02]">
            100%
          </h2>
          <p className="text-[#9C9589] mt-2 uppercase text-sm">
            Lab Tested
          </p>
        </div>

      </div>

    </div>

    {/* Right */}

    <div className="hidden md:flex flex-1 justify-center z-10">

      <div className="relative">

        <div className="absolute inset-0 bg-[#EEBA02]/20 blur-3xl rounded-full"></div>

        <img
          src="https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800"
          alt="Supplement"
          className="relative w-[520px] h-[650px] object-cover rounded-2xl border border-[#2C2418]"
        />

        <div className="absolute bottom-6 left-6 bg-[#1A1713]/95 border border-[#8C7437] px-6 py-4 rounded-xl backdrop-blur-lg">
          <p className="text-[#9C9589] text-sm uppercase">
            Trusted By
          </p>

          <h3 className="text-2xl font-bold text-[#EEBA02]">
            10,000+ Athletes
          </h3>
        </div>

      </div>

    </div>

  </section>
);
}

export default Hero