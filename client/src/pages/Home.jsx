import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Services from "../components/Services";
import FeaturedProperties from "../components/FeaturedProperties";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";


function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <FeaturedProperties />
      <Testimonials />
      <WhyChooseUs />
      <Footer />
    </>
  );
}

export default Home;