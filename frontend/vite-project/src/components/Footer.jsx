function Footer() {
  return (

    <footer className="bg-black text-white py-16 px-10">

      <div className="flex justify-between">

        {/* Brand */}
        <div>

          <h1 className="text-4xl font-bold text-blue-500">
            BOLT
          </h1>

          <p className="text-gray-400 mt-4 max-w-sm">
            Premium fitness supplements engineered for strength, recovery, and peak performance.
          </p>

        </div>

        {/* Links */}
        <div>

          <h2 className="text-2xl font-bold mb-4">
            Quick Links
          </h2>

          <ul className="space-y-3 text-gray-400">

            <li>Home</li>
            <li>Shop</li>
            <li>Categories</li>
            <li>About</li>

          </ul>

        </div>

        {/* Contact */}
        <div>

          <h2 className="text-2xl font-bold mb-4">
            Contact
          </h2>

          <p className="text-gray-400">
            support@voltra.com
          </p>

          <p className="text-gray-400 mt-2">
            +91 99999 99999
          </p>

        </div>

      </div>

      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500">
        © 2026 BOLT. All rights reserved.
      </div>

    </footer>
  )
}

export default Footer