"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import ContactUs from "../../ContactUs";

const Pricing = () => {
  const [contactUs, setContactUs] = useState(false);

  const handleClose = () => {
    setContactUs(false);
  };

  const pricingPlans = [
    {
      plan: "Standard",
      price: "$8 / month",
      originalPrice: "$11 / month",
      billedYearly: "Billed yearly",
      discount: "30% off",
      features: [
        "Fast Processing",
        "All Styles & Models",
        "Commercial License",
        "Android Access",
        "Early Access to new features",
      ],
    },
    {
      plan: "Professional",
      price: "$10 / month",
      originalPrice: "$14 / month",
      billedYearly: "Billed yearly",
      discount: "30% off",
      features: [
        "All Standard features, plus",
        "Fast Processing",
        "All Styles & Models",
        "Commercial License",
        "Android Access",
        "Early Access to new features",
      ],
    },
    {
      plan: "Premium",
      price: "$13 / month",
      originalPrice: "$18 / month",
      billedYearly: "Billed yearly",
      discount: "30% off",
      features: [
        "All Professional features, plus",
        "Fast Processing",
        "All Styles & Models",
        "Commercial License",
        "Android Access",
        "Early Access to new features",
      ],
    },
  ];

  return (
    <section className="bg-gray-950 py-32">
      <ContactUs open={contactUs} onClose={handleClose} />
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span
            className="text-lg font-medium bg-black px-4 py-1 rounded-full border-2 border-gray-600 text-gray-400 m-8"
            style={{ letterSpacing: "0.3em" }}
          >
            OUR PRICING
          </span>
        </div>
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 text-5xl font-spline font-bold pb-8 text-center"
          >
            Get Started with ImagineArt
          </motion.div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pricingPlans.map((pricing, index) => (
            <motion.div
              key={index}
              className={`bg-gray-800 text-white shadow-md rounded-2xl p-8 flex flex-col justify-between  ${
                index === 1 ? "border-violet-500 border-2 " : ""
              }`} // Violet border for the center div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div>
                <h3 className="text-2xl font-bold mb-4 text-left">
                  {pricing.plan}
                </h3>
                <p className="text-6xl font-bold mb-2 text-left">
                  {pricing.price}{" "}
                  <span className="text-2xl line-through text-gray-400">
                    {pricing.originalPrice}
                  </span>
                </p>
                <p className="text-sm text-gray-400 mb-4 text-left">
                  {pricing.billedYearly} -{" "}
                  <span className="text-green-500">{pricing.discount}</span>
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setContactUs(true)}
                  className={`text-white px-4 py-4 rounded-xl font-bold text-lg mb-6 w-full ${
                    index === 1 ? "bg-violet-500" : "bg-gray-500"
                  }`}
                >
                  Get Started
                </motion.button>

                <hr className="border-t border-gray-600 my-8 " />
                <ul className="text-gray-300 mb-8 text-left">
                  {pricing.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center mb-3">
                      <FaCheckCircle className="text-blue-400 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
