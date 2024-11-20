"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { motion } from 'framer-motion';

function WorkspaceItemList({ workspaceList }) {
  const router = useRouter();

  const OnClickWorkspaceItem = (workspaceId) => {
    router.push('/workspace/' + workspaceId);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {workspaceList &&
        workspaceList.map((workspace, index) => (
          <motion.div
            key={index}
            className="border border-transparent bg-gradient-to-br from-red-900 via-gray-900 to-black cursor-pointer rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            onClick={() => OnClickWorkspaceItem(workspace.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
          >
            <Image
              src={workspace?.coverImage}
              width={400}
              height={200}
              alt="cover"
              className="h-[150px] object-cover rounded-t-xl"
            />
            <div className="p-4 rounded-b-xl text-white">
              <h2 className="flex gap-2 items-center text-lg font-semibold">
                <span>{workspace?.emoji}</span>
                {workspace.workspaceName}
              </h2>
            </div>
          </motion.div>
        ))}
    </div>
  );
}

export default WorkspaceItemList;
