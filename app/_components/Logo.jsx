import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2 ml-4">
      <Image
        src="/logo.png" // Ensure the logo is inside the public directory
        alt="BrainBox Logo"
        width={70} // Increased size to 70px
        height={70} // Increased size to 70px
        className="object-contain"
      />
      <h2 className="font-bold text-xl text-white">BrainBox</h2>
    </Link>
  )
}

export default Logo
