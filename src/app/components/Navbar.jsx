"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import React, { useState } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { FaUser, FaSignInAlt } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import Demo from "./Demo";

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [demo, setDemo] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setDemo(false);
  };

  return (
    <>
      <Demo open={demo} onClose={handleClose} />
      <header className="bg-transparent shadow-md fixed w-full top-0 z-50 backdrop-blur-md">
        <div className="bg-[#01AFF4]">
          <div className="flex flex-col sm:flex-row max-lg:container lg:w-11/12 mx-auto   py-1 font-semibold font-spline text-xs sm:text-sm text-white justify-between items-center">
            <span>Welcome to Smart Grader!</span>
            <span className="flex gap-3">
              <span>info@smartgrader.in</span>
              <span>+91-8920964502</span>
            </span>
          </div>
        </div>
        <div className=" max-lg:container lg:w-11/12 mx-auto flex flex-row justify-between items-center p-4">
          <div className="text-lg font-semibold">
            <Link href="/">
              <span>
                <img
                  src="images/home/smart-logo1.png"
                  alt="Smart Grader Logo"
                  className="cursor-pointer w-28 md:w-32 lg:w-44"
                />
              </span>
            </Link>
          </div>

          <nav className="hidden lg:flex w-full space-x-4 lg:space-x-6 justify-center items-center">
  <Link href="/">
    <span className="text-white font-spline font-bold h-8 transition duration-300 cursor-pointer hover:border-b-2 border-white inline-block">
      Home
    </span>
  </Link>
  <Link
    href="https://chatgpt.com/g/g-QcBTxz9bF-smartgrader-assistant"
    passHref
  >
    <span className="text-white font-spline font-bold h-8 transition duration-300 cursor-pointer hover:border-b-2 border-white inline-block">
      Chat with our docs
    </span>
  </Link>
  <Link href="https://discord.com/invite/mQeEsStC" passHref>
    <span className="text-white font-spline font-bold h-8 transition duration-300 cursor-pointer hover:border-b-2 border-white inline-block">
      Join our Discord
    </span>
  </Link>
  <span
    className="text-white font-spline font-bold h-8 transition duration-300 cursor-pointer hover:border-b-2 border-white inline-block"
    onClick={() => setDemo(true)}
  >
    Get Demo
  </span>
  <Link href="/blog" passHref>
    <span className="text-white flex gap-2 h-8  hover:border-b-2 border-white transition duration-300 cursor-pointer font-bold">
      <span>Blog</span>
      <MdArrowOutward size={20} />
    </span>
  </Link>
</nav>


          <div className="hidden lg:flex flex-row basis-1/4 space-x-6 justify-end items-center">
            <nav className="flex items-center space-x-4">
              {/* Show user details if logged in */}
              {session ? (
                <>
                  <span className="text-white">
                    {session.user?.name || session.user?.email}
                  </span>
                  <button
                    onClick={() => signOut()}
                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => signIn("google")}
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Login with Google
                </button>
              )}
            </nav>
          </div>

          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {isOpen && <MobileMenu />}
      </header>
    </>
  );
};

export default Navbar;
