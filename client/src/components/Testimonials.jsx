function Testimonials() {
  const testimonials = [
    {
      name: "Jake Paul",
      role: "Home Buyer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      review:
        "NyumbaFind made buying my first home incredibly easy. The listings were accurate, and I found my dream apartment in Nairobi within a week.",
    },
    {
      name: "Sarah Connor",
      role: "Property Owner",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      review:
        "Listing my rental property took only a few minutes. I received multiple inquiries almost immediately. Highly recommended!",
    },
    {
      name: "Mike Tyson",
      role: "Tenant",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
      review:
        "The search filters helped me quickly find an affordable apartment near my workplace. The whole experience was smooth and stress-free.",
    },
  ];

  return (
    <section className="bg-[#050816] py-24 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[0.3em] text-green-400 font-semibold mb-3">
            Testimonials
          </p>

          <h2 className="text-5xl font-black mb-5">
            What Our Clients Say
          </h2>

          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Thousands of Kenyans trust NyumbaFind to help them buy,
            rent and sell properties every day.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#111827] rounded-2xl p-8 hover:-translate-y-2 transition duration-300 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">

                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                />

                <div>
                  <h3 className="text-xl font-bold">
                    {testimonial.name}
                  </h3>

                  <p className="text-green-400">
                    {testimonial.role}
                  </p>
                </div>

              </div>

              <p className="text-gray-300 leading-8 italic">
                "{testimonial.review}"
              </p>

              <div className="text-yellow-400 text-xl mt-6">
                ⭐⭐⭐⭐⭐
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;