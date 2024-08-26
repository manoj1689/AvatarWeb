// src/app/generate-image/page.tsx
import Header from '../../components/Behrupiya/Header';
import Footer from '../../components/Behrupiya/Footer';

export default function GenerateImagePage() {
  const handleGenerate = () => {
    // Functionality to generate the image
    console.log('Generating image...');
  };

  return (
    <>
      <Header />
      <main className="container mx-auto p-6">
        <h2 className="text-3xl font-semibold text-center mb-6">Ready to Generate Your Image?</h2>
        <div className="flex justify-center">
          <button
            onClick={handleGenerate}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
          >
            Generate Image
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
