"use client";
import { Button } from '@/components/ui/button';
import { useAuth, useUser } from '@clerk/nextjs';
import { AlignLeft, LayoutGrid } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, useCallback } from 'react';
import WorkspaceItemList from './WorkspaceItemList';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';

function WorkspaceList() {
    const { user } = useUser();
    const { orgId } = useAuth();
    const [workspaceList, setWorkspaceList] = useState([]);

    const getWorkspaceList = useCallback(async () => {
        try {
            const orgIdentifier = orgId || user?.primaryEmailAddress?.emailAddress;
            if (!orgIdentifier) {
                console.warn('No organization identifier available.');
                return;
            }

            const q = query(
                collection(db, 'Workspace'),
                where('orgId', '==', orgIdentifier)
            );

            const querySnapshot = await getDocs(q);
            const workspaces = querySnapshot.docs.map((doc) => doc.data());
            setWorkspaceList(workspaces);
        } catch (error) {
            console.error('Error fetching workspace list:', error);
        }
    }, [orgId, user]);

    useEffect(() => {
        if (user && (orgId || user.primaryEmailAddress?.emailAddress)) {
            getWorkspaceList();
        }
    }, [orgId, user, getWorkspaceList]);

    return (
        <div className="my-10 p-10 md:px-24 lg:px-36 xl:px-52">
            <div className="flex justify-between">
                <h2 className="font-bold text-3xl text-white">
                    Hello, {user?.fullName || 'User'}
                </h2>
                <Link href={'/createworkspace'}>
                    <Button className="bg-gradient-to-br from-red-900 via-gray-900 to-black text-white hover:from-red-700 hover:via-gray-700 hover:to-black transition-all duration-300">
                        +
                    </Button>
                </Link>
            </div>

            <div className="mt-10 flex justify-between">
                <div>
                    <h2 className="font-medium text-white text-lg">Workspaces</h2>
                </div>
                <div className="flex gap-4 text-white">
                    <LayoutGrid className="text-xl cursor-pointer hover:text-red-500 transition-all duration-300" />
                    <AlignLeft className="text-xl cursor-pointer hover:text-red-500 transition-all duration-300" />
                </div>
            </div>

            {workspaceList?.length === 0 ? (
                <div className="flex flex-col justify-center items-center my-10">
                    <Image src={'/workspace.png'} width={200} height={200} alt="workspace" />
                    <h2 className="text-white text-lg mt-4">Create a new workspace</h2>
                    <Link href={'/createworkspace'}>
                        <Button className="my-3 bg-gradient-to-br from-red-900 via-gray-900 to-black text-white hover:from-red-700 hover:via-gray-700 hover:to-black transition-all duration-300">
                            + New Workspace
                        </Button>
                    </Link>
                </div>
            ) : (
                <div>
                    <WorkspaceItemList workspaceList={workspaceList} />
                </div>
            )}
        </div>
    );
}

export default WorkspaceList;
