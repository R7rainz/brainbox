"use client";
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { collection, doc, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import uuid4 from 'uuid4';
import { Bell, Loader2Icon, Plus } from 'lucide-react';
import { toast } from 'sonner';

import Logo from '@/app/_components/Logo';
import DocumentList from './DocumentList';
import NotifiationBox from './NotifiationBox';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import { db } from '@/config/firebaseConfig';

const MAX_FILE = Number(process.env.NEXT_PUBLIC_MAX_FILE_COUNT) || 5;

function SideNav({ params }) {
    const [documentList, setDocumentList] = useState([]);
    const [documentName, setDocumentName] = useState("Untitled Document");
    const [coverImage, setCoverImage] = useState('/cover.png');
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
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
        <motion.div 
            className="h-screen md:w-72 hidden md:block fixed bg-gray-900 p-5 shadow-lg"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-between items-center">
                <Logo />
                <NotifiationBox>
                    <Bell className="h-5 w-5 text-gray-400 hover:text-blue-400 transition-colors" />
                </NotifiationBox>
            </div>
            <motion.hr 
                className="my-5 border-gray-800"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            />
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-medium text-gray-200">{documentName}</h2>
                    <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={CreateNewDocument}
                    >
                        {loading ? (
                            <Loader2Icon className="h-4 w-4 animate-spin" />
                        ) : (
                            <Plus className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Document List */}
            <DocumentList documentList={documentList} params={params} />

            {/* Progress Bar */}
            <motion.div 
                className="absolute bottom-10 w-[85%]"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <Progress 
                    value={(documentList?.length / MAX_FILE) * 100} 
                    className="bg-gray-800"
                />
                <h2 className="text-sm font-light text-gray-300 my-2">
                    <strong>{documentList?.length}</strong> out of <strong>{MAX_FILE}</strong> files used
                </h2>
                <Button 
                    variant="outline" 
                    className="w-full mt-2 bg-gray-800 hover:bg-gray-700 text-blue-400 border-gray-700"
                    onClick={() => console.log("Upgrade clicked")}
                >
                    Upgrade for Unlimited Access
                </Button>
            </motion.div>
        </motion.div>
    );
}

export default SideNav;

