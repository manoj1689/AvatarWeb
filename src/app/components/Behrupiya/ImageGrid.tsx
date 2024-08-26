// src/components/ImageGrid.tsx

"use client";

export default function ImageGrid({ selectedImage, onSelectImage }: { selectedImage: string | null; onSelectImage: (image: string) => void }) {
  const images = [
    "/path-to-image1.jpg",
    "/path-to-image2.jpg",
    // Add more reference images here
  ];

  return (
    <div className="grid grid-cols-3 gap-4 my-4">
      {images.map((image, index) => (
        <div key={index} className={`cursor-pointer ${selectedImage === image ? "border-4 border-blue-500" : ""}`} onClick={() => onSelectImage(image)}>
          <img src={image} alt={`Reference style ${index + 1}`} className="w-full h-auto" />
        </div>
      ))}
    </div>
  );
}
