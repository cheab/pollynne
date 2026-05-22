"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import LogoTipo from "./LogoTipo";

const images = [
  "/hero/hero1.jpg",
  "/hero/hero2.jpg",
  "/hero/hero3.jpg",
  "/hero/hero4.jpg",
  "/hero/hero5.jpg",
  "/hero/hero6.jpg",
  "/hero/hero7.jpg",
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 1.05,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: 0,
      opacity: 0,
      scale: 1,
    };
  },
};

export default function HeroCarousel() {
  const [[page, direction], setPage] = useState([0, 0]);

  // Infinite carousel logic
  const imageIndex = Math.abs(page % images.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 6000); // changes every 6 seconds

    return () => clearInterval(interval);
  }, [page]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { duration: 1.8, ease: [0.25, 0.1, 0.25, 1] },
            opacity: { duration: 1.8, ease: "easeInOut" },
            scale: { duration: 1.8, ease: "easeInOut" },
          }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={images[imageIndex]}
            alt="Pollynne Beauty Hero"
            fill
            className="object-cover object-[center_15%] md:object-[center_20%]"
            priority
          />
          {/* Overlay gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center pointer-events-none text-white text-center w-[90vw] px-4 md:top-[22%] md:bottom-auto md:left-auto md:right-[8%] md:translate-x-0 md:items-end md:text-right md:w-max">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 0.95 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-6 drop-shadow-lg"
        >
          <LogoTipo 
            light={true} 
            sizeMain="text-5xl sm:text-6xl md:text-7xl" 
            sizeSub="text-[1.5rem] sm:text-2xl md:text-3xl" 
          />
        </motion.div>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-xl md:text-3xl font-body font-light tracking-wide drop-shadow-md"
        >
          Seja seu próprio padrão de beleza
        </motion.p>
      </div>
    </div>
  );
}
