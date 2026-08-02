function Testimonials() {
  const testimonials = [
    {
      name: "Kimberly Banks",
      role: "Home Buyer",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      review:
        "NyumbaFind helped me find my dream apartment in Nairobi within a week. The experience was smooth and professional.",
    },
    {
      name: "Jake Paul",
      role: "Property Investor",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      review:
        "The listings are verified and the interface is beautiful. I now use NyumbaFind for every investment opportunity.",
    },
    {
      name: "Samantha Lee",
      role: "Landlord",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      review:
        "Uploading my property was simple and I found tenants much faster than using social media.",
    },
  ];

  return (
    <section className="bg-[#070d1f] text-white py-24">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center">
          What Our Clients Say
        </h2>

        <p className="text-center text-gray-400 mt-4 mb-16">
          Trusted by homeowners, landlords and investors across Kenya.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((person, index) => (

            <div
              key={index}
              className="bg-[#111827] rounded-3xl p-8 shadow-xl hover:-translate-y-2 transition duration-300"
            >

              <img
                src={person.image}
                alt={person.name}
                className="w-20 h-20 rounded-full mx-auto border-4 border-blue-500"
              />

              <h3 className="text-2xl font-bold text-center mt-5">
                {person.name}
              </h3>

              <p className="text-blue-400 text-center mb-4">
                {person.role}
              </p>

              <div className="text-yellow-400 text-center text-xl mb-4">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="text-gray-300 text-center">
                "{person.review}"
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;