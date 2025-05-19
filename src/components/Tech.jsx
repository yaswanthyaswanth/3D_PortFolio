import React, { useEffect } from "react";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  useEffect(() => {
    technologies.forEach((tech) => {
      const img = new Image();
      img.src = tech.icon;
      img.onerror = () => console.error(`Failed to preload icon: ${tech.name}, URL: ${tech.icon}`);
      img.onload = () => console.log(`Preloaded icon: ${tech.name}`);
    });
  }, []);

  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology) => (
        <div className='w-28 h-28' key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");