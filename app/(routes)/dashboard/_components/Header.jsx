"use client";
import Logo from '@/app/_components/Logo';
import { db } from '@/config/firebaseConfig';
import { OrganizationSwitcher, UserButton, useAuth, useUser } from '@clerk/nextjs';
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';

function Header() {
  const { orgId } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (user) saveUserData();
  }, [user]);

  /**
   * Used to save user data
   */
  const saveUserData = async () => {
    const docId = user?.primaryEmailAddress?.emailAddress;
    try {
      await setDoc(doc(db, 'LoopUsers', docId), {
        name: user?.fullName,
        avatar: user?.imageUrl,
        email: user?.primaryEmailAddress?.emailAddress,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-900 via-gray-900 to-black text-white shadow-lg">
      <Logo />
      <div className="flex items-center gap-4">
        <OrganizationSwitcher
          afterLeaveOrganizationUrl={'/dashboard'}
          afterCreateOrganizationUrl={'/dashboard'}
        />
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
