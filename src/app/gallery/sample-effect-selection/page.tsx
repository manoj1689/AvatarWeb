// src/app/sample-effect-selection/page.tsx
import Header from '../../components/Behrupiya/Header';
import Footer from '../../components/Behrupiya/Footer';

export default function SampleEffectSelectionPage() {
  const samples = [
    '/images/sample1.png',
    '/images/sample2.png',
    '/images/sample3.png',
    '/images/sample4.png',
    '/images/sample5.png',
    '/images/sample6.png',
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto p-6">
        <h2 className="text-3xl font-semibold text-center mb-6">Select a Sample Effect</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {samples.map((sample, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg shadow-lg hover:bg-blue-100 cursor-pointer"
            >
              <img src={sample} alt={`Sample ${index + 1}`} className="w-full rounded-lg" />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
