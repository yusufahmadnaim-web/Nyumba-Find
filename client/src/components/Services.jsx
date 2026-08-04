function Services() {
  const services = [
    {
      icon: "🏡",
      title: "Buy a Home",
      description:
        "Discover verified houses, apartments and luxury villas across Kenya at competitive prices.",
    },
    {
      icon: "🔑",
      title: "Rent Property",
      description:
        "Find rental homes that perfectly match your lifestyle, location and budget.",
    },
    {
      icon: "💼",
      title: "Sell Your Property",
      description:
        "Reach thousands of potential buyers and tenants by listing your property on NyumbaFind.",
    },
    {
      icon: "🛡️",
      title: "Verified Listings",
      description:
        "Every listing is reviewed to help provide a safer and more trustworthy property search experience.",
    },
  ];

  return (
    <section className="bg-[#111827] py-24 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[0.3em] text-green-400 font-semibold mb-3">
            Our Services
          </p>

          <h2 className="text-5xl font-black mb-5">
            Everything You Need
          </h2>

          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Whether you're buying, renting or selling, NyumbaFind
            provides the tools and trusted listings you need to make
            the right property decision.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#1f2937] rounded-2xl p-8 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border hover:border-green-500"
            >
              <div className="text-6xl mb-6">
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {service.title}
              </h3>

              <p className="text-gray-400 leading-7">
                {service.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Services;