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
    if (!window.confirm("Delete this property?")) return;

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

      toast.success("Property deleted!");
    } catch (error) {
      toast.error("Unable to delete property.");
    }
  }

  const totalImages = properties.reduce(
    (sum, property) => sum + (property.images?.length || 0),
    0
  );

  const totalValue = properties.reduce(
    (sum, property) => sum + Number(property.price),
    0
  );

  const rentProperties = properties.filter(
    (p) => p.listing_type === "Rent"
  ).length;

  const saleProperties = properties.filter(
    (p) => p.listing_type === "Sale"
  ).length;

  const latestProperties = [...properties]
    .sort(
      (a, b) =>
        new Date(b.created_at) - new Date(a.created_at)
    )
    .slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white text-2xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#050816] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center flex-wrap gap-4 mb-10">

          <div>
            <h1 className="text-5xl font-bold">
              Welcome {user?.username}
            </h1>

            <p className="text-gray-400 mt-2">
              Manage your listings and monitor your activity.
            </p>
          </div>

          <Link
            to="/create-property"
            className="bg-green-600 hover:bg-green-700 px-6 py-4 rounded-xl font-bold"
          >
            + Create Property
          </Link>

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

          <div className="bg-[#111827] rounded-2xl p-8">
            <p className="text-gray-400">My Properties</p>
            <h2 className="text-4xl font-bold text-green-400 mt-2">
              {properties.length}
            </h2>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8">
            <p className="text-gray-400">Favorites</p>
            <h2 className="text-4xl font-bold text-red-400 mt-2">
              {favoritesCount}
            </h2>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8">
            <p className="text-gray-400">Images Uploaded</p>
            <h2 className="text-4xl font-bold text-blue-400 mt-2">
              {totalImages}
            </h2>
          </div>

          <div className="bg-[#111827] rounded-2xl p-8">
            <p className="text-gray-400">Portfolio Value</p>
            <h2 className="text-2xl font-bold text-yellow-400 mt-2">
              KES {totalValue.toLocaleString()}
            </h2>
          </div>

        </div>

        {/* Analytics */}

        <div className="grid lg:grid-cols-2 gap-8 mb-14">

          <div className="bg-[#111827] rounded-2xl p-8">

            <h2 className="text-2xl font-bold mb-6">
              Property Breakdown
            </h2>

            <div className="space-y-5">

              <div>
                <div className="flex justify-between">
                  <span>For Rent</span>
                  <span>{rentProperties}</span>
                </div>

                <div className="bg-gray-700 h-3 rounded mt-2">
                  <div
                    className="bg-green-500 h-3 rounded"
                    style={{
                      width: properties.length
                        ? `${(rentProperties / properties.length) * 100}%`
                        : "0%",
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <span>For Sale</span>
                  <span>{saleProperties}</span>
                </div>

                <div className="bg-gray-700 h-3 rounded mt-2">
                  <div
                    className="bg-blue-500 h-3 rounded"
                    style={{
                      width: properties.length
                        ? `${(saleProperties / properties.length) * 100}%`
                        : "0%",
                    }}
                  />
                </div>
              </div>

            </div>

          </div>

          <div className="bg-[#111827] rounded-2xl p-8">

            <h2 className="text-2xl font-bold mb-6">
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <Link
                to="/create-property"
                className="bg-green-600 p-5 rounded-xl text-center hover:bg-green-700"
              >
                ➕<br />Add Property
              </Link>

              <Link
                to="/properties"
                className="bg-blue-600 p-5 rounded-xl text-center hover:bg-blue-700"
              >
                🏠<br />Browse
              </Link>

              <Link
                to="/favorites"
                className="bg-red-600 p-5 rounded-xl text-center hover:bg-red-700"
              >
                ❤️<br />Favorites
              </Link>

              <Link
                to="/profile"
                className="bg-purple-600 p-5 rounded-xl text-center hover:bg-purple-700"
              >
                👤<br />Profile
              </Link>

            </div>

          </div>

        </div>

        {/* Recent Properties */}

        <h2 className="text-3xl font-bold mb-6">
          Recent Properties
        </h2>

        <div className="space-y-5">

          {latestProperties.length === 0 ? (
            <div className="bg-[#111827] rounded-xl p-8 text-center text-gray-400">
              No properties created yet.
            </div>
          ) : (
            latestProperties.map((property) => (
              <div
                key={property.id}
                className="bg-[#111827] rounded-xl p-5 flex justify-between items-center flex-wrap gap-5"
              >

                <div>

                  <h3 className="text-2xl font-bold">
                    {property.title}
                  </h3>

                  <p className="text-gray-400">
                    {property.location}, {property.county}
                  </p>

                  <p className="text-green-400 font-bold mt-2">
                    KES {Number(property.price).toLocaleString()}
                  </p>

                </div>

                <div className="flex gap-3">

                  <Link
                    to={`/properties/${property.id}`}
                    className="bg-green-600 px-5 py-3 rounded-lg"
                  >
                    View
                  </Link>

                  <Link
                    to={`/edit-property/${property.id}`}
                    className="bg-blue-600 px-5 py-3 rounded-lg"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(property.id)}
                    className="bg-red-600 px-5 py-3 rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

      </div>
    </section>
  );
}

export default Dashboard;