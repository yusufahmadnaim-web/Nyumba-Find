import { Link } from "react-router-dom";
import heroImage from "../assets/hero.jpg";

function Hero() {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen items-center px-6">
        <div className="max-w-7xl mx-auto w-full">

          <div className="max-w-3xl">

            <p className="uppercase tracking-[0.4em] text-green-400 font-semibold mb-5">
              Welcome to NyumbaFind
            </p>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight text-white">
              Find Your
              <span className="block text-green-400">
                Dream Home
              </span>
              in Kenya
            </h1>

            <p className="mt-8 text-xl text-gray-300 leading-8 max-w-2xl">
              Browse verified apartments, villas, family homes and
              commercial properties across Nairobi, Kiambu,
              Mombasa, Kisumu and many more counties.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                to="/properties"
                className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-xl font-bold transition"
              >
                Browse Properties
              </Link>

              <Link
                to="/create-property"
                className="border border-white hover:bg-white hover:text-black px-8 py-4 rounded-xl font-bold transition"
              >
                List Your Property
              </Link>

            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-8 mt-16">

              <div>
                <h2 className="text-4xl font-bold text-green-400">
                  500+
                </h2>
                <p className="text-gray-300 mt-2">
                  Verified Homes
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-green-400">
                  47
                </h2>
                <p className="text-gray-300 mt-2">
                  Counties Covered
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-green-400">
                  24/7
                </h2>
                <p className="text-gray-300 mt-2">
                  Customer Support
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;