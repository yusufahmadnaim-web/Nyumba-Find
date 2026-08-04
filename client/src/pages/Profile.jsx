import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.user);
        setProperties(response.data.user.properties || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

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

      alert("Property deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete property.");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] text-white flex justify-center items-center text-2xl">
        Loading profile...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#050816] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="bg-[#111827] rounded-2xl p-8 mb-10">
          <h1 className="text-4xl font-bold mb-4">
            My Profile
          </h1>

          <p className="text-lg">
            <strong>Username:</strong> {user.username}
          </p>

          <p className="text-lg">
            <strong>Email:</strong> {user.email}
          </p>

          <p className="text-lg">
            <strong>Role:</strong> {user.role}
          </p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            My Properties
          </h2>

          <Link
            to="/create-property"
            className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl font-semibold"
          >
            + Create Property
          </Link>
        </div>

        {properties.length === 0 ? (
          <div className="bg-[#111827] rounded-xl p-10 text-center text-gray-400">
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

export default Profile;