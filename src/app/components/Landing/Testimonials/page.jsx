'use client'
import React from "react";
import StarRatings from "react-star-ratings";
const testimonials = [
  {
    name: "Sarah Jones",
    title: "Artist",
    review: "ImagineArt is the best AI Image generator! I can brainstorm ideas and get stunning visuals in seconds. It helps me overcome creative block and explore new artistic directions.",
    rating: 5,
  },
  {
    name: "Chloe Anderson",
    title: "Writer",
    review: "ImagineArt is a dream come true for writers like me! It helps me visualize scenes and characters, bringing my stories to life in a whole new way.",
    rating: 4.5,
  },
  {
    name: "Noah Miller",
    title: "Product Developer",
    review: "We use ImagineArt to prototype product designs and user interfaces. It allows us to quickly iterate and test different concepts before investing time and resources into physical prototypes.",
    rating: 5,
  },
  {
    name: "Katherine Lee",
    title: "Musician",
    review: "Imagine AI Art Generator inspires me to create new music videos and album covers.",
    rating: 4.8,
  },
  {
    name: "Omar Garcia",
    title: "Web Developer",
    review: "ImagineArt is a helpful tool for generating website mockups.",
    rating: 4.7,
  },
  {
    name: "David Lee",
    title: "Graphic Designer",
    review: "I use ImagineArt to create mockups and concept art for clients. It saves me tons of time and allows for a wider range of creative exploration.",
    rating: 5,
  },
  {
    name: "Liam Rivers",
    title: "Product Designer",
    review: "ImagineArt has revolutionized my creative process, providing endless design inspirations and accelerating my design iterations.",
    rating: 4.9,
  },
  {
    name: "Aisha Patel",
    title: "Blogger",
    review: "ImagineArt helps me create captivating visuals for my blog posts. It allows me to illustrate concepts and ideas in a way that keeps my readers engaged.",
    rating: 4.6,
  },
  {
    name: "Peter Jackson",
    title: "Gamer",
    review: "ImagineArt takes my gaming experience to the next level. I use it to visualize character designs and environments, making games even more immersive.",
    rating: 4.8,
  },
  {
    name: "Isabelle Dubois",
    title: "Fashion Designer",
    review: "ImagineArt is like having a virtual mood board at my fingertips. I can generate different clothing styles and fabric textures, helping me create unique and cohesive fashion collections.",
    rating: 5,
  },
  {
    name: "Maria Garcia",
    title: "Architect",
    review: "ImagineArt has become an invaluable tool. Simply the best AI Image generator I have used.",
    rating: 5,
  },
  {
    name: "Emily Brown",
    title: "Marketing Specialist",
    review: "ImagineArt is a fantastic AI generator for creating social media graphics and marketing materials. It helps me generate eye-catching visuals that resonate with our target audience.",
    rating: 4.7,
  },
  {
    name: "Sophia Bennett",
    title: "Editor",
    review: "Imagine AI Art Generator is a great way to generate illustrations for articles, but sometimes the artistic style might not be a perfect fit. It requires some browsing and refinement to find the right image.",
    rating: 4.4,
  }
];




const ReviewPage = () => {
  return (
    <section className="bg-black py-20">
      <div className="container mx-auto px-8">
        <h1 className="text-4xl font-bold text-center text-white mb-10">WALL OF LOVE</h1>
        <p className="text-center text-white text-lg mb-12">
          Join 1M+ users creating art using Imagine.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl text-white font-semibold">
                    {testimonial.name}
                  </h2>
                  <h3 className="text-lg text-white font-medium">
                    {testimonial.title}
                  </h3>
                </div>
                <div className="flex items-center">
                  <StarRatings
                    rating={testimonial.rating}
                    starRatedColor="#FFD700"  // Gold color
                    starEmptyColor="#4B5563"  // Gray color for inactive stars
                    starDimension="24px"
                    starSpacing="2px"
                    numberOfStars={5}
                    name="rating"
                  />
                </div>
              </div>
              <p className="text-base text-white">{testimonial.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewPage;

  
