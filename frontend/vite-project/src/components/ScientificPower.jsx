import science from "../assets/science.png";

function ScientificPower() {
  return (
    <section className="bg-[#0b0b0b] py-20 px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Image */}
        <div className="flex justify-center">
          <img
            src={science}
            alt="Scientific Power"
            className="w-full max-w-[520px] rounded-lg border border-[#2f2f2f] shadow-2xl"
          />
        </div>

        {/* Right Content */}
        <div>

          <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight">
            <span className="text-white">
              Scientific Power &
            </span>
            <br />
            <span className="text-[#D4AF37]">
              Raw Intensity
            </span>
          </h2>

          <div className="w-24 h-1 bg-[#D4AF37] mt-8 mb-8"></div>

          <p className="text-gray-300 text-lg leading-9">
            At <span className="font-bold text-white">BOLT FUEL</span>, we
            don't believe in <span className="italic">"supplements."</span> We
            believe in biological engineering. Our formulas are born in the lab
            and forged in the iron pit.
          </p>

          <p className="text-gray-400 text-lg leading-9 mt-8">
            Every milligram of our active ingredients is selected for one
            purpose: to crush stasis. We've eliminated the proprietary blends
            and hidden fillers to provide elite athletes with the exact fuel
            required for peak physiological output.
          </p>

          <div className="grid sm:grid-cols-2 gap-8 mt-12">

            <div className="border-l-4 border-[#D4AF37] pl-5">
              <h3 className="uppercase tracking-widest text-[#D4AF37] font-bold text-sm">
                Transparency
              </h3>

              <p className="text-gray-400 mt-3 leading-7">
                Full label disclosure on every single product.
              </p>
            </div>

            <div className="border-l-4 border-[#D4AF37] pl-5">
              <h3 className="uppercase tracking-widest text-[#D4AF37] font-bold text-sm">
                Potency
              </h3>

              <p className="text-gray-400 mt-3 leading-7">
                Clinical dosages that actually move the needle.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ScientificPower;