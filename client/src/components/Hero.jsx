import heroImage from "../assets/hero.jpg";

function Hero() {
  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-6">
        <p className="mb-4 text-lg uppercase tracking-[0.4em] text-gray-300">
          Welcome to
        </p>

        <h1 className="text-6xl font-black md:text-8xl">
          NyumbaFind
        </h1>

        <p className="mt-6 max-w-2xl text-xl text-gray-200">
          Discover luxury apartments, villas and dream homes
          across Kenya.
        </p>

        <button className="mt-10 rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:scale-105 hover:bg-gray-200">
          Explore Properties
        </button>
      </div>
    </section>
  );
}

export default Hero;