import { useEffect, useState } from "react";
import api from "../services/api";
import PropertyCard from "../components/PropertyCard";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [listingType, setListingType] = useState("");
  const [county, setCounty] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    api
      .get("/properties")
      .then((response) => {
        setProperties(response.data.properties);
        setFilteredProperties(response.data.properties);
      })
      .catch((error) => {
        console.error("Failed to fetch properties:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const results = properties.filter((property) => {
      const matchesSearch =
        property.title.toLowerCase().includes(search.toLowerCase()) ||
        property.location.toLowerCase().includes(search.toLowerCase()) ||
        property.county.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        propertyType === "" ||
        property.property_type === propertyType;

      const matchesListing =
        listingType === "" ||
        property.listing_type === listingType;

      const matchesCounty =
        county === "" ||
        property.county === county;

      const matchesBedrooms =
        bedrooms === "" ||
        Number(property.bedrooms) === Number(bedrooms);

      const matchesMinPrice =
        minPrice === "" ||
        Number(property.price) >= Number(minPrice);

      const matchesMaxPrice =
        maxPrice === "" ||
        Number(property.price) <= Number(maxPrice);

      return (
        matchesSearch &&
        matchesType &&
        matchesListing &&
        matchesCounty &&
        matchesBedrooms &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    });

    setFilteredProperties(results);
  }, [
    search,
    propertyType,
    listingType,
    county,
    bedrooms,
    minPrice,
    maxPrice,
    properties,
  ]);

  function clearFilters() {
    setSearch("");
    setPropertyType("");
    setListingType("");
    setCounty("");
    setBedrooms("");
    setMinPrice("");
    setMaxPrice("");
  }

  return (
    <section className="min-h-screen bg-[#050816] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold mb-3">
          All Properties
        </h1>

        <p className="text-gray-400 mb-8">
          Browse available homes across Kenya.
        </p>

        <input
          type="text"
          placeholder="Search by title, location or county..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 rounded-xl bg-gray-800 mb-6 outline-none"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">

          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="bg-gray-800 p-4 rounded-xl"
          >
            <option value="">All Property Types</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
          </select>

          <select
            value={listingType}
            onChange={(e) => setListingType(e.target.value)}
            className="bg-gray-800 p-4 rounded-xl"
          >
            <option value="">All Listings</option>
            <option value="Rent">Rent</option>
            <option value="Sale">Sale</option>
          </select>

          <select
            value={county}
            onChange={(e) => setCounty(e.target.value)}
            className="bg-gray-800 p-4 rounded-xl"
          >
            <option value="">All Counties</option>
            <option value="Nairobi">Nairobi</option>
            <option value="Kiambu">Kiambu</option>
            <option value="Mombasa">Mombasa</option>
            <option value="Kisumu">Kisumu</option>
          </select>

          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="bg-gray-800 p-4 rounded-xl"
          >
            <option value="">Bedrooms</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4 Bedrooms</option>
            <option value="5">5+ Bedrooms</option>
          </select>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">

          <input
            type="number"
            placeholder="Minimum Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="bg-gray-800 p-4 rounded-xl"
          />

          <input
            type="number"
            placeholder="Maximum Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="bg-gray-800 p-4 rounded-xl"
          />

          <button
            onClick={clearFilters}
            className="bg-red-600 hover:bg-red-700 rounded-xl font-semibold"
          >
            Clear Filters
          </button>

        </div>

        {loading ? (
          <div className="text-center text-gray-400 text-lg">
            Loading properties...
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center text-gray-400 text-lg">
            No properties found.
          </div>
        ) : (
          <>
            <p className="text-gray-400 mb-6">
              {filteredProperties.length} properties found
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                />
              ))}
            </div>
          </>
        )}

      </div>
    </section>
  );
}

export default Properties;