"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuth, useUser } from '@clerk/nextjs'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/config/firebaseConfig'
import uuid4 from 'uuid4'

import CoverPicker from '@/app/_components/CoverPicker'
import EmojiPickerComponent from '@/app/_components/EmojiPickerComponent'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2Icon, SmilePlus } from 'lucide-react'

function CreateWorkspace() {
    const [coverImage, setCoverImage] = useState('/cover.png')
    const [workspaceName, setWorkspaceName] = useState('')
    const [emoji, setEmoji] = useState('')
    const [loading, setLoading] = useState(false)
    
    const { user } = useUser()
    const { orgId } = useAuth()
    const router = useRouter()

    const onCreateWorkspace = async () => {
        setLoading(true)
        const workspaceId = Date.now()
        await setDoc(doc(db, 'Workspace', workspaceId.toString()), {
            workspaceName,
            emoji,
            coverImage,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            id: workspaceId,
            orgId: orgId || user?.primaryEmailAddress?.emailAddress
        })

        const docId = uuid4()
        await setDoc(doc(db, 'workspaceDocuments', docId), {
            workspaceId,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            coverImage: null,
            emoji: null,
            id: docId,
            documentName: 'Untitled Document',
            documentOutput: []
        })

        await setDoc(doc(db, 'documentOutput', docId), {
            docId,
            output: []
        })

        setLoading(false)
        router.replace(`/workspace/${workspaceId}/${docId}`)
    }

    return (
        <motion.div 
            className='min-h-screen bg-gray-950 flex items-center justify-center p-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="w-full max-w-2xl bg-gray-900 text-white border-gray-800">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
                        Create a New Workspace
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CoverPicker setNewCover={(v) => setCoverImage(v)}>
                        <motion.div 
                            className='relative group cursor-pointer overflow-hidden rounded-lg'
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        >
                            <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                                <span className='text-white font-medium'>Change Cover</span>
                            </div>
                            <Image 
                                src={coverImage} 
                                width={400} 
                                height={200}
                                className='w-full h-[180px] object-cover'
                                alt="Workspace cover"
                            />
                        </motion.div>
                    </CoverPicker>

                    <div className='mt-6 space-y-4'>
                        <p className='text-gray-400'>
                            This is a shared space where you can collaborate with your team.
                            You can always rename it later.
                        </p>
                        <div className='flex gap-2 items-center'>
                            <EmojiPickerComponent setEmojiIcon={(v) => setEmoji(v)}>
                                <Button variant="outline" className="bg-gray-800 hover:bg-gray-700">
                                    {emoji || <SmilePlus className="text-gray-400" />}
                                </Button>
                            </EmojiPickerComponent>
                            <Input 
                                placeholder="Workspace Name" 
                                onChange={(e) => setWorkspaceName(e.target.value)}
                                className="bg-gray-800 border-gray-700 text-white"
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="justify-end space-x-2">
                    <Button 
                        variant="outline" 
                        onClick={() => router.back()}
                        className="bg-gray-800 hover:bg-gray-700 text-white"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onCreateWorkspace}
                        disabled={!workspaceName || loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {loading ? (
                            <>
                                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            'Create Workspace'
                        )}
                    </Button>
                </CardFooter>
            </Card>
            {/* Glowing orb */}
            <div className="fixed top-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-[128px] opacity-20 animate-pulse" />
        </motion.div>
    )
}

export default CreateWorkspace

