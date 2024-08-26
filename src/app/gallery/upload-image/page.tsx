// src/app/upload-image/page.tsx
import Header from '../../components/Behrupiya/Header';
import Footer from '../../components/Behrupiya/Footer';

export default function UploadImagePage() {
  return (
    <>
      <Header />
      <main className="container mx-auto p-6">
        <h2 className="text-3xl font-semibold text-center mb-6">Upload Your Image</h2>
        <div className="flex justify-center items-center p-6 border-2 border-dashed border-gray-400 rounded-lg bg-white">
          <label className="flex flex-col items-center cursor-pointer">
            <svg
              className="w-16 h-16 mb-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16V8m4 8V8m4 8V8m4 8V8m-4 8V8M5 8l7-7 7 7M12 21V3"
              ></path>
            </svg>
            <span className="text-gray-500">Choose a file or drag it here</span>
            <input type="file" className="hidden" />
          </label>
        </div>
      </main>
      <Footer />
    </>
  );
}
