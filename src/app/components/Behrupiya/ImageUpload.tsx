// src/components/ImageUpload.tsx

"use client";

import { useDropzone } from "react-dropzone";

export default function ImageUpload({ onUpload }: { onUpload: (file: File | null) => void }) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      onUpload(acceptedFiles[0]);
    },
  });

  return (
    <div {...getRootProps()} className="border-dashed border-2 p-6 my-4 text-center">
      <input {...getInputProps()} />
      <p>Drag & drop an image here, or click to select one</p>
    </div>
  );
}
