import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get(`/properties/${id}`)
      .then((response) => {
        setProperty(response.data.property);
      })
      .catch((error) => {
        console.error("Error fetching property:", error);
      });
  }, [id]);

  const handleFavorite = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    try {
      setSaving(true);

      await api.post(
        `/properties/${property.id}/favorite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("❤️ Property added to favorites!");
    } catch (error) {
      console.error(error);
      alert("Unable to save property.");
    } finally {
      setSaving(false);
    }
  };

  if (!property) {
    return (
      <div className="bg-gray-950 min-h-screen flex items-center justify-center text-white text-2xl">
        Loading property...
      </div>
    );
  }

  return (
    <section className="bg-gray-950 min-h-screen text-white py-20 px-8">
      <div className="max-w-6xl mx-auto">

        <img
          src={
            property.images?.length > 0
              ? `http://127.0.0.1:5000${property.images[0].image_url}`
              : "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900"
          }
          alt={property.title}
          className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
        />

        <h1 className="text-5xl font-bold mt-8">
          {property.title}
        </h1>

        <p className="text-gray-400 mt-3 text-lg">
          📍 {property.location}, {property.county}
        </p>

        <h2 className="text-green-400 text-3xl font-bold mt-6">
          KES {Number(property.price).toLocaleString()}
        </h2>

        <button
          onClick={handleFavorite}
          disabled={saving}
          className="mt-6 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 px-6 py-3 rounded-xl font-semibold transition"
        >
          {saving ? "Saving..." : "❤️ Save Property"}
        </button>

        <div className="flex flex-wrap gap-10 mt-10 text-lg">
          <span>🛏 {property.bedrooms} Bedrooms</span>
          <span>🛁 {property.bathrooms} Bathrooms</span>
          <span>🏠 {property.property_type}</span>
          <span>📄 {property.listing_type}</span>
        </div>

        <div className="mt-12">
          <h3 className="text-3xl font-bold mb-4">
            Description
          </h3>

          <p className="text-gray-300 leading-8">
            {property.description}
          </p>
        </div>

      </div>
    </section>
  );
}

export default PropertyDetails;