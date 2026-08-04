import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  const [properties, setProperties] = useState([]);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      const token = localStorage.getItem("token");

      const propertyRes = await api.get("/properties/my-properties", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProperties(propertyRes.data.properties || []);

      try {
        const favoritesRes = await api.get("/favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFavoritesCount(favoritesRes.data.favorites?.length || 0);
      } catch {
        setFavoritesCount(0);
      }

    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/properties/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProperties((prev) =>
        prev.filter((property) => property.id !== id)
      );

      toast.success("Property deleted successfully!");

    } catch (error) {
      console.error(error);
      toast.error("Failed to delete property.");
    }
  }

  const totalImages = properties.reduce(
    (total, property) => total + (property.images?.length || 0),
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] text-white flex justify-center items-center text-2xl">
        Loading dashboard...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#050816] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
          <div>
            <h1 className="text-5xl font-bold mb-2">
              Welcome{user?.username ? `, ${user.username}` : ""} 👋
            </h1>

            <p className="text-gray-400">
              Manage your properties and account from one place.
            </p>
          </div>

          <Link
            to="/create-property"
            className="bg-green-600 hover:bg-green-700 px-6 py-4 rounded-xl font-bold text-center"
          >
            + Add Property
          </Link>
        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">

          <div className="bg-[#111827] p-8 rounded-2xl shadow-lg">
            <p className="text-gray-400 text-sm">
              My Properties
            </p>

            <h2 className="text-4xl font-bold mt-3 text-green-400">
              {properties.length}
            </h2>
          </div>

          <div className="bg-[#111827] p-8 rounded-2xl shadow-lg">
            <p className="text-gray-400 text-sm">
              Favorites
            </p>

            <h2 className="text-4xl font-bold mt-3 text-red-400">
              {favoritesCount}
            </h2>
          </div>

          <div className="bg-[#111827] p-8 rounded-2xl shadow-lg">
            <p className="text-gray-400 text-sm">
              Total Images
            </p>

            <h2 className="text-4xl font-bold mt-3 text-blue-400">
              {totalImages}
            </h2>
          </div>

          <div className="bg-[#111827] p-8 rounded-2xl shadow-lg">
            <p className="text-gray-400 text-sm">
              Account Status
            </p>

            <h2 className="text-xl font-bold mt-3 text-green-400">
              Active
            </h2>
          </div>

        </div>

        {/* Quick Actions */}

        <h2 className="text-3xl font-bold mb-6">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">

          <Link
            to="/create-property"
            className="bg-green-600 hover:bg-green-700 rounded-2xl p-8 transition"
          >
            <h3 className="text-2xl font-bold mb-3">
              ➕ Add Property
            </h3>

            <p>Create a new property listing.</p>
          </Link>

          <Link
            to="/properties"
            className="bg-blue-600 hover:bg-blue-700 rounded-2xl p-8 transition"
          >
            <h3 className="text-2xl font-bold mb-3">
              🏠 Browse Properties
            </h3>

            <p>Explore all available listings.</p>
          </Link>

          <Link
            to="/favorites"
            className="bg-red-600 hover:bg-red-700 rounded-2xl p-8 transition"
          >
            <h3 className="text-2xl font-bold mb-3">
              ❤️ Favorites
            </h3>

            <p>View your saved homes.</p>
          </Link>

          <Link
            to="/profile"
            className="bg-purple-600 hover:bg-purple-700 rounded-2xl p-8 transition"
          >
            <h3 className="text-2xl font-bold mb-3">
              👤 Profile
            </h3>

            <p>Manage your account.</p>
          </Link>

        </div>

        {/* My Properties */}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">
            My Properties
          </h2>

          <Link
            to="/properties"
            className="text-green-400 hover:text-green-300 font-semibold"
          >
            View All →
          </Link>
        </div>

        {properties.length === 0 ? (
          <div className="bg-[#111827] rounded-2xl p-10 text-center text-gray-400">
            You haven't created any properties yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-[#111827] rounded-2xl overflow-hidden shadow-lg"
              >

                <img
                  src={
                    property.images?.length
                      ? `http://127.0.0.1:5000${property.images[0].image_url}`
                      : "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800"
                  }
                  alt={property.title}
                  className="w-full h-52 object-cover"
                />

                <div className="p-5">

                  <h3 className="text-2xl font-bold">
                    {property.title}
                  </h3>

                  <p className="text-green-400 text-xl font-semibold mt-2">
                    KES {Number(property.price).toLocaleString()}
                  </p>

                  <p className="text-gray-400 mt-2">
                    📍 {property.location}, {property.county}
                  </p>

                  <div className="flex gap-3 mt-6">

                    <Link
                      to={`/edit-property/${property.id}`}
                      className="flex-1 text-center bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(property.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default Dashboard;