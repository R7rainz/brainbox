"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Hero() {
  const [floatingObjects, setFloatingObjects] = useState([]);

  useEffect(() => {
    // Ensure window is accessible only in the browser
    if (typeof window !== "undefined") {
      const objects = [...Array(7)].map((_, index) => ({
        key: index,
        width: Math.random() * 100 + 50,
        height: Math.random() * 100 + 50,
        initialX: Math.random() * window.innerWidth,
        initialY: Math.random() * window.innerHeight,
        animateX: Math.random() * window.innerWidth,
        animateY: Math.random() * window.innerHeight,
        duration: Math.random() * 10 + 20,
      }));
      setFloatingObjects(objects);
    }
  }, []);

  return (
    <div
      className="relative min-h-screen bg-gradient-to-br from-red-950 via-gray-900 to-black text-white overflow-hidden flex items-center justify-center"
      id="home"
    >
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-800 to-red-950 opacity-30 blur-2xl"
        initial={{ scale: 1.1, rotate: 0 }}
        animate={{ scale: 1.2, rotate: 5 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-l from-gray-900 to-black opacity-40 blur-3xl"
        initial={{ scale: 1.2, rotate: -5 }}
        animate={{ scale: 1.1, rotate: 0 }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Floating Random Objects */}
      {floatingObjects.map((obj) => (
        <motion.div
          key={obj.key}
          className="absolute rounded-full bg-red-500 opacity-20 z-0"
          style={{
            width: obj.width,
            height: obj.height,
          }}
          initial={{
            x: obj.initialX,
            y: obj.initialY,
          }}
          animate={{
            x: obj.animateX,
            y: obj.animateY,
          }}
          transition={{
            duration: obj.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}

      {/* Hero Content */}
      <div className="relative z-10">
        <div className="lg:w-2/3 text-center mx-auto">
          {/* Animated Heading */}
          <motion.h1
            className="text-white font-extrabold text-5xl md:text-6xl xl:text-7xl tracking-wide"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
          >
            BrainBox is where{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-300 to-red-600">
              work happens, in sync.
            </span>
          </motion.h1>

          {/* Animated Subheading */}
          <motion.p
            className="mt-8 text-gray-400 text-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.5,
              ease: "easeOut",
            }}
          >
            Microsoft Loop is a collaborative workspace that lets teams create,
            share, and work together on projects seamlessly. It combines flexible
            pages with reusable components that sync across different apps,
            making it easy to stay organized and up-to-date.
          </motion.p>

          {/* Buttons with Hover Effects */}
          <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
            <motion.a
              href="/dashboard"
              className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-red-500 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 1,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="relative text-base font-semibold text-white">
                Get started
              </span>
            </motion.a>
            <motion.a
              href="#"
              className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-red-500/10 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 1.2,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="relative text-base font-semibold text-red-400">
                Learn more
              </span>
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
