import { useEffect, useState } from "react";
import api from "../services/api";
import PropertyCard from "../components/PropertyCard";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [listingType, setListingType] = useState("");
  const [county, setCounty] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchProperties();
  }, [
    search,
    propertyType,
    listingType,
    county,
    bedrooms,
    minPrice,
    maxPrice,
    page,
  ]);

  async function fetchProperties() {
    try {
      setLoading(true);

      const response = await api.get("/properties", {
        params: {
          search,
          property_type: propertyType,
          listing_type: listingType,
          county,
          bedrooms,
          min_price: minPrice,
          max_price: maxPrice,
          page,
          per_page: 9,
        },
      });

      setProperties(response.data.properties);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function clearFilters() {
    setSearch("");
    setPropertyType("");
    setListingType("");
    setCounty("");
    setBedrooms("");
    setMinPrice("");
    setMaxPrice("");
    setPage(1);
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

        {/* Search */}

        <input
          type="text"
          placeholder="Search by title, location or county..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full p-4 rounded-xl bg-gray-800 mb-6 outline-none"
        />

        {/* Filters */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">

          <select
            value={propertyType}
            onChange={(e) => {
              setPropertyType(e.target.value);
              setPage(1);
            }}
            className="bg-gray-800 p-4 rounded-xl"
          >
            <option value="">All Property Types</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
          </select>

          <select
            value={listingType}
            onChange={(e) => {
              setListingType(e.target.value);
              setPage(1);
            }}
            className="bg-gray-800 p-4 rounded-xl"
          >
            <option value="">All Listings</option>
            <option value="Rent">Rent</option>
            <option value="Sale">Sale</option>
          </select>

          <select
            value={county}
            onChange={(e) => {
              setCounty(e.target.value);
              setPage(1);
            }}
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
            onChange={(e) => {
              setBedrooms(e.target.value);
              setPage(1);
            }}
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
            onChange={(e) => {
              setMinPrice(e.target.value);
              setPage(1);
            }}
            className="bg-gray-800 p-4 rounded-xl"
          />

          <input
            type="number"
            placeholder="Maximum Price"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              setPage(1);
            }}
            className="bg-gray-800 p-4 rounded-xl"
          />

          <button
            onClick={clearFilters}
            className="bg-red-600 hover:bg-red-700 rounded-xl font-semibold"
          >
            Clear Filters
          </button>

        </div>

        {/* Results */}

        {loading ? (
          <div className="text-center text-gray-400 text-xl py-20">
            Loading properties...
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center text-gray-400 text-xl py-20">
            No properties found.
          </div>
        ) : (
          <>
            <p className="text-gray-400 mb-6">
              {pagination.total} properties found
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                />
              ))}
            </div>

            {/* Pagination */}

            <div className="flex justify-center items-center gap-4 mt-12">

              <button
                disabled={!pagination.has_previous}
                onClick={() => setPage(page - 1)}
                className="bg-gray-800 px-5 py-3 rounded-xl disabled:opacity-40"
              >
                ← Previous
              </button>

              <span className="text-lg font-semibold">
                Page {pagination.page} of {pagination.pages}
              </span>

              <button
                disabled={!pagination.has_next}
                onClick={() => setPage(page + 1)}
                className="bg-gray-800 px-5 py-3 rounded-xl disabled:opacity-40"
              >
                Next →
              </button>

            </div>

          </>
        )}

      </div>
    </section>
  );
}

export default Properties;