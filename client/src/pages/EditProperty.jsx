import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] =useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    property_type: "",
    listing_type: "",
    price: "",
    county: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    images: [],
  });

  useEffect(() => {
    fetchProperty();
  }, [id]);

  async function fetchProperty() {
    try {
      const res = await api.get(`/properties/${id}`);
      setFormData(res.data.property);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load property.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      await api.patch(`/properties/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("✅ Property updated successfully!");

      setTimeout(() => {
        navigate(`/properties/${id}`);
      }, 1200);

    } catch (error) {
      console.error(error);

      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to update property.");
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleImageUpload() {
    if (!selectedImage) {
      toast.warning("Please select an image first.");
      return;
    }

    try {
      setUploading(true);

      const token = localStorage.getItem("token");

      const imageData = new FormData();
      imageData.append("image", selectedImage);

      await api.post(
        `/properties/${id}/images`,
        imageData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await fetchProperty();

      setSelectedImage(null);

      toast.success("📸 Image uploaded successfully!");

    } catch (error) {
      console.error(error);

      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to upload image.");
      }
    } finally {
      setUploading(false);
    }
  }

  async function handleDeleteImage(imageId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(
        `/properties/${id}/images/${imageId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchProperty();

      toast.success("🗑 Image deleted successfully!");

    } catch (error) {
      console.error(error);

      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to delete image.");
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex justify-center items-center text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#050816] text-white py-16">
      <div className="max-w-4xl mx-auto bg-[#111827] p-10 rounded-2xl">

        <h1 className="text-4xl font-bold mb-8">
          Edit Property
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-4 rounded bg-gray-800"
          />

          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-4 rounded bg-gray-800"
          />

          <input
            type="text"
            name="property_type"
            value={formData.property_type}
            onChange={handleChange}
            className="w-full p-4 rounded bg-gray-800"
          />

          <input
            type="text"
            name="listing_type"
            value={formData.listing_type}
            onChange={handleChange}
            className="w-full p-4 rounded bg-gray-800"
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-4 rounded bg-gray-800"
          />

          <input
            type="text"
            name="county"
            value={formData.county}
            onChange={handleChange}
            className="w-full p-4 rounded bg-gray-800"
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-4 rounded bg-gray-800"
          />

          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            className="w-full p-4 rounded bg-gray-800"
          />

          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            className="w-full p-4 rounded bg-gray-800"
          />

          <div className="border-t border-gray-700 pt-8">

            <h2 className="text-2xl font-bold mb-4">
              Property Images
            </h2>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files[0])}
              className="w-full mb-5"
            />

            <button
              type="button"
              onClick={handleImageUpload}
              disabled={uploading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 p-4 rounded-xl font-bold mb-8"
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </button>

            {formData.images?.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">

                {formData.images.map((image) => (
                  <div
                    key={image.id}
                    className="bg-gray-900 rounded-xl overflow-hidden shadow-lg"
                  >
                    <img
                      src={`http://127.0.0.1:5000${image.image_url}`}
                      alt="Property"
                      className="rounded-t-xl h-64 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => handleDeleteImage(image.id)}
                      className="w-full bg-red-600 hover:bg-red-700 py-3 font-bold transition"
                    >
                      🗑 Delete Image
                    </button>
                  </div>
                ))}

              </div>
            ) : (
              <p className="text-gray-400 text-center">
                No images uploaded yet.
              </p>
            )}

          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 p-4 rounded-xl font-bold mt-8"
          >
            {saving ? "Updating..." : "Update Property"}
          </button>

        </form>

      </div>
    </section>
  );
}

export default EditProperty;