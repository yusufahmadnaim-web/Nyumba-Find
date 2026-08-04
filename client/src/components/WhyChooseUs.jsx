function WhyChooseUs() {
  const features = [
    {
      icon: "✅",
      title: "Verified Listings",
      description:
        "Every property is reviewed to provide trustworthy and authentic listings.",
    },
    {
      icon: "🔒",
      title: "Secure Accounts",
      description:
        "JWT authentication keeps your account and personal information secure.",
    },
    {
      icon: "⚡",
      title: "Powerful Search",
      description:
        "Quickly search and filter properties by county, location, listing type and price.",
    },
    {
      icon: "📷",
      title: "Multiple Property Images",
      description:
        "Property owners can upload multiple images to showcase every home beautifully.",
    },
    {
      icon: "❤️",
      title: "Favorites",
      description:
        "Save your favorite properties and revisit them whenever you want.",
    },
    {
      icon: "🏠",
      title: "Modern Property Management",
      description:
        "Create, edit and manage your own property listings from your dashboard.",
    },
  ];

  return (
    <section className="bg-[#111827] py-24 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[0.3em] text-green-400 font-semibold mb-3">
            Why Choose Us
          </p>

          <h2 className="text-5xl font-black mb-5">
            Why Thousands Trust NyumbaFind
          </h2>

          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            We provide a modern, secure and user-friendly platform
            that simplifies buying, renting and selling property
            across Kenya.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#1f2937] rounded-2xl p-8 hover:-translate-y-2 transition duration-300 shadow-lg hover:border hover:border-green-500"
            >
              <div className="text-5xl mb-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-400 leading-7">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;