"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Header from './_components/Header'
import WorkspaceList from './_components/WorkspaceList'
import { Sparkles } from 'lucide-react'

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  return (
    <div className="bg-gray-950 min-h-screen text-white relative overflow-hidden">
      {/* Futuristic grid background */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-[128px] opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-teal-500 rounded-full filter blur-[96px] opacity-20"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

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

      <Header onSearch={handleSearch} />
      <motion.div
        className="p-10 md:px-24 lg:px-36 xl:px-52 mt-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400">
          Your Workspaces
        </h1>
        <WorkspaceList searchTerm={searchTerm} />
      </motion.div>

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
    </div>
  )
}

export default Dashboard

