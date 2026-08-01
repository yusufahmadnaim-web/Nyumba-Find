function Services() {
  const services = [
    {
      number: "01",
      title: "Buy a Home",
      description: "Browse premium houses, apartments and villas across Kenya.",
    },
    {
      number: "02",
      title: "Rent Property",
      description: "Find rental homes that fit your lifestyle and budget.",
    },
    {
      number: "03",
      title: "Sell Property",
      description: "List your property and connect with verified buyers.",
    },
    {
      number: "04",
      title: "Property Management",
      description: "Helping landlords manage properties efficiently.",
    },
  ];

  return (
    <section className="bg-[#111827] py-24 text-white">
      <div className="mx-auto max-w-7xl px-8">
        <h2 className="mb-12 text-5xl font-bold">
          Our Services
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.number}
              className="rounded-2xl bg-[#1f2937] p-8 transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <h3 className="mb-4 text-5xl font-black text-gray-500">
                {service.number}
              </h3>

              <h4 className="mb-4 text-2xl font-bold">
                {service.title}
              </h4>

              <p className="text-gray-400">
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