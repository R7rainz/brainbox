"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { toast } from 'sonner'
import { SmilePlus } from 'lucide-react'

import CoverPicker from '@/app/_components/CoverPicker'
import EmojiPickerComponent from '@/app/_components/EmojiPickerComponent'
import { db } from '@/config/firebaseConfig'
import { Input } from "@/components/ui/input"

function DocumentInfo({ params, updateDocumentInfo }) {
    const [coverImage, setCoverImage] = useState('/cover.png')
    const [emoji, setEmoji] = useState()
    const [documentInfo, setDocumentInfo] = useState()
    
    useEffect(() => {
        if (params?.documentid) GetDocumentInfo()
    }, [params])

    const GetDocumentInfo = async () => {
        try {
            const docRef = doc(db, 'workspaceDocuments', params.documentid)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                setDocumentInfo(docSnap.data())
                setEmoji(docSnap.data()?.emoji)
                docSnap.data()?.coverImage && setCoverImage(docSnap.data()?.coverImage)
            } else {
                console.log("No such document!")
            }
        } catch (error) {
            console.error("Error fetching document:", error)
            toast.error('Failed to fetch document info')
        }
    }

    const handleUpdateDocumentInfo = async (key, value) => {
        try {
            const docRef = doc(db, 'workspaceDocuments', params.documentid)
            await updateDoc(docRef, {
                [key]: value
            })

            if (typeof updateDocumentInfo === 'function') {
                updateDocumentInfo(key, value)
            }

            toast.success('Document Updated!', {
                description: `Successfully updated ${key}.`,
            })
        } catch (error) {
            console.error("Error updating document:", error)
            toast.error('Failed to update document')
        }
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 text-gray-100"
        >
            {/* Cover Picker */}
            <CoverPicker setNewCover={(cover) => {
                setCoverImage(cover)
                handleUpdateDocumentInfo('coverImage', cover)
            }}>
                <div className='relative group cursor-pointer overflow-hidden'>
                    <motion.div 
                        className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className="text-white font-medium">Change Cover</span>
                    </motion.div>
                    <Image 
                        src={coverImage} 
                        width={1200} 
                        height={400}
                        className='w-full h-[200px] object-cover transition-opacity duration-300 group-hover:opacity-75'
                        alt="Document cover"
                    />
                </div>
            </CoverPicker>

            {/* Emoji Picker */}
            <div className='absolute left-8 top-[180px]'>
                <EmojiPickerComponent
                    setEmojiIcon={(emoji) => {
                        setEmoji(emoji)
                        handleUpdateDocumentInfo('emoji', emoji)
                    }}
                >
                    <motion.div 
                        className='bg-gray-800 p-4 rounded-full shadow-lg'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {emoji ? (
                            <span className='text-5xl'>{emoji}</span>
                        ) : (
                            <SmilePlus className='h-10 w-10 text-gray-400' />
                        )}
                    </motion.div>
                </EmojiPickerComponent>
            </div>

            {/* File Name */}
            <div className='mt-16 px-8 py-4'>
                <Input
                    type="text"
                    placeholder='Untitled Document'
                    defaultValue={documentInfo?.documentName}
                    className='font-bold text-3xl bg-transparent border-none outline-none focus:ring-0 placeholder-gray-500 text-gray-100'
                    onBlur={(event) => handleUpdateDocumentInfo('documentName', event.target.value)}
                />
            </div>
        </motion.div>
    )
}

export default DocumentInfo

