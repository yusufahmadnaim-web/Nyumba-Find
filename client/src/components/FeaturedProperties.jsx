import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import api from "../services/api";

function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/properties")
      .then((response) => {
        // Show only the latest 6 properties
        setProperties(response.data.properties.slice(0, 6));
      })
      .catch((error) => {
        console.error("Failed to load featured properties:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="bg-[#050816] py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">

          <div>
            <p className="uppercase tracking-[0.3em] text-green-400 font-semibold mb-2">
              Featured Listings
            </p>

            <h2 className="text-5xl font-black text-white">
              Featured Properties
            </h2>

            <p className="text-gray-400 mt-4 max-w-2xl">
              Explore some of the newest and most desirable homes
              available across Kenya.
            </p>
          </div>

          <Link
            to="/properties"
            className="mt-6 md:mt-0 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-bold transition"
          >
            View All Properties
          </Link>

        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center text-gray-400 text-xl py-20">
            Loading featured properties...
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center text-gray-400 text-xl py-20">
            No featured properties available.
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                />
              ))}
            </div>

            <div className="text-center mt-14">
              <Link
                to="/properties"
                className="inline-block border border-green-500 text-green-400 hover:bg-green-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition"
              >
                Browse All Listings →
              </Link>
            </div>
          </>
        )}

      </div>
    </section>
  );
}

export default FeaturedProperties;