'use client'

import React, { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { Sparkles } from 'lucide-react'

const SpaceHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const backgroundControls = useAnimation()

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    backgroundControls.start({
      backgroundPosition: `${mousePosition.x / 50}px ${mousePosition.y / 50}px`,
    })
  }, [mousePosition, backgroundControls])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={backgroundControls}
        initial={false}
        style={{
          background:
            "radial-gradient(circle at center, rgba(100,100,255,0.1) 0%, rgba(100,100,255,0) 70%)",
          backgroundSize: "400% 400%",
        }}
      />

      {/* Floating Particles */}
      {[...Array(50)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-white opacity-20"
          style={{
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
          }}
          animate={{
            x: [0, Math.random() * window.innerWidth],
            y: [0, Math.random() * window.innerHeight],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}

      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          {/* Main Heading */}
          <motion.h1
            className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl md:text-7xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            BrainBox: Explore Your
            <br />
            <span className="mt-2 inline-block">Digital Universe</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="mt-6 text-lg text-gray-400 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            Seamlessly organize your thoughts, projects, and ideas in one interconnected space.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          >
            <motion.a
              href="/dashboard"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-indigo-600 px-8 py-3 text-white shadow-2xl transition duration-300 ease-out hover:ring-2 hover:ring-indigo-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 h-full w-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600"></span>
              <span className="ease absolute bottom-0 right-0 mb-32 mr-4 block h-64 w-64 origin-bottom-left translate-x-24 rotate-45 transform rounded-full bg-pink-500 opacity-30 transition duration-500 group-hover:rotate-90"></span>
              <span className="relative text-sm font-bold">Get Started</span>
            </motion.a>
            <motion.a
              href="#"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-indigo-600 px-8 py-3 text-indigo-600 shadow-2xl transition duration-300 ease-out hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="ease absolute inset-0 h-full w-full translate-y-32 bg-indigo-600 transition duration-300 group-hover:translate-y-0"></span>
              <span className="relative text-sm font-bold transition duration-300 group-hover:text-white">
                Learn More
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Animated Glow Effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent" />
      </motion.div>

      {/* Floating Icon */}
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
    </div>
  )
}

export default SpaceHero  