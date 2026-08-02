import { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import api from "../services/api";

function FeaturedProperties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
  api
    .get("/properties")
    .then((response) => {
      console.log("API Response:", response.data);
      setProperties(response.data.properties);
    })
    .catch((error) => {
      console.error("API Error:", error);
    });
}, []);

  return (
    <section className="bg-gray-950 py-20 px-8">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-5xl font-bold text-white mb-3">
          Featured Properties
        </h2>

        <p className="text-gray-400 mb-10">
          Discover some of Kenya's finest homes.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {properties.length > 0 ? (
            properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))
          ) : (
            <p className="text-gray-400">
              Loading properties...
            </p>
          )}

        </div>

      </div>
    </section>
  );
}

export default FeaturedProperties;