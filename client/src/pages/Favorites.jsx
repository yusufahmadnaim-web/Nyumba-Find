import { useEffect, useState } from "react";
import api from "../services/api";
import PropertyCard from "../components/PropertyCard";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    api
      .get("/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFavorites(response.data.favorites);
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-950 min-h-screen flex justify-center items-center text-white text-2xl">
        Loading favorites...
      </div>
    );
  }

  return (
    <section className="bg-gray-950 min-h-screen py-20 px-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl text-white font-bold mb-4">
          My Favorites
        </h1>

        <p className="text-gray-400 mb-10">
          Properties you've saved.
        </p>

        {favorites.length === 0 ? (
          <div className="text-center text-gray-400 text-xl mt-20">
            ❤️ You haven't saved any properties yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {favorites.map((favorite) => (
              <PropertyCard
                key={favorite.id}
                property={favorite.property}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default Favorites;