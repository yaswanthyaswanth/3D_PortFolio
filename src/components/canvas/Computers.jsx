import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      {/* Ambient Light: Baseline illumination for transparent textures */}
      <ambientLight intensity={0.0} color="#ffffff" />
      {/* Key Light: Strong directional light from right corner, top-down */}
      <spotLight
        position={[20, 50, 10]}
        angle={0.2}
        penumbra={0.8}
        intensity={1.5}
        castShadow
        shadow-mapSize={1024}
        color="#ffffff"
      />
      {/* Fill Light: Soft, even lighting to reduce shadows */}
      <spotLight
        position={[-10, 20, 15]}
        angle={0.4}
        penumbra={1}
        intensity={1.0}
        color="#ffffff"
      />
      {/* Back Light: Subtle rim effect for depth */}
      <pointLight
        position={[0, 15, -15]}
        intensity={1.0}
        color="#ffffff"
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.6 : 0.75}
        position={isMobile ? [0, -4, -2.2] : [0, -5, -1.5]}
        rotation={[-0.01, -0.8, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true, alpha: true }}
      className="touch-pinch-zoom"
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          minDistance={10}
          maxDistance={50}
          autoRotate={true}
          autoRotateSpeed={2.0}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;