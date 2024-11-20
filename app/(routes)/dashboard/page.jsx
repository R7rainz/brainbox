"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Header from './_components/Header'
import WorkspaceList from './_components/WorkspaceList'
import { Star } from 'lucide-react'

const Dashboard = () => {
  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-cyan-900 min-h-screen text-white relative overflow-hidden">
      {/* Animated stars */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Glowing constellation */}
      <motion.div
        className="absolute top-1/4 right-1/4 opacity-20"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Star className="text-cyan-400 w-32 h-32" />
      </motion.div>

      <Header />
      <motion.div
        className="p-10 md:px-24 lg:px-36 xl:px-52 mt-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-200">
          Your Workspaces
        </h1>
        <WorkspaceList />
      </motion.div>

      {/* Glowing orb */}
      <motion.div
        className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-cyan-500 filter blur-3xl opacity-10"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  )
}

export default Dashboard