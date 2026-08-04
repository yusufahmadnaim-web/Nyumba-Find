import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navClass = ({ isActive }) =>
    isActive
      ? "text-green-400 font-semibold"
      : "hover:text-green-400 transition";

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="bg-[#111827] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-3xl font-extrabold text-green-400"
        >
          🏠 NyumbaFind
        </Link>

        <div className="flex items-center gap-6">

          <NavLink to="/" className={navClass}>
            Home
          </NavLink>

          <NavLink to="/properties" className={navClass}>
            Properties
          </NavLink>

          {user ? (
            <>
              <NavLink to="/dashboard" className={navClass}>
                Dashboard
              </NavLink>

              <NavLink to="/create-property" className={navClass}>
                Create Property
              </NavLink>

              <NavLink to="/favorites" className={navClass}>
                Favorites
              </NavLink>

              <NavLink to="/profile" className={navClass}>
                Profile
              </NavLink>

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navClass}>
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
              >
                Register
              </NavLink>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;