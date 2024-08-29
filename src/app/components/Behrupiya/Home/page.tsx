"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../Header";
import Footer from "../Footer";
import Image from "next/image";
import { ClipLoader } from "react-spinners"; // Add this import for the spinner

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

  const handleGenerate = async () => {
    if (uploadedImages.length === 0 || !selectedPrompt) {
      alert("Please upload an image and select a prompt.");
      return;
    }

    const formData = new FormData();
    uploadedImages.forEach((file) => formData.append("files", file));
    formData.append("prompt", selectedPrompt);
    formData.append("style", "Photographic (Default)");
    formData.append("steps", "50");
    formData.append("negative_prompt", "");

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
      setSelectedPrompt(prompt);
      setSelectedImageId(id);
    }
  };

  const handlePromptChange = (id: string, newPrompt: string) => {
    setPromptMap((prevMap) => new Map(prevMap.set(id, newPrompt)));
    if (selectedImageId === id) {
      setSelectedPrompt(newPrompt);
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

  const isButtonDisabled = uploadedImages.length === 0 || !selectedPrompt;
  const buttonClassName = isButtonDisabled
    ? "px-6 py-3 bg-red-600 text-white rounded-lg cursor-not-allowed"
    : "px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors";

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="text-center py-10 w-full max-w-6xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Get Accurate, High-Quality, and Realistic Results in Seconds
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Step Into The Magical Kingdom And Awaken The Wonder!
          </p>

          {/* Categories Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            {categories.map((category) => {
              const isClickable =
                category.name === "Muslim Influences" ||
                category.name === "Sikh Culture" ||
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

          {/* Image Display */}
          <div className="grid grid-cols-6 gap-4 mb-8">
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

          {/* Image Upload and Prompt Selection */}
          <div className="flex justify-between w-full max-w-6xl mx-auto mb-8">
            <div className="w-1/2 bg-white shadow-lg rounded-lg p-6 mr-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Drag (Select) 1 or more photos of your face
              </h2>
              <div
                onDrop={(e) => {
                  e.preventDefault();
                  const files = Array.from(e.dataTransfer.files || []);
                  if (files.length > 0) {
                    setUploadedImages(files);
                  }
                }}
                onDragOver={(e) => e.preventDefault()}
                className="flex flex-wrap gap-2 items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg"
              >
                {uploadedImages.length > 0 ? (
                  uploadedImages.map((file, index) => (
                    <div
                      key={index}
                      className="relative w-1/3 h-32 overflow-hidden bg-gray-200 rounded-lg shadow-md"
                    >
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`Uploaded ${index}`}
                        width={100} // Set an appropriate width
                        height={100} // Set an appropriate height
                        className="object-cover w-full h-full"
                      />
                      <button
                        onClick={() => handleImageRemove(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                      >
                        X
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">
                    Drag and drop images here or click to select files.
                  </p>
                )}
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-4"
              />
            </div>

            {/* Prompt Editing */}
            <div className="w-1/2 bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Selected Image Prompt:
              </h2>
              <div>
                <textarea
                  value={selectedPrompt || ""}
                  onChange={(e) =>
                    selectedImageId &&
                    handlePromptChange(selectedImageId, e.target.value)
                  }
                  rows={5}
                  className="w-full p-2 border border-gray-300 rounded-lg resize-none"
                  placeholder="Edit the prompt here..."
                  disabled={!selectedPrompt}
                />
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Tip: Modify the prompt for custom output results
              </p>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isButtonDisabled || isGenerating}
            className={buttonClassName}
          >
            {isGenerating ? "Generating..." : "Generate Image"}
          </button>

          {/* Loading Spinner and Text */}
          {isGenerating && (
            <div className="flex flex-col items-center mt-4">
              <ClipLoader color="#3498db" size={50} /> {/* Loading spinner */}
              <p className="text-gray-500 mt-2">Your image is generating...</p>
            </div>
          )}

          {/* Generated Image Display */}
          {generatedImage && (
            <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Generated Image:
              </h2>
              <div className="flex justify-center">
                <Image
                  src={generatedImage}
                  alt="Generated Image"
                  width={imageDimensions?.width || 0}
                  height={imageDimensions?.height || 0}
                  className="rounded-lg"
                />
              </div>
              <button
                onClick={handleDownload}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Download Image
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
