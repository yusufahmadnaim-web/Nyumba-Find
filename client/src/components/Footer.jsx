import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#111827] text-gray-300 mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        <div>
          <h2 className="text-2xl font-bold text-green-400 mb-4">
            🏠 NyumbaFind
          </h2>

          <p className="leading-7">
            Helping Kenyans discover homes for rent and sale with a modern,
            secure, and easy-to-use platform.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Quick Links
          </h3>

          <div className="flex flex-col gap-2">
            <Link to="/" className="hover:text-green-400">
              Home
            </Link>

            <Link to="/properties" className="hover:text-green-400">
              Properties
            </Link>

            <Link to="/favorites" className="hover:text-green-400">
              Favorites
            </Link>

            <Link to="/profile" className="hover:text-green-400">
              Profile
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Contact
          </h3>

          <p>Email: support@nyumbafind.com</p>
          <p>Phone: +254 700 000 000</p>
          <p>Nairobi, Kenya</p>
        </div>

      </div>

      <div className="border-t border-gray-800 py-6 text-center text-gray-500">
        © {new Date().getFullYear()} NyumbaFind. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;