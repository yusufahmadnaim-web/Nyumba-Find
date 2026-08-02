import { Link } from "react-router-dom";

function PropertyCard({ property }) {
  const image =
    property.images?.length > 0
      ? `http://127.0.0.1:5000${property.images[0].image_url}`
      : "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900";

  return (
    <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg hover:scale-105 duration-300">

     <img
  src={
    property.images?.length > 0
      ? `http://127.0.0.1:5000${property.images[0].image_url}`
      : "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900"
  }
  alt={property.title}
  className="h-64 w-full object-cover"
/>

      <div className="p-6">

        <h3 className="text-2xl font-bold text-white">
          {property.title}
        </h3>

        <p className="text-gray-400 mt-2">
          📍 {property.location}, {property.county}
        </p>

        <p className="text-green-400 font-bold text-xl mt-4">
  KES {Number(property.price).toLocaleString()}
</p>

        <div className="flex justify-between text-gray-300 mt-5">

          <span>🛏 {property.bedrooms} Beds</span>

          <span>🛁 {property.bathrooms} Baths</span>

        </div>

        <Link
          to={`/properties/${property.id}`}
          className="block mt-6 bg-white text-black text-center py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default PropertyCard;