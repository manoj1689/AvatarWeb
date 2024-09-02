'use client'
import Hero from "../components/Landing/Hero/Hero";
import AITools from "../components/Landing/AITools/AITools"
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import Partners from "../components/Partners";
import Testimonials from "../components/Testimonials";
import Subscribe from "../components/Subscribe";
import Footer from "../components/Footer";
import PersonaSection from "../components/PersonaSection";
import Navbar from "../components/Navbar";
import IntroVideo from "../components/IntroVideo";

//import Chatbot from "../components/Chatbot/Chatbot";
export default function HomePage() {
  return (
    <div className="w-full h-full ">
<Navbar/>

<AITools/>
      <div  >
      
        <Features />
        <PersonaSection />
        <Pricing />
        {/* <Chatbot />  */}
                <IntroVideo />

        <Partners />

        <Testimonials />
      </div>

      <div className="w-full bg-gray-100">
        <Subscribe />
      </div>
      <div className="w-full bg-gray-900 text-white">
        <Footer />
      </div>
    </div>
  );
}