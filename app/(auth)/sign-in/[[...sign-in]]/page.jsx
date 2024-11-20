"use client";

import React from "react";
import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-red-950 via-gray-900 to-black text-white overflow-hidden flex items-center justify-center relative">
      {/* Enhanced Background Animation */}
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

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(10)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-red-500 opacity-20"
            style={{
              width: Math.random() * 80 + 50, // Random width
              height: Math.random() * 80 + 50, // Random height
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0, // Start invisible
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.2, // Fade in to 20% opacity
            }}
            transition={{
              duration: Math.random() * 10 + 15, // Slow and random speeds
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md p-8 z-10 relative">
        {/* Animated Heading with Staggered Children */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{
              duration: 0.8,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
            className="text-5xl font-extrabold text-center mb-6 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-red-300 to-red-600"
          >
            Welcome Back
          </motion.h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="text-center text-gray-300 mb-8 text-lg"
          >
            Log in to access your account and continue your journey.
          </motion.p>
        </motion.div>

        {/* Animated SignIn Component with Transition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 1.0,
            ease: [0.25, 0.1, 0.25, 1], // Smooth cubic-bezier ease
          }}
          whileHover={{ scale: 1.03 }} // Slight hover effect
          whileTap={{ scale: 0.98 }}
        >
          <SignIn />
        </motion.div>
      </div>
    </section>
  );
}
