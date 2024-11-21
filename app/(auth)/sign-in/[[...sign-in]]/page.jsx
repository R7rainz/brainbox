"use client";

import React from "react";
import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Sparkles } from 'lucide-react';
import { Card } from "@/components/ui/card";

export default function SignInPage() {
  return (
    <section className="min-h-screen bg-black text-white overflow-hidden flex items-center justify-center relative">
      {/* Futuristic grid background */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Glowing orb */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-[128px] opacity-20 animate-pulse" />

      {/* Random glowy lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-0.5 w-24 bg-gradient-to-r from-blue-400 to-teal-400 opacity-30"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            rotate: `${Math.random() * 360}deg`,
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      <Card className="w-full max-w-md p-8 z-10 bg-gray-900/30 backdrop-blur-md border-gray-800">
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
            className="text-4xl font-bold text-center mb-6 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400"
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

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 1.0,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <SignIn />
        </motion.div>
      </Card>

      {/* Floating icon */}
      <motion.div
        className="absolute bottom-10 right-10 text-blue-400"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <Sparkles className="h-12 w-12" />
      </motion.div>
    </section>
  );
}

