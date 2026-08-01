import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">

        <Link
          to="/"
          className="text-3xl font-black text-white tracking-wide"
        >
          NyumbaFind
        </Link>

        <div className="hidden md:flex gap-10 text-white">

          <Link to="/">Home</Link>

          <Link to="/properties">Properties</Link>

          <Link to="/favorites">Favorites</Link>

          <Link to="/login">Login</Link>

          <Link to="/register">Register</Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;