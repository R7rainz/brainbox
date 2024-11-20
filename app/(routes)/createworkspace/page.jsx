"use client";
import CoverPicker from '@/app/_components/CoverPicker';
import EmojiPickerComponent from '@/app/_components/EmojiPickerComponent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/config/firebaseConfig';
import { useAuth, useUser } from '@clerk/nextjs';
import { doc, setDoc } from 'firebase/firestore';
import { Loader2Icon, SmilePlus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Ensure uuid is installed and imported correctly

function CreateWorkspace() {
  const [coverImage, setCoverImage] = useState('/cover.png');
  const [workspaceName, setWorkspaceName] = useState('');
  const [emoji, setEmoji] = useState('');
  const { user } = useUser();
  const { organization } = useAuth();  // Adjust based on Clerk's data structure
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  /**
   * Validates workspace name and creates a new workspace, saving data in the database.
   */
  const onCreateWorkspace = async () => {
    if (!workspaceName.trim()) {
      alert('Workspace name cannot be empty');
      return;
    }

    setLoading(true);

    try {
      const workspaceId = uuidv4(); // Generate a unique ID for workspace
      const createdBy = user?.email || ''; // Assuming user email is accessible via `user.email`

      // Create workspace entry
      await setDoc(doc(db, 'Workspace', workspaceId), {
        workspaceName: workspaceName.trim(),
        emoji: emoji || null,
        coverImage: coverImage,
        createdBy: createdBy,
        id: workspaceId,
        orgId: organization?.id || createdBy,  // Use organization ID or user email
      });

      // Create initial document for workspace
      const docId = uuidv4();
      await setDoc(doc(db, 'workspaceDocuments', docId), {
        workspaceId: workspaceId,
        createdBy: createdBy,
        coverImage: null,
        emoji: null,
        id: docId,
        documentName: 'Untitled Document',
        documentOutput: [],
      });

      // Create an empty document output entry
      await setDoc(doc(db, 'documentOutput', docId), {
        docId: docId,
        output: [],
      });

      // Navigate to the workspace
      router.replace(`/workspace/${workspaceId}/${docId}`); 
    } catch (error) {
      console.error('Error creating workspace:', error);
      alert('Failed to create workspace. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-gray-900 to-black text-white p-10 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        {/* Cover Image */}
        <CoverPicker setNewCover={(v) => setCoverImage(v)}>
          <div className="relative group cursor-pointer">
            <h2
              className="hidden absolute p-4 w-full h-full
              items-center group-hover:flex
              justify-center text-white text-lg font-semibold opacity-75 transition-all"
            >
              Change Cover
            </h2>
            <div className="group-hover:opacity-40 transition-all duration-500">
              <Image
                src={coverImage}
                width={600}
                height={200}
                alt="Cover Image"
                className="w-full h-[180px] object-cover rounded-t-xl"
              />
            </div>
          </div>
        </CoverPicker>

        {/* Input Section */}
        <div className="p-8">
          <h2 className="font-semibold text-3xl text-white tracking-wide mb-2">
            Create a New Workspace
          </h2>
          <h2 className="text-sm mt-2 text-gray-400 mb-6">
            This is a shared space where you can collaborate with your team. You can always rename it later.
          </h2>

          <div className="mt-6 flex gap-4 items-center">
            <EmojiPickerComponent setEmojiIcon={(v) => setEmoji(v)}>
              <Button variant="outline" className="bg-gray-700 text-white hover:bg-red-600 border-red-500 hover:border-red-600 transition-all">
                {emoji ? (
                  <span className="text-white">{emoji}</span>
                ) : (
                  <SmilePlus className="text-white" />
                )}
              </Button>
            </EmojiPickerComponent>

            <Input
              placeholder="Workspace Name"
              onChange={(e) => setWorkspaceName(e.target.value)}
              value={workspaceName}
              className="text-gray-200 bg-gray-800 focus:ring-red-500 focus:border-red-500 transition-all"
            />
          </div>

          <div className="mt-7 flex justify-end gap-6">
            <Button
              disabled={!workspaceName?.trim() || loading}
              onClick={onCreateWorkspace}
              className="bg-red-600 hover:bg-red-700 text-white transition-all duration-300"
            >
              {loading ? <Loader2Icon className="animate-spin ml-2" /> : 'Create'}
            </Button>
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="border-gray-500 text-gray-400 hover:border-white hover:text-white transition-all duration-300"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkspace;
