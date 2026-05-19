"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const images = [
  "/hero/hero1.png",
  "/hero/hero2.png",
  "/hero/hero3.png",
  "/hero/hero4.png",
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? "5%" : "-5%",
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
      x: direction < 0 ? "5%" : "-5%",
      opacity: 0,
      scale: 0.95,
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
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 1.2, ease: "easeInOut" },
            scale: { duration: 1.2, ease: "easeInOut" },
          }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={images[imageIndex]}
            alt="Pollynne Beauty Hero"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none text-white text-center px-4">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-7xl font-light tracking-widest mb-4"
        >
          POLLYNNE
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-lg md:text-2xl font-light tracking-wider"
        >
          ELEVATING BEAUTY TO ART
        </motion.p>
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-sm transition-colors text-white"
        onClick={() => paginate(-1)}
      >
        <ChevronLeft size={32} strokeWidth={1.5} />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-sm transition-colors text-white"
        onClick={() => paginate(1)}
      >
        <ChevronRight size={32} strokeWidth={1.5} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              const dir = idx > imageIndex ? 1 : -1;
              if (idx !== imageIndex) {
                setPage([page + (idx - imageIndex), dir]);
              }
            }}
            className={`w-12 h-1 transition-all duration-300 ${
              idx === imageIndex ? "bg-white" : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
