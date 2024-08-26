// src/app/effect-selection/page.tsx
import Header from '../../components/Behrupiya/Header';
import Footer from '../../components/Behrupiya/Footer';

export default function EffectSelectionPage() {
  const effects = [
    'Cinematic',
    'Disney Character',
    'Digital Art',
    'Photographic (Default)',
    'Fantasy Art',
    'Neonpunk',
    'Enhance',
    'Comic Book',
    'Lowpoly',
    'Line Art',
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto p-6">
        <h2 className="text-3xl font-semibold text-center mb-6">Select an Effect</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {effects.map((effect, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg shadow-lg text-center hover:bg-blue-100 cursor-pointer"
            >
              <p>{effect}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
