"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

import DownTextAnimation from "./DownTextAnimation";

const ImageAnimation: React.FC = () => {
  const images = [
    "/images/1.webp",
    "/images/2.webp",
    "/images/3.webp",
    "/images/4.webp",
    "/images/5.webp",
    "/images/6.webp",
    "/images/7.webp",
  ];
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Animation occurs as scrollYProgress goes from 0 to 0.5.
  const animationRange: [number, number] = [0, 0.5];

  // Define final horizontal positions for each image.
  const finalXPositions = images.map((_, index) => {
    if (index < 3) {
      const offsets = [-300, -200, -100];
      return offsets[index];
    } else if (index === 3) {
      return 0;
    } else {
      const offsets = [100, 200, 300];
      return offsets[index - 4];
    }
  });

  // Vertical animation: images animate upward from below.
  const initialY = 100;
  // Custom final Y positions for each image.
  const customFinalYPositions = [20, -10, -7, -10, -5, 4, -10];

  // Rotation: All images start at a fixed initial rotation.
  const initialRotation = -15;
  // Custom final rotations for each image.
  const customFinalRotations = [-8, -7, -6, 0, 4, 5, 6];

  return (
    <div ref={containerRef} className="min-h-[250vh] relative">
      <div className="sticky top-0 w-full h-screen">
        {images.map((img, index) => {
          const x = useTransform(scrollYProgress, animationRange, [
            0,
            finalXPositions[index],
          ]);
          const y = useTransform(scrollYProgress, animationRange, [
            initialY,
            customFinalYPositions[index],
          ]);
          const rotation = useTransform(scrollYProgress, animationRange, [
            initialRotation,
            customFinalRotations[index],
          ]);

          // Show tooltip only for image 2 (index 1) and image 7 (index 6)
          let tooltip = null;
          if (index === 1 || index === 6) {
            // The tooltip scales from 0 to 1 as scrollYProgress goes from 0.45 to 0.5.
            const tooltipScale = useTransform(
              scrollYProgress,
              [0.45, 0.5],
              [0, 1]
            );
            const tooltipText = index === 1 ? "Image 2" : "Image 7";

            // Customize tooltip styling based on image index.
            let tooltipClassName =
              "absolute bottom-full left-1/2 whitespace-nowrap -translate-x-1/2 mb-2 bg-blue-600 text-white rounded-3xl";
            if (index === 1) {
              // Bigger tooltip for image 2
              tooltipClassName += " px-4 py-2 text-lg";
            } else {
              // Default tooltip styling for image 7
              tooltipClassName += " px-2 py-1 text-xs";
            }

            // Customize triangle styling based on image index.
            const triangleClassName =
              index === 1
                ? "absolute bottom-[-5] rotate-[-4deg] right-2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-6 border-r-transparent border-t-6 border-t-blue-600"
                : "absolute top-full left-4 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-blue-600";

            tooltip = (
              <motion.div
                style={{ scale: tooltipScale }}
                className={tooltipClassName}
              >
                {tooltipText}
                <span className={triangleClassName}></span>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={index}
              style={{ x, y, rotate: rotation, zIndex: index === 6 ? 10 : 0 }}
              className="absolute top-1/2 left-1/2 w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-lg"
            >
              <Image
                src={img}
                alt={`Image ${index + 1}`}
                width={150}
                height={150}
                className="object-cover rounded-lg"
              />
              {tooltip}
            </motion.div>
          );
        })}
      </div>
      <DownTextAnimation />
    </div>
  );
};

export default ImageAnimation;
