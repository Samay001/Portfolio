"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
  onActiveColorChange,
}: {
  content: {
    title: string;
    subHeading?: string;
    timeFrame?: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
  onActiveColorChange?: (activeColor: string) => void;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  const backgroundColors = ["var(--black)"];
  const linearGradients = [
    "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
    "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
    "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
  ];

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  useEffect(() => {
    const activeColor = backgroundColors[activeCard % backgroundColors.length];
    onActiveColorChange?.(activeColor);
  }, [activeCard, backgroundColors, onActiveColorChange]);

  return (
    <motion.div
      animate={{
        backgroundColor:
          backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-[30rem] overflow-y-auto flex justify-center relative space-x-20 rounded-md p-10 hide-scrollbar"
      ref={ref}
    >
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-4xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              {item.subHeading && (
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                  className="text-lg text-slate-400 mt-2"
                >
                  {item.subHeading}
                </motion.h3>
              )}
              {item.timeFrame && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                  className="text-lg text-slate-400 mt-1"
                >
                  {item.timeFrame}
                </motion.p>
              )}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-xl text-slate-300 max-w-sm mt-6"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        style={{ background: linearGradients[activeCard % linearGradients.length] }}
        className={cn(
          "hidden lg:block h-80 w-96 rounded-md bg-white sticky top-10 overflow-hidden",
          contentClassName
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};
