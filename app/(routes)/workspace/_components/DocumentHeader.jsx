"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function DocumentHeader() {
  return (
    <motion.div 
      className='flex justify-between items-center p-4 bg-gray-900 border-b border-gray-800'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-1">
        {/* You can add a logo or title here if needed */}
      </div>
      
      <div className="flex items-center space-x-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <OrganizationSwitcher 
            appearance={{
              elements: {
                rootBox: "bg-gray-800 border-gray-700",
                organizationSwitcherTrigger: "text-gray-300 hover:text-white",
              }
            }}
          />
        </motion.div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  className="bg-blue-600 hover:bg-blue-700 text-white border-blue-500"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share this document</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
                userButtonPopoverCard: "bg-gray-800 border border-gray-700",
                userButtonPopoverText: "text-gray-300",
              }
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default DocumentHeader

