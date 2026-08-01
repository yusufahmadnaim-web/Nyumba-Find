import Navbar from "./Navbar";

function Hero() {
  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <Navbar />

      <div className="relative z-10 flex h-full items-center">

        <div className="max-w-7xl mx-auto px-8">

          <h1 className="text-7xl font-black text-white leading-none">
            Find Your
            <br />
            Dream Home
          </h1>

          <p className="text-gray-300 mt-6 text-xl max-w-xl">
            Browse apartments, villas, townhouses and land listings
            across Kenya.
          </p>

          <button
            className="mt-8 px-8 py-4 bg-blue-600 rounded-lg
            text-white hover:bg-blue-700 transition"
          >
            Explore Properties
          </button>

        </div>

      </div>
    </section>
  );
}

export default Hero;