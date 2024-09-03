import React, { useState, useEffect ,useCallback} from 'react';
import { motion } from 'framer-motion';
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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 overflow-hidden z-10"
    >
      <div>
        <video
          className="w-full h-full mt-36 rounded-xl"
          src={tool.videoUrl}
          autoPlay
          loop
          muted
          playsInline
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </motion.div>
  );
};

const AITools = () => {
  const [currentToolId, setCurrentToolId] = useState(null);
  const [toolVisibility, setToolVisibility] = useState(new Map());
  const [AiTools, setAITools] = useState([]);

  // Use useCallback to memoize the handler
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
    // Determine the most recent visible tool
    const visibleTool = [...toolVisibility.entries()]
      .filter(([_, isInView]) => isInView)
      .pop();

    // Only update state if there's a new visible tool or it has changed
    if (visibleTool && visibleTool[0] !== currentToolId) {
      setCurrentToolId(visibleTool[0]);
    }
  }, [toolVisibility, currentToolId]); // Added currentToolId as a dependency

  return (
    <section className='bg-black'>
      <div className="container mx-auto p-8 ">
        {/* Header Section */}
        <div className="text-center my-32">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 text-5xl font-spline font-bold pb-8 text-center"
          >
            Our AI Tools Suite
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-gray-300 text-xl lg:max-w-[40%] mx-auto font-medium font-spline leading-7 text-center mb-8"
          >
            Revolutionize your creative workflow with ImagineArt AI Tools Suite.
            This suite empowers you with cutting-edge AI technology to generate stunning AI art and captivating videos.
          </motion.div>
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
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-full flex flex-col h-80 px-16 sticky top-64 z-0"
            >
              {AiTools.filter((tool) => tool.id === currentToolId).map((tool) => (
                <div key={tool.id}>
                  <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="text-5xl font-spline font-bold text-white mt-8 mb-4"
                  >
                    {tool.title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="text-lg font-thin font-spline text-white mb-16"
                  >
                    {tool.description}
                  </motion.p>
                  <motion.a
                    href={tool.buttonLink}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="bg-violet-500 text-white px-6 py-4 rounded-lg hover:bg-violet-600"
                  >
                    {tool.buttonText}
                  </motion.a>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AITools; 