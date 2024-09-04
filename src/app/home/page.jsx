"use client";
import Hero from "../components/Landing/Hero/Hero";
import AITools from "../components/Landing/AITools/AITools";
import RowSlider from "../components/Landing/RowImageSliders/page";
import Pricing from "../components/Landing/Pricing/page";
import FAQ from "../components/Landing/QuestionSection/page";
import Discord from "../components/Landing/Discord/page";
import Testimonials from "../components/Landing/Testimonials/page";
import GoFurther from "../components/Landing/GoFurther/page";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


//import Chatbot from "../components/Chatbot/Chatbot";
export default function HomePage() {
  return (
    <div className="w-full h-full ">
      <Navbar />
      <Hero />
      <AITools />
      <RowSlider />
      <Pricing />
      <FAQ />
      <Discord />
      <Testimonials />
      <GoFurther />
      <Footer />
      
    </div>
  );
}
