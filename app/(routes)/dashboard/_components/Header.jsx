"use client"

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { PlusCircle, Search } from 'lucide-react'
import Link from 'next/link'

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = useCallback((e) => {
    const term = e.target.value
    setSearchTerm(term)
    onSearch(term)
  }, [onSearch])

  return (
    <motion.header 
      className="bg-gray-900/50 backdrop-blur-md border-b border-gray-800 py-4 px-8 flex items-center justify-between"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-4">
        <motion.div
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          BrainBox
        </motion.div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="bg-gray-800 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/createworkspace">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-transparent text-blue-400 border-blue-500 hover:bg-blue-950 hover:text-blue-300"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Workspace
          </Button>
        </Link>
        <UserButton afterSignOutUrl="/" />
      </div>
    </motion.header>
  )
}

export default Header

