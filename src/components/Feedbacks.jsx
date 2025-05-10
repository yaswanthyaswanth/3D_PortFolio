// components/ImageComparison.jsx
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const imageComparisons = [
  { 
    title: "M762 Gun Model",
    description: "#Blender #substance",
    beforeImage: "before1.jpg",
    afterImage: "after1.jpg"
  },
  {
    title: "(Ref)Dragon Booster",
    description: "#Blender #ToonShader",
    beforeImage: "before2.jpg",
    afterImage: "after2.jpg"
  },
  {
    title: "Forklift Truck",
    description: "#Blender #substance",
    beforeImage: "before3.jpg",
    afterImage: "after3.jpg"
  },
  {
    title: "WOODEN_WAGON",
    description: "#Blender",
    beforeImage: "before4.jpg",
    afterImage: "after4.jpg"
  },
  // Add more comparisons if needed
];

const ImageComparison = () => {
  const [sliderPositions, setSliderPositions] = useState(
    imageComparisons.map(() => 50)
  );
  const containerRefs = useRef([]);

  const handleSliderStart = (index, clientX) => {
    const container = containerRefs.current[index];
    if (!container) return;
  
    const handleMove = (moveClientX) => {
      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(moveClientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
  
      setSliderPositions((prev) => {
        const newPositions = [...prev];
        newPositions[index] = percentage;
        return newPositions;
      });
    };
  
    const handleMouseMove = (e) => handleMove(e.clientX);
    const handleTouchMove = (e) => handleMove(e.touches[0].clientX);
  
    const handleEnd = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleEnd);
  };
  
  const handleMouseDown = (index, e) => {
    e.preventDefault();
    handleSliderStart(index, e.clientX);
  };
  
  const handleTouchStart = (index, e) => {
    handleSliderStart(index, e.touches[0].clientX);
  };
  

  return (
    <div className={`mt-12 bg-black-100 rounded-[20px]`}>
      <div className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>My Work</p>
          <h2 className={styles.heroSubText}>Hard surface & Organic Modeling</h2>
        </motion.div>
      </div>
      <div className={`-mt-20 pb-14 ${styles.paddingX} grid md:grid-cols-2 gap-8`}>
        {imageComparisons.map((comparison, index) => (
          <div key={index} className="bg-black-200 p-5 rounded-3xl">
            <div 
              className="relative w-full h-[400px] rounded-xl overflow-hidden"
              ref={el => containerRefs.current[index] = el}
            >
              {/* Before Image (full width) */}
              <img
                src={`/images/${comparison.beforeImage}`}
                alt={`Before ${comparison.title}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* After Image (clipped based on slider position) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPositions[index]}%` }}
              >
                <img
                  src={`/images/${comparison.afterImage}`}
                  alt={`After ${comparison.title}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Slider Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
                style={{ left: `${sliderPositions[index]}%` }}
                onMouseDown={(e) => handleMouseDown(index, e)}
              >
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-5 h-10 bg-white rounded-full flex items-center justify-center">
                  <div className="w-1 h-5 bg-gray-800"></div>
                </div>
              </div>
              
              {/* Position Indicator */}
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded-md text-sm">
                {Math.round(sliderPositions[index])}%
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-white font-medium text-lg">{comparison.title}</h3>
              <p className="text-secondary text-sm mt-1">{comparison.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(ImageComparison, "comparison");