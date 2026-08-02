import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white px-8 py-5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <Link
          to="/"
          className="text-4xl font-bold"
        >
          NyumbaFind
        </Link>

        <div className="flex items-center gap-8">

          <Link to="/">Home</Link>

          <Link to="/properties">Properties</Link>

          {user ? (
            <>
              <Link to="/favorites">
                Favorites
              </Link>

              <Link to="/profile">
                Profile
              </Link>

              <button
                onClick={logout}
                className="text-red-400 hover:text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;