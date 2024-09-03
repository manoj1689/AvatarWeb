"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../Header";
import Footer from "../Footer";
import Image from "next/image";
import { ClipLoader } from "react-spinners";

interface Prompt {
  id: string;
  src: string;
  alt: string;
}

interface Category {
  name: string;
  prompts: Prompt[];
}

export default function HomePage() {
  const router = useRouter();
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [promptMap, setPromptMap] = useState<Map<string, string>>(new Map());
  const [positivePrompt, setPositivePrompt] = useState<string | null>(null);
  const [negativePrompt, setNegativePrompt] = useState<string | null>("");

  const [selectedCinematic, setSelectedCinematic] =
    useState<string>("cinematic");
  const [selectedImageSize, setSelectedImageSize] = useState<string>("1:1");
  const [selectedDressStyle, setSelectedDressStyle] =
    useState<string>("traditional");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data.json");
      const data = await response.json();

      const categoryMap: Record<string, Prompt[]> = {};

      data.forEach((item: any) => {
        Object.keys(item).forEach((category) => {
          if (!categoryMap[category]) {
            categoryMap[category] = [];
          }
          if (item[category].length > 0) {
            item[category].forEach((imgData: any) => {
              categoryMap[category].push({
                id: imgData["Prompt ID"],
                src: imgData["Image URL"].startsWith("/")
                  ? imgData["Image URL"]
                  : `/${imgData["Image URL"]}`,
                alt: imgData["Prompt"],
              });
            });
          }
        });
      });

      const categoryList = Object.keys(categoryMap).map((name) => ({
        name,
        prompts: categoryMap[name],
      }));

      setCategories(categoryList);
      setPromptMap(
        new Map(
          categoryList.flatMap((cat) => cat.prompts.map((p) => [p.id, p.alt]))
        )
      );

      if (categoryList.some((cat) => cat.name === "Sikh Culture")) {
        setSelectedCategory("Sikh Culture");
      }
    };

    fetchData();
  }, []);

  // Parse the selected image size
  const [imageWidth, imageHeight] = selectedImageSize
    .split("*")
    .map((s) => parseInt(s.replace("px", ""), 10));

  const handleGenerate = async () => {
    if (uploadedImages.length === 0 || !positivePrompt) {
      alert("Please upload an image and enter positive/negative prompts.");
      return;
    }

    const modifiedPrompt = positivePrompt
      ?.replace(/{cinematic_style}/gi, selectedCinematic)
      .replace(/{image_size}/gi, selectedImageSize)
      .replace(/{dress_style}/gi, selectedDressStyle);

    console.log("Modified Prompt:", modifiedPrompt);
    console.log("Style:", selectedCinematic);
    console.log("Parsed Width:", imageWidth);
    console.log("Parsed Height:", imageHeight);

    const formData = new FormData();
    uploadedImages.forEach((file) => formData.append("files", file));
    formData.append("prompt", modifiedPrompt || "");
    formData.append("style", selectedCinematic || "");
    formData.append("width", imageWidth.toString());
    formData.append("height", imageHeight.toString());
    formData.append("steps", "50");
    formData.append("negative_prompt", negativePrompt || "");

    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const result = await response.json();
      setGeneratedImage(result.image_url);

      const img = new window.Image();
      img.src = result.image_url;
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height });
      };
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setUploadedImages(files);
    }
  };

  const handleImageRemove = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageSelect = (id: string) => {
    const prompt = promptMap.get(id);
    if (prompt) {
      setPositivePrompt(prompt);
      setSelectedImageId(id);
    }
  };

  const handlePromptChange = (id: string, newPrompt: string) => {
    setPromptMap((prevMap) => new Map(prevMap.set(id, newPrompt)));
    if (selectedImageId === id) {
      setPositivePrompt(newPrompt);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement("a");
      link.href = generatedImage;
      link.download = "generated-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const isButtonDisabled = uploadedImages.length === 0 || !positivePrompt;
  const buttonClassName = isButtonDisabled
    ? "px-6 py-3 bg-red-600 text-white rounded-lg cursor-not-allowed"
    : "px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors";

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-0">
        <div
          className="text-center py-5 w-full max-w-7xl"
          style={{ width: "95vw" }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-5">
            Get Accurate, High-Quality, and Realistic Results in Seconds
          </h1>
          <p className="text-lg text-gray-600 mb-7">
            Step Into The Magical Kingdom And Awaken The Wonder!
          </p>

          <div className="flex flex-wrap gap-4 mb-8 justify-center items-center">
            {categories.map((category) => {
              const isClickable =
                category.name === "Muslim Influences" ||
                category.name === "Sikh Culture" ||
                category.name === "Freedom Fighter" ||
                category.name === "Identity Mixing" ||
                category.name === "Indian Superhero" ||
                category.name === "Religional Attire";

              return (
                <button
                  key={category.name}
                  className={`px-4 py-2 rounded-lg text-white ${
                    selectedCategory === category.name
                      ? "bg-blue-600"
                      : "bg-gray-600"
                  } ${isClickable ? "" : "opacity-50 cursor-not-allowed"}`}
                  onClick={() => {
                    if (isClickable) {
                      setSelectedCategory(category.name);
                    }
                  }}
                  disabled={!isClickable}
                >
                  {category.name}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-7 gap-4 mb-8">
            {selectedCategory &&
              categories
                .find((cat) => cat.name === selectedCategory)
                ?.prompts.map((prompt) => (
                  <div
                    key={prompt.id}
                    className={`bg-white shadow-lg rounded-lg p-1 cursor-pointer ${
                      selectedImageId === prompt.id
                        ? "border-4 border-blue-500"
                        : ""
                    }`}
                    onClick={() => handleImageSelect(prompt.id)}
                  >
                    <Image
                      src={prompt.src}
                      alt={prompt.alt}
                      width={200}
                      height={200}
                      className="w-full h-auto object-cover rounded-lg"
                    />
                  </div>
                ))}
          </div>

          <div className="flex justify-between">
            {/* First Card: Prompt Editing and Image Upload */}
            <div className="w-1/2 bg-white shadow-lg rounded-lg p-6 mr-4">
              {/* Cinematic Dropdown */}
              <div className="mb-8">
                <label className="block text-gray-700 font-bold mb-2">
                  Select Cinematic Style:
                </label>
                <select
                  value={selectedCinematic}
                  onChange={(e) => setSelectedCinematic(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="cinematic">Cinematic</option>
                  <option value="photographic">Photographic</option>
                  <option value="artistic">Artistic</option>
                  {/* Add more options as needed */}
                </select>
              </div>

              {/* Image Size Dropdown */}
              <div className="mb-8">
                <label className="block text-gray-700 font-bold mb-2">
                  Select Image Size:
                </label>
                <select
                  value={selectedImageSize}
                  onChange={(e) => setSelectedImageSize(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="512px*512px">1:1</option>
                  <option value="912px*288px">9:16</option>
                  <option value="288px*912px">16:9</option>
                  <option value="680px*384px">4:3</option>
                  <option value="384px*680px">3:4</option>
                  <option value="768px344px">3:2</option>
                  <option value="344px*768px">2:3</option>
                  <option value="408px*640px">4:5</option>
                  <option value="640px*408px">5:4</option>
                  <option value="192px*1024px">5:12</option>
                  <option value="1024px*192px">12:5</option>
                </select>
              </div>

              {/* Dress Style Dropdown */}
              <div className="mb-8">
                <label className="block text-gray-700 font-bold mb-2">
                  Select Dress Style:
                </label>
                <select
                  value={selectedDressStyle}
                  onChange={(e) => setSelectedDressStyle(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="traditional">Traditional</option>
                  <option value="modern">Modern</option>
                  <option value="casual">Casual</option>
                </select>
              </div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Upload Image(s)</h2>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                />
              </div>
              <div>
                {uploadedImages.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Uploaded Images
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {uploadedImages.map((file, index) => (
                        <div
                          key={index}
                          className="relative w-24 h-24 overflow-hidden bg-gray-100 rounded-lg"
                        >
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            fill
                            className="object-cover"
                          />
                          <button
                            className="absolute top-1 right-1 text-white bg-red-600 rounded-full w-5 h-5 flex items-center justify-center"
                            onClick={() => handleImageRemove(index)}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Second Card: Generated Image and Download Option */}
            <div className="w-1/2 bg-white shadow-lg rounded-lg p-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Generated Image</h2>
                {isGenerating ? (
                  <div className="flex justify-center items-center h-56">
                    <ClipLoader color="#0000FF" size={50} />
                  </div>
                ) : generatedImage ? (
                  <div className="relative">
                    <Image
                      src={generatedImage}
                      alt="Generated"
                      width={imageWidth || 500}
                      height={imageHeight || 500}
                      style={{ width: `${imageWidth}px`, height: "auto" }}
                      className="w-full h-auto object-cover rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="text-gray-500 h-56 flex items-center justify-center">
                    No image generated yet.
                  </div>
                )}
              </div>
              {generatedImage && (
                <button
                  onClick={handleDownload}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Download Image
                </button>
              )}
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-center">
            <button
              onClick={handleGenerate}
              className={buttonClassName}
              disabled={isButtonDisabled}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
