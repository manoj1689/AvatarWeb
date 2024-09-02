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
      transition: { staggerChildren: 0.3 }
    }
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
      transition: { duration: 0.5, ease: "easeOut" }
    }
  });

  return (
    <footer className="bg-[#002D62] py-4 text-white">
      <motion.div
        className="container mx-auto px-4 w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex flex-col lg:flex-row">
          <motion.div
            className="w-full lg:w-1/2 order-2 flex flex-col md:flex-row lg:order-1"
            variants={sectionVariants("left")}
          >
            <div className="flex flex-col p-2 w-full">
              <div className="flex flex-row md:flex-col gap-5">
                <div className="flex w-1/2 md:w-full flex-col">
                  <span className="text-lg font-semibold font-spline text-white">
                    USEFUL LINKS
                  </span>
                  <div className="flex flex-col gap-2">
                    <span className="self-start text-gray-400 font-extralight font-spline">
                      Help & Support
                    </span>
                    <span className="self-start text-gray-400 font-extralight font-spline">
                      Blog
                    </span>
                    <span className="self-start text-gray-400 font-extralight font-spline">
                      About Us
                    </span>
                    <Link href="./Privacy&Policy" passHref>
                    <span className="self-start text-gray-400 font-extralight font-spline">
                    Privacy & Policy
                    </span>
                    </Link>
                  
                  </div>
                </div>
                <div className="flex w-1/2 md:w-full flex-col mb-8">
                  <span className="text-lg font-semibold text-white font-spline">
                    EMAIL US
                  </span>
                  <span>
                    <a
                      href={`mailto:${companyEmail}`}
                      className="text-gray-400 hover:text-gray-200 font-spline transition duration-300"
                    >
                      {companyEmail}
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div></div>
            <div className="mb-4 md:mb-0 w-full flex flex-col p-2">
              <div className="flex w-full">
                <span className="text-lg font-semibold font-spline text-white">
                  SOCIAL CONTACTS
                </span>
              </div>
              <div className="h-full flex flex-row items-start pt-4">
                <div className="flex w-full">
                  <div className="flex flex-col w-1/3 gap-3">
                    <div>
                      <a
                        href="https://www.facebook.com/pages/creation/?ref_type=comet_home"
                        className="text-white hover:text-sky-500 transition duration-300"
                      >
                        <img
                          src="images/social/facebook.png"
                          alt="facebook Logo"
                          className="cursor-pointer w-12"
                        />
                      </a>
                    </div>
                    <div>
                      <a
                        href="https://www.youtube.com/channel/UCftfkcIZ12QjtOarvNepG8g"
                        className="text-white hover:text-sky-500 transition duration-300"
                      >
                        <img
                          src="images/social/youtube.png"
                          alt="youtube Logo"
                          className="cursor-pointer w-16"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col w-1/3 justify-center items-start gap-5">
                    <div>
                      <a
                        href={`mailto:${companyEmail}`}
                        className="text-white hover:text-sky-500 transition duration-300"
                      >
                        <img
                          src="images/social/gmail.png"
                          alt="gmail Logo"
                          className="cursor-pointer w-12"
                        />
                      </a>
                    </div>
                    <div>
                      <a
                        href="https://www.instagram.com/smart_grader/"
                        className="text-white hover:text-sky-500 transition duration-300"
                      >
                        <img
                          src="images/social/instagram.png"
                          alt="instagram Logo"
                          className="cursor-pointer w-12"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col w-1/3 gap-5">
                    <div>
                      <a
                        href="https://www.linkedin.com/in/smart-grader-a36536311/"
                        className="text-white hover:text-sky-500 transition duration-300"
                      >
                        <img
                          src="images/social/linkedin.png"
                          alt="linkedin Logo"
                          className="cursor-pointer w-12"
                        />
                      </a>
                    </div>
                    <div>
                      <a
                        href="https://x.com/smart_grader"
                        className="text-white hover:text-sky-500 transition duration-300"
                      >
                        <img
                          src="images/social/X.png"
                          alt="X Logo"
                          className="cursor-pointer w-16"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="w-full lg:w-1/2 flex flex-col md:flex-row order-1 lg:order-2"
            variants={sectionVariants("right")}
          >
            <div className="w-full flex flex-col p-2">
              <div className="flex flex-row md:flex-col">
                <div className="flex w-1/2 sm:full flex-col mb-8">
                  <span className="text-lg font-semibold font-spline text-white">
                    LET&apos;S TALK
                  </span>
                  <p className="font-spline text-gray-400">
                    {companyPhoneNumber}
                  </p>
                </div>
                <div className="flex w-1/2 md:full flex-col mb-8">
                  <span className="text-lg font-semibold text-white font-spline mb-2">
                    WRITE TO US
                  </span>
                  <span>
                    <p className="font-spline text-gray-400">
                      {companyAddress}
                    </p>
                  </span>
                </div>
              </div>
            </div>
            <div className="p-2 w-full">
              <span className="text-lg font-semibold font-spline text-white">
                GOOGLE MAP
              </span>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.8566018495253!2d76.99280807631855!3d28.48386487574639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1766255a6705%3A0xb2df0b0641c2d6d4!2sHero%20Homes%20104%20Gurugram!5e0!3m2!1sen!2sin!4v1722251107436!5m2!1sen!2sin"
                width="100%"
                height={200}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-sm pt-2"
              ></iframe>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="flex flex-col justify-between mb-2"
          variants={sectionVariants("bottom")}
        >
          <div className="w-full pt-2">
            <div className="border-t border-slate-600 flex justify-center pt-2">
              <p className="text-sm font-light text-gray-500 leading-5">
                © 2024 Smart Graders. All Rights Reserved.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
