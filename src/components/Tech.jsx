import React, { useEffect, useState } from "react";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const totalImages = technologies.length;

    technologies.forEach((tech) => {
      const img = new Image();
      img.src = tech.icon;
      img.onerror = () => {
        console.error(`Failed to preload icon: ${tech.name}, URL: ${tech.icon}`);
        loadedCount++;
        if (loadedCount === totalImages) setLoaded(true);
      };
      img.onload = () => {
        console.log(`Preloaded icon: ${tech.name}`);
        loadedCount++;
        if (loadedCount === totalImages) setLoaded(true);
      };
    });
  }, []);

  if (!loaded) return null;

  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology) => (
        <div className='w-28 text-center' key={technology.name}>
          <div className='w-28 h-28'>
            <BallCanvas icon={technology.icon} />
          </div>
          <div className='mt-2'>
            <p className='text-white text-sm font-medium'>{technology.name}</p>
            <div className='mt-1 w-full bg-gray-700 rounded-full h-2'>
              <div
                className='bg-tertiary h-2 rounded-full transition-all duration-500'
                style={{ width: `${technology.percentage}%` }}
              ></div>
            </div>
            <p className='text-secondary text-xs mt-1'>{technology.percentage}%</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");