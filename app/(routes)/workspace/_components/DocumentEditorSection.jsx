"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import DcoumentHeader from './DcoumentHeader'
import DocumentInfo from './DocumentInfo'
import RichDocumentEditor from './RichDocumentEditor'
import CommentBox from './CommentBox'

function DocumentEditorSection({ params }) {
  const [openComment, setOpenComment] = useState(false)

  return (
    <motion.div 
      className='relative min-h-screen bg-gray-900 text-gray-100'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <DcoumentHeader />

      {/* Document Info */}
      <DocumentInfo params={params} />

      {/* Rich Text Editor */}
      <div className="p-4">
        <RichDocumentEditor params={params} />
      </div>

      {/* Comment Button and Box */}
      <div className='fixed right-10 bottom-10 z-50'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setOpenComment(!openComment)}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg"
                size="icon"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={openComment ? 'close' : 'open'}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {openComment ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
                  </motion.div>
                </AnimatePresence>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{openComment ? 'Close comments' : 'Open comments'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <AnimatePresence>
          {openComment && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 right-0"
            >
              <CommentBox />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Glowing orb effect */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full filter blur-[128px] opacity-10 pointer-events-none" />
    </motion.div>
  )
}

export default DocumentEditorSection

