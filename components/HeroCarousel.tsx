"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import LogoTipo from "./LogoTipo";
import { ChevronDown } from "lucide-react";

const getHeroImage = (num: number) => {
  const baseUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.replace(/\/$/, '') || '';
  return `${baseUrl}/hero/hero${num}.jpg`;
};

const images = [
  getHeroImage(1),
  getHeroImage(2),
  getHeroImage(3),
  getHeroImage(4),
  getHeroImage(5),
  getHeroImage(6),
  getHeroImage(7),
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

interface Settings {
  slogan?: string
}

export default function HeroCarousel({ settings }: { settings?: Settings }) {
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

      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center pointer-events-none text-white text-center w-[90vw] px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 0.5 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-4 drop-shadow-lg"
        >
          <LogoTipo
            light={true}
            sizeMain="text-4xl sm:text-5xl md:text-6xl"
            sizeSub="text-[1.2rem] sm:text-xl md:text-2xl"
          />
        </motion.div>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-lg md:text-2xl font-body font-light tracking-wide drop-shadow-md"
        >
          {settings?.slogan || 'Seja seu próprio padrão de beleza'}
        </motion.p>
      </div>

      <motion.a
        href="#servicos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        whileHover={{ opacity: 1, scale: 1.05 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center justify-center cursor-pointer text-white pointer-events-auto select-none"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={18} className="text-white/60" />
        </motion.div>
      </motion.a>
    </div>
  );
}
