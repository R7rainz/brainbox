"use client";
import React from "react";
import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-red-950 via-gray-900 to-black text-white overflow-hidden flex items-center justify-center relative">
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

      <div className="w-full max-w-md p-8 z-10">
        {/* Animated Heading */}
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
            Create Your Account
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
            Sign up to access your account and start collaborating!
          </motion.p>
        </motion.div>

        {/* SignUp Component with Hover Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{
            duration: 0.6,
            delay: 1.0,
            ease: "easeOut",
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <SignUp />
        </motion.div>
      </div>

      {/* Floating Particles */}
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-red-500 opacity-20"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
          }}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}
    </section>
  );
}
