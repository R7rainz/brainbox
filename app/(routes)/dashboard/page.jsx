"use client"

import React from 'react'
import Header from './_components/Header'
import WorkspaceList from './_components/WorkspaceList'

function Dashboard() {
  return (
    <div className="bg-gradient-to-r from-red-900 via-gray-900 to-black min-h-screen text-white">
      <Header />
      <div className="p-10 md:px-24 lg:px-36 xl:px-52 mt-6">
        <WorkspaceList />
      </div>
    </div>
  )
}

export default Dashboard
