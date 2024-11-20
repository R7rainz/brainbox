"use client";
import Logo from '@/app/_components/Logo';
import { Button } from '@/components/ui/button';
import { db } from '@/config/firebaseConfig';
import { collection, doc, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { Bell, Loader2Icon } from 'lucide-react';
import React, { useEffect, useState, useCallback } from 'react';
import DocumentList from './DocumentList';
import uuid4 from 'uuid4';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Progress } from "@/components/ui/progress";
import { toast } from 'sonner';
import NotifiationBox from './NotifiationBox';

const MAX_FILE = Number(process.env.NEXT_PUBLIC_MAX_FILE_COUNT) || 5;

function SideNav({ params }) {
    const [documentList, setDocumentList] = useState([]);
    const [documentName, setDocumentName] = useState("Untitled Document");
    const [coverImage, setCoverImage] = useState('/cover.png');
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const GetDocumentList = useCallback(() => {
        if (!params?.workspaceid) return;

        const q = query(
            collection(db, 'workspaceDocuments'),
            where('workspaceId', '==', Number(params.workspaceid))
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const docs = querySnapshot.docs.map((doc) => doc.data());
            setDocumentList(docs);
        });

        return () => unsubscribe();
    }, [params?.workspaceid]);

    useEffect(() => {
        if (params) GetDocumentList();
    }, [params, GetDocumentList]);

    const CreateNewDocument = async () => {
        if (documentList?.length >= MAX_FILE) {
            toast("Upgrade to add new file", {
                description: "You reached the max file count. Please upgrade for unlimited file creation.",
                action: {
                    label: "Upgrade",
                    onClick: () => console.log("Upgrade clicked"),
                },
            });
            return;
        }

        setLoading(true);
        try {
            const docId = uuid4();
            await setDoc(doc(db, 'workspaceDocuments', docId.toString()), {
                workspaceId: Number(params?.workspaceid),
                createdBy: user?.primaryEmailAddress?.emailAddress,
                coverImage: null,
                emoji: null,
                id: docId,
                documentName: 'Untitled Document',
                documentOutput: [],
            });

            await setDoc(doc(db, 'documentOutput', docId.toString()), {
                docId: docId,
                output: [],
            });

            router.replace(`/workspace/${params?.workspaceid}/${docId}`);
        } catch (error) {
            console.error('Error creating new document:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateDocumentInfo = (key, value) => {
        if (key === 'documentName') {
            setDocumentName(value);
        } else if (key === 'coverImage') {
            setCoverImage(value);
        }
    };

    return (
        <div className="h-screen md:w-72 hidden md:block fixed bg-gradient-to-br from-red-900 via-gray-900 to-black p-5 shadow-md">
            <div className="flex justify-between items-center">
                <Logo />
                <NotifiationBox>
                    <Bell className="h-5 w-5 text-gray-300" />
                </NotifiationBox>
            </div>
            <hr className="my-5 border-gray-700" />
            <div>
                <div className="flex justify-between items-center">
                    <h2 className="font-medium text-gray-100">{documentName}</h2>
                    <Button size="sm" className="text-lg bg-red-900 hover:bg-red-700 text-white" onClick={CreateNewDocument}>
                        {loading ? (
                            <Loader2Icon className="h-4 w-4 animate-spin" />
                        ) : (
                            '+'
                        )}
                    </Button>
                </div>
            </div>

            {/* Document List */}
            <DocumentList documentList={documentList} params={params} />

            {/* Progress Bar */}
            <div className="absolute bottom-10 w-[85%]">
                <Progress value={(documentList?.length / MAX_FILE) * 100} className="bg-gray-700" />
                <h2 className="text-sm font-light text-gray-100 my-2">
                    <strong>{documentList?.length}</strong> Out of <strong>{MAX_FILE}</strong> files used
                </h2>
                <h2 className="text-sm font-light text-gray-300">
                    Upgrade your plan for unlimited access
                </h2>
            </div>
        </div>
    );
}

export default SideNav;
