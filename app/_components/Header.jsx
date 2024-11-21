'use client'

import React, { useRef } from "react"
import { motion } from "framer-motion"
import Logo from "./Logo"

const SpaceHeader = () => {
  const featuresRef = useRef(null)
  const solutionRef = useRef(null)
  const testimonialsRef = useRef(null)
  const blogRef = useRef(null)

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const navItems = [
    { name: "Features", ref: featuresRef },
    { name: "Solution", ref: solutionRef },
    { name: "Testimonials", ref: testimonialsRef },
    { name: "Blog", ref: blogRef },
  ]

  return (
    <motion.div 
      className="px-5"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="z-20 w-full absolute top-0 left-0 bg-transparent">
        <div>
          <div className="flex flex-wrap items-center justify-between py-4 gap-6 relative">
            <input
              aria-hidden="true"
              type="checkbox"
              name="toggle_nav"
              id="toggle_nav"
              className="hidden peer"
            />
            <motion.div 
              className="relative z-20 w-full flex justify-between lg:w-max md:px-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Logo />
              <div className="relative flex items-center lg:hidden max-h-10">
                <label
                  role="button"
                  htmlFor="toggle_nav"
                  aria-label="hamburger"
                  id="hamburger"
                  className="relative p-6 -mr-6"
                >
                  <motion.div
                    aria-hidden="true"
                    id="line"
                    className="m-auto h-0.5 w-5 rounded bg-blue-400 transition duration-300"
                    whileHover={{ width: "100%" }}
                  ></motion.div>
                  <motion.div
                    aria-hidden="true"
                    id="line2"
                    className="m-auto mt-2 h-0.5 w-5 rounded bg-blue-400 transition duration-300"
                    whileHover={{ width: "100%" }}
                  ></motion.div>
                </label>
              </div>
            </motion.div>
            <div
              aria-hidden="true"
              className="fixed z-10 inset-0 h-screen w-screen bg-[#050816]/70 backdrop-blur-2xl origin-bottom scale-y-0 transition duration-500 peer-checked:origin-top peer-checked:scale-y-100 lg:hidden"
            ></div>
            <div
              className="flex-col z-20 flex-wrap gap-6 p-8 rounded-3xl border border-gray-800 bg-[#050816] shadow-2xl shadow-blue-500/20 justify-end w-full invisible opacity-0 translate-y-1 absolute top-full left-0 transition-all duration-300 scale-95 origin-top 
                          lg:relative lg:scale-100 lg:peer-checked:translate-y-0 lg:translate-y-0 lg:flex lg:flex-row lg:items-center lg:gap-0 lg:p-0 lg:bg-transparent lg:w-7/12 lg:visible lg:opacity-100 lg:border-none
                          peer-checked:scale-100 peer-checked:opacity-100 peer-checked:visible lg:shadow-none"
            >
              <div className="text-gray-300 lg:pr-4 lg:w-auto w-full lg:pt-0">
                <ul className="tracking-wide font-medium lg:text-sm flex-col flex lg:flex-row gap-6 lg:gap-0">
                  {navItems.map((item) => (
                    <motion.li key={item.name} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <a
                        href={`#${item.name.toLowerCase()}`}
                        className="block md:px-4 transition hover:text-blue-400"
                        onClick={(e) => {
                          e.preventDefault()
                          scrollToSection(item.ref)
                        }}
                      >
                        <span>{item.name}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 lg:mt-0">
                <motion.a
                  href="/dashboard"
                  className="relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-blue-600 before:transition 
                              before:duration-300 hover:before:scale-105 
                              active:duration-75 active:before:scale-95 sm:w-max"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault()
                    window.location.href = '/dashboard'
                  }}
                >
                  <span className="relative text-sm font-semibold text-white">
                    Get Started
                  </span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </motion.div>
  )
}

export default SpaceHeader

