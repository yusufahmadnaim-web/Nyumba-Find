import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function CreateProperty() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    property_type: "Apartment",
    listing_type: "Rent",
    price: "",
    county: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await api.post("/properties", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const propertyId = response.data.property.id;

      if (image) {
        const imageData = new FormData();
        imageData.append("image", image);

        await api.post(
          `/properties/${propertyId}/images`,
          imageData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      toast.success("🎉 Property created successfully!");

      setTimeout(() => {
        navigate("/properties");
      }, 1500);

    } catch (error) {
      console.error(error);

      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to create property.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-[#050816] text-white py-16 px-6">
      <div className="max-w-3xl mx-auto bg-[#111827] p-10 rounded-2xl shadow-xl">

        <h1 className="text-4xl font-bold mb-8">
          Create Property
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="title"
            placeholder="Property Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-4 rounded bg-gray-800"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-4 rounded bg-gray-800"
            required
          />

          <div className="grid md:grid-cols-2 gap-4">

            <select
              name="property_type"
              value={formData.property_type}
              onChange={handleChange}
              className="p-4 rounded bg-gray-800"
            >
              <option>Apartment</option>
              <option>House</option>
              <option>Villa</option>
              <option>Land</option>
            </select>

            <select
              name="listing_type"
              value={formData.listing_type}
              onChange={handleChange}
              className="p-4 rounded bg-gray-800"
            >
              <option>Rent</option>
              <option>Sale</option>
            </select>

          </div>

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-4 rounded bg-gray-800"
            required
          />

          <input
            type="text"
            name="county"
            placeholder="County"
            value={formData.county}
            onChange={handleChange}
            className="w-full p-4 rounded bg-gray-800"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-4 rounded bg-gray-800"
            required
          />

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="number"
              name="bedrooms"
              placeholder="Bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              className="p-4 rounded bg-gray-800"
              required
            />

            <input
              type="number"
              name="bathrooms"
              placeholder="Bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              className="p-4 rounded bg-gray-800"
              required
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Property Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 rounded bg-gray-800"
            />

          </div>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-xl"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 py-4 rounded-xl font-bold text-lg transition"
          >
            {loading ? "Creating..." : "Create Property"}
          </button>

        </form>

      </div>
    </section>
  );
}

export default CreateProperty;