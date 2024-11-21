"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"

function WorkspaceItemList({workspaceList}) {
  const router = useRouter();
  
  const OnClickWorkspaceItem = (workspaceId) => {
    router.push('/workspace/' + workspaceId)
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
      {workspaceList && workspaceList.map((workspace, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => OnClickWorkspaceItem(workspace.id)}
        >
          <Card className="overflow-hidden bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:bg-gray-700/50 transition-all cursor-pointer shadow-lg rounded-lg">
            <div className="relative h-[150px]">
              <Image 
                src={workspace?.coverImage} 
                layout="fill"
                objectFit="cover"
                alt='cover'
                className='rounded-t-lg'
              />
            </div>
            <div className='p-4 bg-gray-900 rounded-b-lg'>
              <h2 className='flex items-center gap-2 text-white font-semibold'>
                <span>{workspace?.emoji}</span>
                <span>{workspace.workspaceName}</span>
              </h2>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

export default WorkspaceItemList

