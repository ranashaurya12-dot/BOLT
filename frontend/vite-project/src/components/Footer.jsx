import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#0D0B09] border-t border-[#2C2418] text-[#F5F1E8] px-8 md:px-20 py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">

        {/* Logo */}
        <div>
          <h1
            style={{ fontFamily: "Oswald, sans-serif" }}
            className="text-4xl font-bold italic uppercase text-[#EEBA02] cursor-pointer"
            onClick={() => navigate("/")}
          >
            ⚡ BOLT FUEL
          </h1>

          <p className="text-[#9C9589] mt-5 leading-7">
            Elite supplements engineered for athletes who demand maximum
            performance, recovery and strength.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h2 className="uppercase text-lg font-bold text-[#EEBA02] mb-5 tracking-wider">
            Shop
          </h2>

          <ul className="space-y-3 text-[#B9B1A5]">
            <li
              onClick={() => navigate("/shop")}
              className="hover:text-[#EEBA02] cursor-pointer transition"
            >
              All Products
            </li>

            <li
              onClick={() => navigate("/shop")}
              className="hover:text-[#EEBA02] cursor-pointer transition"
            >
              Best Sellers
            </li>

            <li
              onClick={() => navigate("/shop?category=Protein")}
              className="hover:text-[#EEBA02] cursor-pointer transition"
            >
              Protein
            </li>

            <li
              onClick={() => navigate("/shop?category=Creatine")}
              className="hover:text-[#EEBA02] cursor-pointer transition"
            >
              Creatine
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h2 className="uppercase text-lg font-bold text-[#EEBA02] mb-5 tracking-wider">
            Company
          </h2>

          <ul className="space-y-3 text-[#B9B1A5]">
            <li
              onClick={() => navigate("/about")}
              className="hover:text-[#EEBA02] cursor-pointer transition"
            >
              About Us
            </li>

            <li
              onClick={() => navigate("/privacy")}
              className="hover:text-[#EEBA02] cursor-pointer transition"
            >
              Privacy Policy
            </li>

            <li
              onClick={() => navigate("/policy")}
              className="hover:text-[#EEBA02] cursor-pointer transition"
            >
              Terms & Conditions
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="uppercase text-lg font-bold text-[#EEBA02] mb-5 tracking-wider">
            Contact
          </h2>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=boltfuelindia@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#B9B1A5] hover:text-[#EEBA02] transition block"
          >
            📧 boltfuelindia@gmail.com
          </a>

          <a
            href="tel:+918447445621"
            className="text-[#B9B1A5] hover:text-[#EEBA02] transition block mt-3"
          >
            📞 +91 8447445621
          </a>

          <div className="mt-6 border border-[#8C7437] rounded-lg p-4">
            <p className="text-[#EEBA02] font-semibold">
              ✔ Secure Checkout
            </p>

            <p className="text-[#9C9589] text-sm mt-2">
              100% Safe Payments
            </p>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-[#2C2418] mt-14 pt-6 flex flex-col md:flex-row justify-between items-center text-[#7E7668]">
        <p>© 2026 BOLT FUEL. ALL RIGHTS RESERVED.</p>

        <p className="uppercase tracking-widest mt-4 md:mt-0">
          ENGINEER YOUR LIMIT
        </p>
      </div>
    </footer>
  );
}

export default Footer;