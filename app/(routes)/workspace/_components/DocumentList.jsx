"use client"

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { deleteDoc, doc } from 'firebase/firestore'
import { toast } from 'sonner'
import { File, Trash2 } from 'lucide-react'

import { db } from '@/config/firebaseConfig'
import DocumentOptions from './DocumentOptions'
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function DocumentList({ documentList, params }) {
    const router = useRouter()
    const [hoveredDoc, setHoveredDoc] = useState(null)

    const DeleteDocument = async (docId) => {
        try {
            await deleteDoc(doc(db, "workspaceDocuments", docId))
            toast('Document Deleted!', {
                description: "The document has been successfully removed.",
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            })
        } catch (error) {
            console.error("Error deleting document: ", error)
            toast('Error Deleting Document', {
                description: "An error occurred while deleting the document. Please try again.",
                variant: "destructive",
            })
        }
    }

    return (
        <AnimatePresence>
            {documentList.map((doc, index) => (
                <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    onClick={() => router.push(`/workspace/${params?.workspaceid}/${doc?.id}`)}
                    onMouseEnter={() => setHoveredDoc(doc.id)}
                    onMouseLeave={() => setHoveredDoc(null)}
                    className={`mt-3 p-2 px-3 rounded-lg cursor-pointer flex justify-between items-center
                        ${doc?.id === params?.documentid 
                            ? 'bg-gray-800 text-white' 
                            : 'hover:bg-gray-800 text-gray-300 hover:text-white'
                        } transition-all duration-200`}
                >
                    <div className='flex gap-2 items-center'>
                        {!doc.emoji ? (
                            <File className="h-5 w-5 text-blue-400" />
                        ) : (
                            <span className="text-lg">{doc.emoji}</span>
                        )}
                        <h2 className='flex gap-2 truncate max-w-[150px]'>{doc.documentName}</h2>
                    </div>
                    <AnimatePresence>
                        {hoveredDoc === doc.id && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.1 }}
                                className="flex items-center"
                            >
                                <DocumentOptions doc={doc} deleteDocument={DeleteDocument} />
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    DeleteDocument(doc.id)
                                                }}
                                                className="ml-2 text-gray-400 hover:text-red-400"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">Delete document</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Delete document</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </AnimatePresence>
    )
}

export default DocumentList

