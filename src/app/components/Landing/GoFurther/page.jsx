'use client'
import React from "react";

const GoFurtherPage = () => {
  return (
    <section className="bg-black py-20">
      <div className="container mx-auto px-8 bg-gradient-custom rounded-lg shadow-lg">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-12">
          <div className="text-center px-16 lg:text-left lg:w-1/2">
            <h1 className="text-5xl font-bold text-white mb-6">
              Go Further with ImagineArt
            </h1>
            <p className="text-lg text-white mb-6">
              Revolutionize your creative workflow with ImagineArt AI Tools Suite. From generating stunning AI art to crafting captivating videos and enhancing your creative projects, we provide you with the tools to bring your imagination to life.
            </p>
            <div className="flex   flex-col lg:flex-row ">
              <a
                href="https://play.google.com/store/apps/details?id=com.imagineart"
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                <img
                  src="/images/GoFurther/GPlay.png"
                  alt="Play Store"
                  className="w-52 "
                />
              </a>
              <a
                href="https://apps.apple.com/us/app/imagineart/id1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                <img
                  src="/images/GoFurther/AStore.png"
                  alt="App Store"
                  className="w-52"
                />
            
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 mt-12 pt-20 lg:mt-0">
            <img
              src="/images/GoFurther/image.webp"
              alt="AI Tools Suite"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-gradient-custom {
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.9) 0%,
            rgba(0, 0, 0, 0.7) 25%,
            rgba(0, 0, 255, 0.5) 50%,
            rgba(0, 255, 255, 0.5) 75%,
            rgba(148, 0, 211, 0.6) 100%
          );
        }
      `}</style>
    </section>
  );
};

export default GoFurtherPage;



