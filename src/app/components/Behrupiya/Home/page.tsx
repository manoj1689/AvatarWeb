/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "../Header";
import Footer from "../Footer";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import { RiUpload2Fill } from "react-icons/ri";
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
  // const [selectedImageSize, setSelectedImageSize] = useState<string>("1:1");
  const [selectedDressStyle, setSelectedDressStyle] =
    useState<string>("traditional");
  const cardsRef = useRef<HTMLDivElement | null>(null);

  const [selectedModel, setSelectedModel] = useState("cinematic");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const models = ["cinematic", "artistic", "photographic"];

  const [selectedImageSize, setSelectedImageSize] = useState("512px*512px");
  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const aspectRatios = [
    { label: "1:1", value: "512px*512px", icon: "□" },
    { label: "4:3", value: "680px*384px", icon: "▭" },
    { label: "3:4", value: "384px*680px", icon: "▯" },
    { label: "3:2", value: "768px*344px", icon: "▭" },
    { label: "2:3", value: "344px*768px", icon: "▯" },
    { label: "4:5", value: "408px*640px", icon: "▯" },
    { label: "5:4", value: "640px*408px", icon: "▭" },
  ];

  const selectedAspectRatio =
    aspectRatios.find((ar) => ar.value === selectedImageSize) ||
    aspectRatios[0];

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
      window.scrollTo(0, 0);
    };

    fetchData();
  }, []);

  const resetParameters = () => {
    // setUploadedImages([]);
    setGeneratedImage(null);
    setImageDimensions(null);
    // setSelectedCategory(null);
    setSelectedPrompt(null);
    setSelectedImageId(null);
    setPositivePrompt(null);
    setNegativePrompt("");
    setSelectedCinematic("cinematic");
    setSelectedDressStyle("traditional");
    setSelectedModel("cinematic");
    setSelectedImageSize("512px*512px");
    setIsModalOpen(false);
    setIsModalOpen1(false);
  };

  const handleGenerateNewImage = () => {
    resetParameters();
    window.scrollTo(0, 0);
  };

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
      ?.replace(/{cinematic_style}/gi, selectedModel)
      .replace(/{image_size}/gi, selectedImageSize)
      .replace(/{dress_style}/gi, selectedDressStyle);

    console.log("Modified Prompt:", modifiedPrompt);
    console.log("Style:", selectedModel);
    console.log("Parsed Width:", imageWidth);
    console.log("Parsed Height:", imageHeight);

    const formData = new FormData();
    uploadedImages.forEach((file) => formData.append("files", file));
    formData.append("prompt", modifiedPrompt || "");
    formData.append("style", selectedModel || "");
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

  const handleImageSelect = (id: string) => {
    const prompt = promptMap.get(id);
    if (prompt) {
      setPositivePrompt(prompt);
      setSelectedImageId(id);
      if (cardsRef.current) {
        const rect = cardsRef.current.getBoundingClientRect();
        window.scrollTo({
          top: window.scrollY + rect.top,
          left: window.scrollX + rect.left,
          behavior: "smooth",
        });
      }
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedImages((prevImages) => [...prevImages, ...files]);
  };

  const handleImageRemove = (index: number) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setUploadedImages((prevImages) => [...prevImages, ...files]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
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

          <div ref={cardsRef} className="flex justify-between">
            {/* First Card: Prompt Editing and Image Upload */}
            <div className="w-1/5 bg-white shadow-lg rounded-lg p-6 mr-4">
              {/* Image Upload */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Upload Image(s)</h2>
                <div
                  className="relative w-full min-h-[140px] p-4 border-2 border-dashed border-gray-300 rounded-lg text-center bg-gray-50 hover:bg-gray-100 flex flex-col items-center justify-center"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <label className="cursor-pointer flex flex-col items-center">
                   <RiUpload2Fill size={30} />
                    <span className="text-gray-600">Upload Image</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {uploadedImages.length > 0 && (
                    <div className="absolute inset-0 flex flex-wrap gap-2 p-2 bg-gray-100 rounded-lg overflow-auto">
                      {uploadedImages.map((file, index) => (
                        <div
                          key={index}
                          className="relative w-24 h-auto max-h-48 overflow-hidden bg-gray-200 rounded-lg p-2"
                          style={{ height: "auto" }}
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-full h-full object-contain"
                          />
                          <button
                            className="absolute top-1 right-1 text-white bg-red-600 rounded-full w-6 h-6 flex items-center justify-center"
                            onClick={() => handleImageRemove(index)}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Cinematic Dropdown */}
              <div className="mb-8">
                <label className="block text-gray-700 font-bold mb-2 text-left">
                  Models
                  <span className="relative inline-block group">
                    <i className="ml-2 text-blue-600 cursor-pointer">i</i>
                    <div className="pointer-events-none absolute left-0 bottom-full mb-2 w-48 p-2 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Information about the models goes here.
                    </div>
                  </span>
                </label>

                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {models.map((model) => (
                    <button
                      key={model}
                      onClick={() => setSelectedModel(model)}
                      className={`px-2 py-2 border border-gray-300 rounded-lg ${
                        selectedModel === model
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {model.charAt(0).toUpperCase() + model.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Size Dropdown */}
              <div className="mb-8">
                <label className="block text-gray-700 font-bold mb-2 text-left">
                  Aspect Ratio
                  <span className="relative inline-block group">
                    <i className="ml-2 text-blue-600 cursor-pointer">i</i>
                    <div className="pointer-events-none absolute left-0 bottom-full mb-2 w-48 p-2 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Information about the models goes here.
                    </div>
                  </span>
                </label>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setIsModalOpen1(!isModalOpen1)}
                    className="flex items-center justify-between w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">
                        {selectedAspectRatio.icon}
                      </span>
                      <span>{selectedAspectRatio.label}</span>
                    </div>
                    <i
                      className={`text-gray-700 ${
                        isModalOpen1 ? "rotate-180" : ""
                      }`}
                    >
                      ▶
                    </i>
                  </button>
                </div>

                {/* Modal */}
                {isModalOpen1 && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg max-w-lg w-full">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">Aspect Ratio</h3>
                        <button
                          onClick={() => setIsModalOpen1(false)}
                          className="text-gray-700 font-bold"
                        >
                          &times;
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        {aspectRatios.map((ar) => (
                          <button
                            key={ar.value}
                            onClick={() => {
                              setSelectedImageSize(ar.value);
                              setIsModalOpen1(false);
                            }}
                            className={`flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg ${
                              selectedImageSize === ar.value
                                ? "border-purple-500"
                                : ""
                            } hover:bg-gray-200`}
                          >
                            <div className="text-2xl">{ar.icon}</div>
                            <div className="mt-2 text-sm">{ar.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Dress Style Dropdown */}
              {/* <div className="mb-8">
                <label className="block text-gray-700 font-bold mb-2 text-left">
                  Dress Style
                  <span className="relative inline-block group">
                    <i className="ml-2 text-blue-600 cursor-pointer">i</i>
                    <div className="pointer-events-none absolute left-0 bottom-full mb-2 w-48 p-2 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Information about the models goes here.
                    </div>
                  </span>
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
              </div> */}
            </div>

            {/* Second Card: Generated Image and Download Option */}
            <div className="w-4/5 bg-white shadow-lg rounded-lg p-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Image Generated</h2>
                {isGenerating ? (
                  <div className="flex justify-center items-center h-56">
                    <ClipLoader color="#0000FF" size={50} />
                  </div>
                ) : generatedImage ? (
                  <div className="relative flex justify-center items-center h-80">
                    <Image
                      src={generatedImage}
                      alt="Generated"
                      width={imageWidth}
                      height={imageHeight}
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="text-gray-500 h-56 flex items-center justify-center">
                    No image generated yet.
                  </div>
                )}
              </div>
              {generatedImage && (
                <div className="flex flex-col items-center">
                  <button
                    onClick={handleDownload}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4"
                  >
                    Download Image
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                if (generatedImage) {
                  resetParameters();
                  window.scrollTo(0, 0);
                } else {
                  // Start the image generation process
                  handleGenerate();
                }
              }}
              className={`${buttonClassName} mt-4`}
              disabled={isButtonDisabled || isGenerating}
            >
              {isGenerating ? (
                <span>Generating Image...</span>
              ) : generatedImage ? (
                <span>Generate New Image</span>
              ) : (
                <span>Generate</span>
              )}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}