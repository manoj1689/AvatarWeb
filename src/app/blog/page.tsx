"use client";
import React, { useState } from "react";
//@ts-ignore
import { motion } from "framer-motion";
import Data from "../../../blogs.json";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot/Chatbot";
function Blog() {
  const [expandedBlogs, setExpandedBlogs] = useState<number[]>([]);

  const toggleExpand = (index: number) => {
    if (expandedBlogs.includes(index)) {
      setExpandedBlogs(expandedBlogs.filter((item) => item !== index));
    } else {
      setExpandedBlogs([...expandedBlogs, index]);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-32 md:mt-20 mx-auto">
       
        <section className="bg-white">
       <Chatbot/> 
          <motion.div
            className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
              <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900">
                Our Blog
              </h2>
              <p className="font-light text-gray-500 sm:text-xl">
                We use an agile approach to test assumptions and connect with
                the needs of your audience early and often.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {Data.map((blog, index) => (
                <motion.article
                  key={index}
                  className="p-6 bg-white rounded-lg border border-gray-200 shadow-md"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.2 }}
                >
                  <div className="flex justify-between items-center mb-5 text-gray-500">
                    <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded">
                      <svg
                        className="mr-1 w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                      </svg>
                      Tutorial
                    </span>
                    <span className="text-sm">{blog.date}</span>
                  </div>
                  <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    <a href="#">{blog.title}</a>
                  </h2>
                  <p className="mb-5 font-light text-gray-500">
                    {expandedBlogs.includes(index)
                      ? blog.content
                      : truncateContent(blog.content)}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <img
                        className="w-7 h-7 rounded-full"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                        alt="Jese Leos avatar"
                      />
                      <span className="font-medium">{blog.author}</span>
                    </div>
                    <button
                      onClick={() => toggleExpand(index)}
                      className="inline-flex items-center font-medium text-primary-600 hover:underline"
                    >
                      {expandedBlogs.includes(index)
                        ? "Show less"
                        : "Read more"}
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
      <Footer />
    </>
  );

  function truncateContent(content: string) {
    const truncatedLength = Math.floor(content.length / 3);
    const truncatedContent = content.substr(0, truncatedLength);
    return `${truncatedContent}...`;
  }
}

export default Blog;
