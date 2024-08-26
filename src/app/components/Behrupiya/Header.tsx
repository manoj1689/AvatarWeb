"use client"; // This is a client-side component
import CreditButton from '../credit/creditButton';


export default function Header() {

  return (
    <header className="w-full bg-orange-400 p-4 flex justify-between items-center">
      <div className="text-white text-xl font-bold">
        Behrupiya
      </div>
    <div>
    <CreditButton />
    </div>
    </header>
  );
}
