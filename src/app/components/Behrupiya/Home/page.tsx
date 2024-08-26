
"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Header from '../../Behrupiya/Header';
import Footer from '../../Behrupiya/Footer';

// Utility function to get a random image
const getRandomImage = () => {
  const imageNumber = Math.floor(Math.random() * 9) + 1; // Generates a number between 1 and 9
  return `/images/sample${imageNumber}.png`;
};

// Define the categories and prompts with random images
const categories = [
  {
    category: "Indian Gods",
    prompts: [
      { id: 1, src: getRandomImage(), alt: "Lord Shiva" },
      { id: 2, src: getRandomImage(), alt: "Goddess Durga" },
      { id: 3, src: getRandomImage(), alt: "Lord Krishna" },
      { id: 4, src: getRandomImage(), alt: "Lord Ganesha" },
      { id: 5, src: getRandomImage(), alt: "Lord Vishnu" },
      { id: 6, src: getRandomImage(), alt: "Goddess Lakshmi" },
      { id: 7, src: getRandomImage(), alt: "Hanuman" },
    ]
  },
  {
    category: "Muslim Influences",
    prompts: [
      { id: 8, src: getRandomImage(), alt: "Sufi Saint" },
      { id: 9, src: getRandomImage(), alt: "Mughal Emperor" },
      { id: 10, src: getRandomImage(), alt: "Mughal Queen" },
      { id: 11, src: getRandomImage(), alt: "Muslim Scholar" },
    ]
  },
  {
    category: "Sikh Culture",
    prompts: [
      { id: 12, src: getRandomImage(), alt: "Sikh Sardar" },
      { id: 13, src: getRandomImage(), alt: "Guru Nanak" },
      { id: 14, src: getRandomImage(), alt: "Sikh Woman" },
      { id: 15, src: getRandomImage(), alt: "Sikh Warrior" },
    ]
  },
  {
    category: "Regional Attire",
    prompts: [
      { id: 16, src: getRandomImage(), alt: "South Indian Bride" },
      { id: 17, src: getRandomImage(), alt: "Bengali Woman" },
      { id: 18, src: getRandomImage(), alt: "Maharashtrian Man" },
      { id: 19, src: getRandomImage(), alt: "Rajasthani Woman" },
      { id: 20, src: getRandomImage(), alt: "Kashmiri Woman" },
      { id: 21, src: getRandomImage(), alt: "Tamil Brahmin" },
      { id: 22, src: getRandomImage(), alt: "Assamese Woman" },
      { id: 23, src: getRandomImage(), alt: "Gujarati Man" },
    ]
  },
  {
    category: "Religious Attire",
    prompts: [
      { id: 24, src: getRandomImage(), alt: "Muslim Woman in Burkha" },
      { id: 25, src: getRandomImage(), alt: "Hindu Priest" },
      { id: 26, src: getRandomImage(), alt: "Sikh Woman" },
      { id: 27, src: getRandomImage(), alt: "Christian Woman" },
      { id: 28, src: getRandomImage(), alt: "Buddhist Monk" },
    ]
  },
  {
    category: "Festive Celebrations",
    prompts: [
      { id: 29, src: getRandomImage(), alt: "Diwali Celebration" },
      { id: 30, src: getRandomImage(), alt: "Holi Celebration" },
      { id: 31, src: getRandomImage(), alt: "Onam Celebration" },
      { id: 32, src: getRandomImage(), alt: "Christmas Celebration" },
      { id: 33, src: getRandomImage(), alt: "Eid Celebration" },
    ]
  },
  {
    category: "Cultural Depictions",
    prompts: [
      { id: 34, src: getRandomImage(), alt: "Bharatnatyam Dancer" },
      { id: 35, src: getRandomImage(), alt: "Punjabi Bhangra Dancer" },
      { id: 36, src: getRandomImage(), alt: "Varanasi Ghat Scene" },
      { id: 37, src: getRandomImage(), alt: "Kathakali Dancer" },
      { id: 38, src: getRandomImage(), alt: "Manipuri Dancer" },
    ]
  },
  {
    category: "Identity Mixing",
    prompts: [
      { id: 39, src: getRandomImage(), alt: "South Indian Bride and Sikh Groom" },
      { id: 40, src: getRandomImage(), alt: "Muslim Woman and Hindu Woman" },
      { id: 41, src: getRandomImage(), alt: "Rajasthani and Bengali Attire" },
      { id: 42, src: getRandomImage(), alt: "Hindu Priest and Muslim Scholar" },
      { id: 43, src: getRandomImage(), alt: "Mughal Emperor and South Indian King" },
    ]
  },
  {
    category: "Indian Superheroes",
    prompts: [
      { id: 44, src: getRandomImage(), alt: "Modern-Day Hanuman" },
      { id: 45, src: getRandomImage(), alt: "Superhero Durga" },
      { id: 46, src: getRandomImage(), alt: "Superhero Rama" },
      { id: 47, src: getRandomImage(), alt: "Superhero Shiva" },
      { id: 48, src: getRandomImage(), alt: "Superhero Kali" },
    ]
  },
  {
    category: "Freedom Fighters",
    prompts: [
      { id: 49, src: getRandomImage(), alt: "Bhagat Singh" },
      { id: 50, src: getRandomImage(), alt: "Subhash Chandra Bose" },
      { id: 51, src: getRandomImage(), alt: "Chandrashekhar Azad" },
      { id: 52, src: getRandomImage(), alt: "Rani Lakshmibai" },
      { id: 53, src: getRandomImage(), alt: "Mahatma Gandhi" },
      { id: 54, src: getRandomImage(), alt: "Jawaharlal Nehru" },
    ]
  }
];

const aspectRatios = [
  "Instagram (1:1)",
  "35mm film / Landscape (3:2)",
  "35mm film / Portrait (2:3)",
  "CRT Monitor / Landscape (4:3)",
  "CRT Monitor / Portrait (3:4)",
  "Widescreen TV / Landscape (16:9)",
  "Widescreen TV / Portrait (9:16)",
  "Widescreen Monitor / Landscape (16:10)",
  "Widescreen Monitor / Portrait (10:16)",
  "Cinemascope (2.39:1)",
  "Widescreen Movie (1.85:1)",
  "Academy Movie (1.37:1)",
  "Sheet-print (A-series) / Landscape (297:210)",
  "Sheet-print (A-series) / Portrait (210:297)"
];

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Indian Gods');
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>(aspectRatios[0]);
useEffect(() => {
    console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
    console.log("NextAuth Secret:", process.env.NEXTAUTH_SECRET);
  }, []);
  const handleGenerate = () => {
    if (!session) {
      router.push('/api/auth/signin');
    } else {
      setGeneratedImage(uploadedImage); // Replace with actual generated image path
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  const handleImageRemove = () => {
    setUploadedImage(null);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedStyle(null);
  };

  const handleStyleSelect = (style: string) => {
    setSelectedStyle(style);
  };

  const handleAspectRatioSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAspectRatio(e.target.value);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="text-center py-10 w-full max-w-6xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Get Accurate, High-Quality, and Realistic Results in Seconds</h1>
          <p className="text-lg text-gray-600 mb-10">Step Into The Magical Kingdom And Awaken The Wonder!</p>

          {/* Category Selection Section */}
          <div className="flex justify-center space-x-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.category}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  selectedCategory === category.category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                onClick={() => handleCategorySelect(category.category)}
              >
                {category.category}
              </button>
            ))}
          </div>

          {/* Style Selection Section */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {categories
              .find((cat) => cat.category === selectedCategory)
              ?.prompts.map((style) => (
                <label key={style.id} className="cursor-pointer flex items-center space-x-3">
                  <input
                    type="radio"
                    name="style"
                    value={style.alt}
                    checked={selectedStyle === style.alt}
                    onChange={() => handleStyleSelect(style.alt)}
                    className="form-radio text-blue-500"
                  />
                  <img src={style.src} alt={style.alt} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="text-lg text-gray-800">{style.alt}</div>
                </label>
              ))}
          </div>

          {/* Upload Section */}
          <div className="flex justify-between w-full max-w-6xl mx-auto mb-8">
            <div className="w-1/2 bg-white shadow-lg rounded-lg p-6 mr-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Drag (Select) 1 or more photos of your face</h2>
              <div
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) {
                    const imageUrl = URL.createObjectURL(file);
                    setUploadedImage(imageUrl);
                  }
                }}
                onDragOver={(e) => e.preventDefault()}
                className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg"
              >
                {uploadedImage ? (
                  <div className="relative">
                    <img src={uploadedImage} alt="Uploaded" className="object-cover h-full w-full rounded-lg" />
                    <button
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                      onClick={handleImageRemove}
                    >
                      &times;
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-full text-center">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16l-4-4m0 0l4-4m-4 4h18M13 4h8m0 0v16m0-16l-4 4m4-4l-4 4m0 8h8m-8 0l4 4m0-4l-4 4"
                      />
                    </svg>
                    <span className="mt-2 text-sm text-gray-600">Drop File Here - or - Click to Upload</span>
                    <input type="file" className="hidden" onChange={handleImageUpload} />
                  </label>
                )}
              </div>
            </div>

            {/* Generated Image Section */}
            <div className="w-1/2 bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Generated Images</h2>
              <div className="relative flex justify-center items-center h-64 border rounded-lg">
                {generatedImage ? (
                  <img src={generatedImage} alt="Generated" className="object-contain max-w-full max-h-full rounded-lg" />
                ) : (
                  <div className="text-gray-500 flex items-center justify-center">
                    <span>No image generated yet. Please generate an image to see the result here.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Output Aspect Ratio Selection */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8 w-full max-w-6xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Output Aspect Ratio</h2>
            <select
              value={selectedAspectRatio}
              onChange={handleAspectRatioSelect}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              {aspectRatios.map((ratio, index) => (
                <option key={index} value={ratio}>
                  {ratio}
                </option>
              ))}
            </select>
          </div>

          {/* Generate Image Button */}
          <div className="w-full text-center mt-10">
            <button
              onClick={handleGenerate}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            >
              Generate Image
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}