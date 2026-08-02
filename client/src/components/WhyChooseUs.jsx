function WhyChooseUs() {
  const features = [
    {
      title: "Verified Listings",
      description: "Every property is reviewed before being published."
    },
    {
      title: "Trusted Agents",
      description: "Connect with reliable property owners and agencies."
    },
    {
      title: "Affordable Homes",
      description: "Browse properties that match every budget."
    },
    {
      title: "Secure Experience",
      description: "Your account and saved properties stay protected."
    }
  ];

  return (
    <section className="bg-[#0f172a] text-white py-24">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center mb-5">
          Why Choose NyumbaFind
        </h2>

        <p className="text-center text-gray-400 mb-16">
          Making home searching simple, secure and enjoyable.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => (

            <div
              key={index}
              className="bg-[#1e293b] rounded-2xl p-8 hover:bg-[#334155] transition"
            >

              <div className="text-5xl mb-5">
                ⭐
              </div>

              <h3 className="text-2xl font-semibold mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-400">
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