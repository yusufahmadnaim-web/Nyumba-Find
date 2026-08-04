import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../services/api";

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    api
      .get(`/properties/${id}`)
      .then((response) => {
        setProperty(response.data.property);

        if (response.data.property.images.length > 0) {
          setSelectedImage(
            `http://127.0.0.1:5000${response.data.property.images[0].image_url}`
          );
        }
      })
      .catch((error) => {
        console.error(error);
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

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this property?")) {
      return;
    }

    try {
      setDeleting(true);

      await api.delete(`/properties/${property.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Property deleted successfully!");
      navigate("/properties");
    } catch (error) {
      console.error(error);
      alert("Unable to delete property.");
    } finally {
      setDeleting(false);
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

        {/* Main Image */}

        <img
          src={
            selectedImage ||
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900"
          }
          alt={property.title}
          className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
        />

        {/* Gallery */}

        {property.images.length > 0 && (
          <div className="grid grid-cols-4 gap-4 mt-5">
            {property.images.map((image) => (
              <img
                key={image.id}
                src={`http://127.0.0.1:5000${image.image_url}`}
                alt="Property"
                onClick={() =>
                  setSelectedImage(
                    `http://127.0.0.1:5000${image.image_url}`
                  )
                }
                className={`h-28 w-full object-cover rounded-xl cursor-pointer border-4 transition ${
                  selectedImage ===
                  `http://127.0.0.1:5000${image.image_url}`
                    ? "border-green-500"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>
        )}

        <div className="flex justify-between items-center mt-8 flex-wrap gap-4">

          <div>
            <h1 className="text-5xl font-bold">
              {property.title}
            </h1>

            <p className="text-gray-400 mt-3 text-lg">
              📍 {property.location}, {property.county}
            </p>
          </div>

          <div className="flex gap-3">

            <button
              onClick={handleFavorite}
              disabled={saving}
              className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl font-semibold"
            >
              {saving ? "Saving..." : "❤️ Favorite"}
            </button>

            <Link
              to={`/edit-property/${property.id}`}
              className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-semibold"
            >
              ✏️ Edit
            </Link>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-700 hover:bg-red-800 px-5 py-3 rounded-xl font-semibold"
            >
              {deleting ? "Deleting..." : "🗑 Delete"}
            </button>

          </div>

        </div>

        <h2 className="text-green-400 text-3xl font-bold mt-8">
          KES {Number(property.price).toLocaleString()}
        </h2>

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