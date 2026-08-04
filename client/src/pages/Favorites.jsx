import { useEffect, useState } from "react";
import api from "../services/api";
import PropertyCard from "../components/PropertyCard";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  async function fetchFavorites() {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFavorites(response.data.favorites);
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    } finally {
      setLoading(false);
    }
  }

  async function removeFavorite(propertyId) {
    const token = localStorage.getItem("token");

    try {
      await api.delete(`/properties/${propertyId}/favorite`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFavorites((prev) =>
        prev.filter((fav) => fav.property.id !== propertyId)
      );

      alert("Property removed from favorites.");
    } catch (error) {
      console.error(error);
      alert("Failed to remove favorite.");
    }
  }

  return (
    <section className="min-h-screen bg-[#050816] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold mb-3">
          My Favorites
        </h1>

        <p className="text-gray-400 mb-10">
          Your saved properties.
        </p>

        {loading ? (
          <div className="text-center text-gray-400 text-xl">
            Loading favorites...
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center text-gray-400 text-xl">
            You haven't saved any properties yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((favorite) => (
              <div key={favorite.id}>
                <PropertyCard property={favorite.property} />

                <button
                  onClick={() => removeFavorite(favorite.property.id)}
                  className="w-full mt-3 bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold transition"
                >
                  ❤️ Remove from Favorites
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default Favorites;