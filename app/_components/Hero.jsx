'use client'

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronRight, Zap, Brain, Users, Layers, Sparkles, Lock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const FuturisticHeroWithFeatures = () => {
  const featuresRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: featuresRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const features = [
    { icon: Layers, title: "Workspace View", description: "Organize your thoughts with customizable layouts and nested pages." },
    { icon: Brain, title: "AI Support", description: "Get intelligent suggestions and automate note-taking tasks with advanced AI." },
    { icon: Users, title: "Collaborative", description: "Work together in real-time with team members on shared projects and notes." },
    { icon: Sparkles, title: "Smart Tagging", description: "Automatically categorize and link related notes for easy retrieval." },
    { icon: Lock, title: "Secure Encryption", description: "Keep your ideas safe with end-to-end encryption and secure cloud storage." },
    { icon: Zap, title: "Instant Sync", description: "Access your notes across all devices with lightning-fast synchronization." },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Futuristic grid background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </motion.div>

      {/* Glowing orb */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-[128px] opacity-20 animate-pulse"
        style={{ opacity }}
      />

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <Card className="max-w-4xl bg-gray-900/30 backdrop-blur-md border-gray-800 overflow-hidden">
          <div className="relative p-8">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-blue-500 opacity-50" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-blue-500 opacity-50" />

            {/* Main Heading */}
            <motion.h1
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              BrainBox: Elevate Your
              <br />
              Note-Taking Experience
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="mt-6 text-lg text-gray-300 sm:text-xl max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Harness the power of cutting-edge AI to streamline your note-taking, boost productivity, and unlock your creative potential.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="mt-10 flex flex-wrap justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 rounded-md shadow-lg shadow-blue-500/50 transition-all duration-300 group"
                onClick={() => window.location.href = '/dashboard'}
              >
                <span>Get Started</span>
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent text-blue-400 border-blue-500 hover:bg-blue-950 hover:text-blue-300 text-lg px-8 py-6 rounded-md shadow-lg shadow-blue-500/30 transition-all duration-300"
                onClick={scrollToFeatures}
              >
                Explore Features
              </Button>
            </motion.div>
          </div>
        </Card>
      </div>

      {/* Features Section */}
      <div ref={featuresRef} className="min-h-screen bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-blue-400">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <motion.div 
                  className="p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Animated circuit lines */}
      <svg className="absolute inset-0 z-0" width="100%" height="100%">
        <motion.path
          d="M0 100 Q 250 50 500 100 T 1000 100"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default FuturisticHeroWithFeatures

