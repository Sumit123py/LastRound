"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ImageAnimation from "./ImageAnimation";

export default function TextAnimation() {
  const text = "A place to display your masterpiece";
  const words = text.split(" ");

  // This container provides scrollable space.
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress relative to the container.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate a stagger value so the last word completes at 20% scroll.
  const stagger = 0.4 / words.length; // e.g., for 6 words, each gets ~0.0333

  return (
    // A tall container to allow scrolling.
    <div ref={containerRef} className="min-h-[200vh] relative flex flex-col items-center">
      {/* The sticky container pins the text at the top */}
      <div className="sticky top-[0%] h-[50vh] w-[80%] lg:w-[60%]  flex text-center  items-center justify-center">
        <div className="text-black text-6xl font-bold flex gap-2 justify-center flex-wrap">
          {words.map((word, index) => {
            // Calculate each word's animation range so that the last word ends at scrollYProgress = 0.2
            const start = index * stagger;
            const end = start + stagger;

            // Animate vertical movement (translateY) from 10 to 0 and opacity from 0 to 1
            const y = useTransform(scrollYProgress, [start, end], [10, 0]);
            const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

            return (
              <motion.span
                key={index}
                style={{ y, opacity }}
                className="inline-block"
              >
                {word}
              </motion.span>
            );
          })}
        </div>
      </div>
      <ImageAnimation/>
    </div>
  );
}
