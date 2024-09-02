
import React, { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

const ToolItem = ({ tool, onVisibilityChange }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  useEffect(() => {
    onVisibilityChange(tool.id, inView);
  }, [inView, tool.id, onVisibilityChange]);

  return (
    <div
      ref={ref}
      className={`sticky top-64 overflow-hidden z-10 transition-opacity duration-600 ${inView ? 'opacity-100' : 'opacity-0'} ${inView ? 'translate-y-0' : 'translate-y-10'}`}
    >
      <div>
        <video
          className="w-full h-full rounded-xl"
          src={tool.videoUrl}
          autoPlay
          loop
          muted
          playsInline
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

const AITools = () => {
  const [currentToolId, setCurrentToolId] = useState(null);
  const [toolVisibility, setToolVisibility] = useState(new Map());
  const [AiTools, setAITools] = useState([]);

  const handleVisibilityChange = useCallback((toolId, isInView) => {
    setToolVisibility(prev => new Map(prev).set(toolId, isInView));
  }, []);

  useEffect(() => {
    fetch('/AITools.json')
      .then(response => response.json())
      .then(data => setAITools(data))
      .catch(error => console.error('Error fetching AI Tools:', error));
  }, []);

  useEffect(() => {
    const visibleTool = [...toolVisibility.entries()]
      .filter(([_, isInView]) => isInView)
      .pop();

    if (visibleTool && visibleTool[0] !== currentToolId) {
      setCurrentToolId(visibleTool[0]);
    }
  }, [toolVisibility, currentToolId]);

  return (
    <section className='bg-black'>
      <div className="container mx-auto p-8 mt-16">
        {/* Header Section */}
        <div className="text-center my-32">
          <div
            className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 text-5xl font-spline font-bold pb-8 text-center transition-opacity duration-1000 opacity-100 transform translate-y-0"
          >
            Our AI Tools Suite
          </div>
          <div
            className="text-gray-300 text-xl lg:max-w-[40%] mx-auto font-medium font-spline leading-7 text-center mb-8 transition-opacity duration-1000 opacity-100 transform translate-y-0"
          >
            Revolutionize your creative workflow with ImagineArt AI Tools Suite.
            This suite empowers you with cutting-edge AI technology to generate stunning AI art and captivating videos.
          </div>
        </div>
        <div className="flex">
          <div className="space-y-8 w-full">
            {AiTools.map((tool) => (
              <ToolItem
                key={tool.id}
                tool={tool}
                onVisibilityChange={handleVisibilityChange}
              />
            ))}
          </div>
          {currentToolId && (
            <div className="w-full flex flex-col h-80 px-16 sticky top-64 z-0">
              {AiTools.filter((tool) => tool.id === currentToolId).map((tool) => (
                <div key={tool.id}>
                  <h2 className="text-5xl font-spline font-bold text-white mt-8 mb-4 transition-opacity duration-500 opacity-100 transform translate-y-0">
                    {tool.title}
                  </h2>
                  <p className="text-lg font-thin font-spline text-white mb-16 transition-opacity duration-500 opacity-100 transform translate-y-0">
                    {tool.description}
                  </p>
                  <a
                    href={tool.buttonLink}
                    className="bg-violet-500 text-white px-6 py-4 rounded-lg hover:bg-violet-600 transition-opacity duration-500 opacity-100 transform translate-y-0"
                  >
                    {tool.buttonText}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AITools;
