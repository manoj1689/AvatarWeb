"use client";
import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import ParallaxText from "../../common/ParallexImage";

const Hero = () => {
  const [list1Images, setList1Images] = useState([]);
  const [list2Images, setList2Images] = useState([]);
  const [list3Images, setList3Images] = useState([]);
  const [prompts] = useState([
    "A serene landscape with mountains",
    "A futuristic city skyline",
    "A magical forest with glowing creatures",
    "A retro 80s sci-fi scene",
    "A beautiful underwater world",
    "A cozy cabin in the snow",
    "A bustling marketplace in an ancient city",
    "A majestic castle on a hill",
    "A space station orbiting a distant planet",
    "A vibrant sunset over the ocean",
  ]);
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [typingEnabled, setTypingEnabled] = useState(true);

  useEffect(() => {
    // Fetch the image list from the JSON file
    fetch('/bgImages.json')
      .then((response) => response.json())
      .then((data) => {
        setList1Images(data.list1);
        setList2Images(data.list2);
        setList3Images(data.list3);
      })
      .catch((error) => console.error('Error fetching image list:', error));
  }, []);

  useEffect(() => {
    const typewriter = () => {
      if (currentIndex < prompts.length && typingEnabled) {
        const currentPrompt = prompts[currentIndex];
        if (currentCharIndex < currentPrompt.length) {
          setSelectedPrompt((prev) => prev + currentPrompt[currentCharIndex]);
          setCurrentCharIndex((prev) => prev + 1);
        } else {
          // Move to the next prompt after a short delay
          setTimeout(() => {
            setCurrentCharIndex(0);
            setSelectedPrompt(""); // Clear the input field for the next prompt
            setCurrentIndex((prev) => prev + 1);
          }, 50); // Delay before starting the next prompt
        }
      }
    };

    const interval = setInterval(() => {
      typewriter();
    }, 200); // Adjust the typing speed here

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentCharIndex, currentIndex, prompts, typingEnabled]);

  const handleFocus = () => {
    setTypingEnabled(false);
    setSelectedPrompt(""); // Clear the text when input is focused
  };

  const handleChange = (e) => {
    setSelectedPrompt(e.target.value);
    setTypingEnabled(false); // Stop the typewriter effect if user starts typing
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Section */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center items-center">
        <ParallaxText baseVelocity={-5}>
          <div className="flex flex-grow my-2">
            {list1Images.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`list1 image ${index + 1}`}
                className="mx-2 rounded-md flex-grow object-cover"
              />
            ))}
          </div>
        </ParallaxText>
        <ParallaxText baseVelocity={5}>
          <div className="flex flex-grow my-2">
            {list2Images.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`list2 image ${index + 1}`}
                className="mx-2 rounded-md flex-grow object-cover"
              />
            ))}
          </div>
        </ParallaxText>
        <ParallaxText baseVelocity={-4}>
          <div className="flex flex-grow my-2">
            {list3Images.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`list3 image ${index + 1}`}
                className="mx-2 rounded-md flex-grow object-cover"
              />
            ))}
          </div>
        </ParallaxText>
      </div>

      {/* Foreground Section */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-8" style={{ background: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.1) 100%)' }}>
  <div className="container flex flex-col mx-auto justify-center items-center">
    {/* Animated Title */}
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 text-7xl font-spline font-bold pb-8 text-center"
    >
      Imagine AI Art Generator
    </motion.div>

    {/* Animated Description */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="text-gray-300 text-xl w-1/2 mx-auto font-spline leading-6 text-center mb-8"
    >
      Create AI Art and turn your imaginations into reality with Imagine&apos;s AI Art Generator and produce stunning visuals to cover up your artistic thoughts.
    </motion.div>

    {/* Create For Free Button for small screens */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="block lg:hidden"
    >
      <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">
        Create For Free
      </button>
    </motion.div>

    {/* Input and Create Button in a Row for large screens */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="hidden lg:flex items-center bg-white p-1 rounded-full border-[6px] border-gray-600 md:w-1/2 lg:w-3/5 mt-4 lg:mt-0"
    >
      {/* Input field */}
      <input
        type="text"
        value={selectedPrompt}
        onFocus={handleFocus}
        onChange={handleChange}
        className="flex w-full m-2 p-2 rounded-lg outline-none"
        placeholder="Enter your prompt here"
      />
      {/* Button */}
      <button className="bg-blue-500 text-white px-8 py-2 ml-2 m-1 rounded-full border-[6px] border-gray-400 hover:bg-blue-600 transition duration-300">
        <span className="text-lg font-spline">Create</span>
      </button>
    </motion.div>
  </div>
</div>


    </section>
  );
};

export default Hero;





