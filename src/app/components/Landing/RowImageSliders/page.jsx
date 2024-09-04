'use client'
import React, { useState, useEffect } from 'react';
import ParallaxText from "../../common/ParallexImage";

const RowScroll = () => {
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);

  // Fetch the JSON data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/rowImages.json'); // Update with the correct path to your JSON file
        const data = await response.json();
        setList1(data.list1);
        setList2(data.list2);
      } catch (error) {
        console.error('Error fetching the JSON data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-black py-32">
      <div className=" mx-auto overflow-hidden">
        {/* List 1 */}
        <ParallaxText baseVelocity={-5}>
          <div className="flex mb-8 space-x-6">
            {list1.map((image, index) => (
              <div key={index} className="w-72 h-72 flex-shrink-0">
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="rounded-3xl object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </ParallaxText>

        {/* List 2 */}
        <ParallaxText baseVelocity={5}>
          <div className="flex mb-8 space-x-6">
            {list2.map((image, index) => (
              <div key={index} className="w-72 h-72 flex-shrink-0">
                <img
                  src={image}
                  alt={`Image ${index + 11}`}
                  className="rounded-3xl object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </ParallaxText>
      </div>
    </div>
  );
};

export default RowScroll;

