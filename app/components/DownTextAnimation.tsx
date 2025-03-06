"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ButtonAnimation from "./ButtonAnimation";

export default function DownTextAnimation() {
  const text: string =
    "Artists can display their masterpieces, and buyers can discover";
  const words: string[] = text.split(" ");

  // This container provides scrollable space.
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress relative to the container.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Increase the overall animation range for a slower (snaky) effect.
  const animationRange: number = 0.8;
  const stagger: number = animationRange / words.length;

  return (
    // A tall container to allow scrolling.
    <div ref={containerRef} className="min-h-[200vh] relative">
      {/* The sticky container pins the text at the top */}
      <div className="sticky top-[40%] h-[50vh] flex items-center justify-center">
        <div className="text-black text-sm font-bold flex gap-2 justify-center flex-wrap">
          {words.map((word: string, index: number) => {
            const start: number = index * stagger;
            const end: number = start + stagger;

            // Animate vertical movement (translateY), opacity, and blur.
            const y = useTransform(scrollYProgress, [start, end], [20, 0]);
            const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
            const blur = useTransform(
              scrollYProgress,
              [start, end],
              ["blur(8px)", "blur(0px)"]
            );

            return (
              <motion.span
                key={index}
                style={{ y, opacity, filter: blur }}
                className="inline-block"
              >
                {word}
              </motion.span>
            );
          })}
        </div>
      </div>
      <ButtonAnimation/>
    </div>
  );
}
