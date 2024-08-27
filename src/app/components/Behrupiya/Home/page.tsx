"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "../../Behrupiya/Header";
import Footer from "../../Behrupiya/Footer";

interface Prompt {
  id: string;
  src: string;
  alt: string;
}

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [promptMap, setPromptMap] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data.json");
      const data = await response.json();
      const images: Prompt[] = data.map((item: any) => ({
        id: item["Prompt ID"],
        src: item["Image URL"],
        alt: item["Prompt"],
      }));
      setPrompts(images);
      const map = new Map(images.map((p) => [p.id, p.alt]));
      setPromptMap(map);
    };

    fetchData();
  }, []);

  const handleGenerate = async () => {
    if (!session) {
      router.push("/api/auth/signin");
      return;
    }

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

      // Fetch image dimensions
      const img = new Image();
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

          <div className="grid grid-cols-6 gap-4 mb-8">
            {prompts.map((prompt) => (
              <div
                key={prompt.id}
                className={`bg-white shadow-lg rounded-lg p-1 cursor-pointer ${
                  selectedImageId === prompt.id
                    ? "border-4 border-blue-500"
                    : ""
                }`}
                onClick={() => handleImageSelect(prompt.id)}
              >
                <img
                  src={prompt.src}
                  alt={prompt.alt}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            ))}
          </div>

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
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Uploaded ${index}`}
                        className="object-cover h-full w-full"
                      />
                      <button
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                        onClick={() => handleImageRemove(index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))
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
                        d="M7 16l4 4 4-4m4-4l-4-4-4 4m-4 4H4v-6h4v6zm8-6v6h4v-6h-4zM9 10l-4 4h3v4h2v-4h3l-4-4zm12-2a6 6 0 00-6 6v2a6 6 0 0012 0v-2a6 6 0 00-6-6zm-2 6a2 2 0 01-4 0v-2a2 2 0 014 0v2z"
                      />
                    </svg>
                    <span className="mt-2 text-gray-600">
                      Drag and drop an image here, or click to select
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="w-1/2 bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Generated Image
              </h2>
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <svg
                    className="animate-spin h-12 w-12 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 0 0"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v8l4 4M4 12a8 8 0 0116 0"
                    />
                  </svg>
                  <span className="mt-4 text-gray-600">Generating...</span>
                </div>
              ) : generatedImage ? (
                <div className="relative">
                  <img
                    src={generatedImage}
                    alt="Generated"
                    className="object-cover rounded-lg"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "400px",
                      width: "auto",
                      height: "auto",
                    }}
                  />
                  <button
                    onClick={handleDownload}
                    className="mt-4 bg-blue-600 text-white p-2 rounded-lg"
                  >
                    Download Image
                  </button>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-600">
                  No image generated yet.
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isButtonDisabled}
            className={buttonClassName}
          >
            {isGenerating ? "Generating..." : "Generate Image"}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
