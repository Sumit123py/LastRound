"use client";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import ButtonAnimation from "./ButtonAnimation";

// Extracted AnimatedWord component so hooks are called at top level.
function AnimatedWord({
  word,
  start,
  end,
  scrollYProgress,
}: {
  word: string;
  start: number;
  end: number;
  scrollYProgress: MotionValue<number>;
}) {
  const y = useTransform(scrollYProgress, [start, end], [20, 0]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const blur = useTransform(
    scrollYProgress,
    [start, end],
    ["blur(8px)", "blur(0px)"]
  );

  return (
    <motion.span style={{ y, opacity, filter: blur }} className="inline-block">
      {word}
    </motion.span>
  );
}

export default function DownTextAnimation() {
  const text =
    "Artists can display their masterpieces, and buyers can discover";
  const words = text.split(" ");

  // This container provides scrollable space.
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress relative to the container.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Increase the overall animation range for a slower (snaky) effect.
  const animationRange = 0.8;
  const stagger = animationRange / words.length;

  return (
    // A tall container to allow scrolling.
    <div ref={containerRef} className="min-h-[200vh] relative">
      {/* The sticky container pins the text at the top */}
      <div className="sticky top-[40%] h-[50vh] flex items-center justify-center">
        <div className="text-black text-sm font-bold flex gap-2 justify-center flex-wrap">
          {words.map((word, index) => {
            const start = index * stagger;
            const end = start + stagger;
            return (
              <AnimatedWord
                key={index}
                word={word}
                start={start}
                end={end}
                scrollYProgress={scrollYProgress}
              />
            );
          })}
        </div>
      </div>
      <ButtonAnimation />
    </div>
  );
}
