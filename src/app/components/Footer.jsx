"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
  const companyEmail = "info@smartgrader.in";
  const companyAddress =
    "Flat No: 3302, Tower 5, Hero Homes, sector 104, Dwarka Expressway, Gurugram.122001";
  const companyPhoneNumber = "+91-8920964502";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const sectionVariants = (direction) => ({
    hidden: {
      opacity: 0,
      y: direction === "top" ? -50 : direction === "bottom" ? 50 : 0,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  });

  return (
    <footer className="py-8 text-white ">
      <motion.div
        className="container mx-auto px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex flex-col lg:flex-row">
          {/* Left Section */}
          <motion.div
            className="w-full lg:w-1/2  order-2 lg:order-1 flex flex-col md:flex-row  p-4 space-y-8 md:space-y-0 md:space-x-8 lg:space-x-16"
            variants={sectionVariants("left")}
          >
            <div className="w-full lg:w-1/3 flex flex-col space-y-4">
              <span className="text-md font-semibold font-spline text-white">
                Useful Links
              </span>
              <div className="flex flex-col gap-2">
                <span className="text-gray-400 font-extralight font-spline">
                  Help & Support
                </span>
                <span className="text-gray-400 font-extralight font-spline">
                  Blog
                </span>
                <span className="text-gray-400 font-extralight font-spline">
                  About Us
                </span>
                <Link href="./Privacy&Policy" passHref>
                  <span className="text-gray-400 font-extralight font-spline">
                    Privacy & Policy
                  </span>
                </Link>
              </div>
              <div className="flex flex-col mt-8">
                <span className="text-lg font-semibold text-white font-spline">
                  Email Us
                </span>
                <span>
                <a
                  href={`mailto:${companyEmail}`}
                  className="text-blue-500 hover:text-gray-200 font-spline transition duration-300"
                >
                  {companyEmail}
                </a>
                </span>
             
              </div>
            </div>

            <div className="w-full lg:w-1/3  flex flex-col space-y-4">
              <span className="text-lg font-semibold font-spline text-white">
                Let&apos;s Talk
              </span>
              <p className="font-spline text-gray-400">{companyPhoneNumber}</p>
            </div>

            <div className="w-full lg:w-1/3  flex flex-col space-y-4">
              <span className="text-lg font-semibold text-white font-spline">
                Write to Us
              </span>
              <p className="font-spline text-gray-400">{companyAddress}</p>
            </div>
          </motion.div>

          {/* Right Section */}
          <motion.div
   className="flex lg:w-1/2 w-full order-1 lg:order-2 justify-center items-center"
   initial={{ x: '100%' }}
   animate={{ x: 0 }}
   transition={{ duration: 1, ease: "easeOut" }}
 >
   <motion.img
     src="/images/Footer/astronaut.webp"
     alt="Astronaut"
     className="w-80 mx-auto"
     animate={{
       y: [0, -20, 0], // Up and down motion
     }}
     transition={{
       duration: 2,
       repeat: Infinity, // Continuous loop
       ease: "easeInOut",
     }}
   />
 </motion.div>

        </div>

        {/* Footer Bottom */}
        <motion.div
          className="flex justify-center mt-8 border-t border-slate-600 pt-4"
          variants={sectionVariants("bottom")}
        >
          <p className="text-sm font-light text-gray-500 leading-5">
            © 2024 Bahrupiya Art. All Rights Reserved.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;

