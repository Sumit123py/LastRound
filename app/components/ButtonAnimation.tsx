"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ButtonAnimation() {
  // This container provides scrollable space.
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress relative to the container.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Define the scroll range for the button's animation.
  const start = 0;
  const end = 0.4;

  // Define a delay for the "Read More" button's animation.
  const delay = 0.6;

  // Animate vertical movement (translateY), opacity, and blur for the Join button.
  const y = useTransform(scrollYProgress, [start, end], [20, 0]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const blur = useTransform(scrollYProgress, [start, end], ["blur(8px)", "blur(0px)"]);

  // Animate the Read More button with a delay by shifting its animation range.
  const yDelayed = useTransform(scrollYProgress, [start + delay, end + delay], [20, 0]);
  const opacityDelayed = useTransform(scrollYProgress, [start + delay, end + delay], [0, 1]);
  const blurDelayed = useTransform(scrollYProgress, [start + delay, end + delay], ["blur(8px)", "blur(0px)"]);

  return (
    // A tall container to allow scrolling.
    <div ref={containerRef} className="min-h-[200vh] relative">
      {/* The sticky container pins the buttons in view */}
      <div className="sticky w-full top-[50%] flex items-center justify-center h-[50vh] gap-18">
        <motion.button
          style={{ y, opacity, filter: blur }}
          className="bg-black text-white py-2 px-4 rounded-2xl text-sm font-bold"
        >
          Join for $9.99
        </motion.button>
        <motion.button
          style={{ y: yDelayed, opacity: opacityDelayed, filter: blurDelayed }}
          className="bg-gray-300 text-black py-2 px-4 rounded-2xl text-sm font-bold"
        >
          Read More
        </motion.button>
      </div>
    </div>
  );
}
