"use client"
import { Button } from '@/components/ui/button';
import { useAuth, useUser } from '@clerk/nextjs'
import { AlignLeft, LayoutGrid, Folder, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import WorkspaceItemList from './WorkspaceItemList';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card"

function WorkspaceList() {
    const {user} = useUser();
    const {orgId} = useAuth();
    const [workspaceList, setWorkspaceList] = useState([]);

    useEffect(() => {
        user && getWorkspaceList()
    }, [orgId, user])

    const getWorkspaceList = async () => {
        const q = query(collection(db, 'Workspace'), where('orgId', '==', orgId ? orgId : user?.primaryEmailAddress?.emailAddress))
        const querySnapshot = await getDocs(q);
        setWorkspaceList([]);
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
            setWorkspaceList(prev => [...prev, doc.data()])
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='my-10 p-10 md:px-24 lg:px-36 xl:px-52'
        >
            <div className='flex justify-between items-center'>
                <h2 className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400'>
                    Hello, {user?.fullName}
                </h2>
                <Link href={'/createworkspace'}>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">+</Button>
                </Link>
            </div>

            <div className='mt-10 flex justify-between items-center'>
                <h2 className='font-medium text-blue-400'>Workspaces</h2>
                <div className='flex gap-2 text-gray-400'>
                    <LayoutGrid className="cursor-pointer hover:text-blue-400 transition-colors" />
                    <AlignLeft className="cursor-pointer hover:text-blue-400 transition-colors" />
                </div>
            </div>

            {workspaceList?.length == 0 ?
                <motion.div 
                    className='flex flex-col justify-center items-center my-10'
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Image src={'/workspace.png'} 
                        width={200} height={200} alt='workspace'
                        className="opacity-70"
                    />
                    <h2 className="text-gray-300 mt-4 mb-2">Create a new workspace</h2>
                    <Link href={'/createworkspace'}>
                        <Button className="my-3 bg-blue-600 hover:bg-blue-700 text-white">+ New Workspace</Button>
                    </Link>
                </motion.div>
                :
                <div className="mt-6">
                    <WorkspaceItemList workspaceList={workspaceList} />
                </div>
            }
        </motion.div>
    )
}

export default WorkspaceList

