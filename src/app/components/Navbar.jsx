"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import React, { useState } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { FaUser, FaSignInAlt } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import Demo from "../components/Demo";

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
      <header className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="bg-[#01AFF4]">
          <div className="flex flex-col sm:flex-row container mx-auto py-1 font-semibold font-spline text-xs sm:text-sm text-white justify-between items-center">
            <span>Welcome to Smart Grader!</span>
            <span className="flex gap-3">
              <span>info@smartgrader.in</span>
              <span>+91-8920964502</span>
            </span>
          </div>
        </div>
        <div className="container mx-auto flex flex-row justify-between items-center p-4">
          <div className="text-lg font-semibold">
            <Link href="/">
            <span >
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
            <span 
            >
              <span className="text-gray-900 hover:text-blue-700 font-spline transition duration-300 cursor-pointer">
                Home
              </span>
            </span>
            </Link>
          
            <Link
              href="https://chatgpt.com/g/g-QcBTxz9bF-smartgrader-assistant"
              passHref
            >
              <span className="text-gray-900 hover:text-blue-700 font-spline transition duration-300 cursor-pointer">
                Chat with our docs
              </span>
            </Link>

            <Link href="https://discord.com/invite/mQeEsStC" passHref>
              <span className="text-gray-900 hover:text-blue-700 transition font-spline duration-300 cursor-pointer">
                Join our Discord
              </span>
            </Link>
            <span
              className="text-gray-900 hover:text-blue-700 transition font-spline duration-300 cursor-pointer"
              onClick={() => setDemo(true)}
            >
              Get Demo
            </span>
           <Link  href="/blog"   passHref>
           <div>
            <span className="text-gray-900 flex  gap-2 justify-center items-center hover:text-blue-700 transition duration-300 cursor-pointer">
              <span>Blog</span>{" "}
              <span>
                <MdArrowOutward size={20} />
              </span>
            </span>
          </div>
           </Link>
           
          </nav>

          <div className="hidden lg:flex flex-row basis-1/4 space-x-6 justify-end items-center">
          <nav className="flex items-center space-x-4">
        {/* Show user details if logged in */}
        {session ? (
          <>
            <span className="text-black">{session.user?.name || session.user?.email}</span>
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
