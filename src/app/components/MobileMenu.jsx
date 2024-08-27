"use client";

import React, { useState } from "react";

import { MdArrowOutward } from "react-icons/md";

import Demo from "../components/Demo";

const MobileMenu = () => {


  return (
    <>
      <Demo open={demo} onClose={handleClose} />
      <nav className="lg:hidden shadow-md absolute w-full top-full left-0 bg-blue-100">
        <div className="flex flex-col max-h-[calc(100vh-110px)]">
          <ul className="flex-grow flex flex-col py-5 mb-4 space-y-2 overflow-y-auto">
            <li className="flex justify-center">
             
            </li>
            <li className="flex justify-center">
              <span
                className="text-gray-900 hover:text-blue-700 transition font-spline duration-300 cursor-pointer"
                onClick={() => setDemo(true)}
              >
                Get Demo
              </span>
            </li>
            <li className="flex justify-center">
              <span
                onClick={() => router.push("/blog")}
                className="text-gray-900 flex gap-2 items-center hover:text-blue-700 transition duration-300 cursor-pointer"
              >
                <span>Blog</span>
                <span>
                  <MdArrowOutward size={20} />
                </span>
              </span>
            </li>
            <li>
              <div className="flex justify-center">
                <button
                  className="bg-white border border-sky-500 w-11/12 sm:w-7/12 my-3 text-sky-500 hover:bg-white hover:text-white font-medium font-spline py-2 px-4 rounded transition duration-300 ease-in-out"
                  onClick={() =>
                    (window.location.href =
                      "http://smart-grader-app-ts.vercel.app/signIn")
                  }
                >
                  <span className="text-sky-500">Sign In</span>
                </button>
              </div>
            </li>
            <li>
              <div className="flex justify-center">
                <button
                  className="bg-[#01AFF4] hover:bg-blue-500 text-white font-medium font-spline py-2 px-4 w-11/12 sm:w-7/12 my-3 rounded transition duration-300 ease-in-out"
                  onClick={() =>
                    (window.location.href =
                      "http://smart-grader-app-ts.vercel.app/createAccount")
                  }
                >
                  <span>Sign Up</span>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default MobileMenu;
