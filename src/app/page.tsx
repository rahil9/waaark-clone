'use client'

import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function Component() {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="h-screen w-full overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-50 p-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">wrk.</Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white relative z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col"
          >
            <div className="flex-1 grid grid-cols-2">
              {/* Contact Section */}
              <div className="bg-[#f99797] px-16 pt-48">
                <div className="space-y-12">
                  <div>
                    <h2 className="text-sm font-medium tracking-wider text-blue-700 mb-8">
                      <span className="inline-block mr-2">◆</span>
                      CONTACT
                    </h2>
                    <Link 
                      href="mailto:hello@waaark.com" 
                      className="block text-5xl font-serif text-white hover:opacity-80 transition-opacity"
                    >
                      hello@waaark.com
                    </Link>
                  </div>
                  <div className="flex gap-3 text-white text-sm tracking-wider">
                    <Link href="#" className="hover:opacity-80 transition-opacity">FACEBOOK</Link>
                    <span>•</span>
                    <Link href="#" className="hover:opacity-80 transition-opacity">TWITTER</Link>
                    <span>•</span>
                    <Link href="#" className="hover:opacity-80 transition-opacity">LINKEDIN</Link>
                  </div>
                </div>
              </div>

              {/* Navigation Section */}
              <div className="bg-[#faabab] px-16 pt-48">
                <div className="space-y-12">
                  <h2 className="text-sm font-medium tracking-wider text-blue-700 mb-8">
                    <span className="inline-block mr-2">◆</span>
                    NAVIGATION
                  </h2>
                  <nav className="space-y-6">
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Link href="/vision" className="block text-5xl font-serif text-white hover:opacity-80 transition-opacity">
                        Vision
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Link href="/works" className="block text-5xl font-serif text-white hover:opacity-80 transition-opacity">
                        Works
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Link href="/studio" className="block text-5xl font-serif text-white hover:opacity-80 transition-opacity">
                        Studio
                      </Link>
                    </motion.div>
                  </nav>
                </div>
              </div>
            </div>
            
            {/* Language Toggle */}
            <div className="absolute bottom-4 right-4">
              <Button
                variant="ghost"
                className="text-white hover:text-white/80 transition-colors rounded-full w-12 h-12 border-2"
              >
                FR
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 h-screen">
        {/* Works Section */}
        <div 
          className="lg:col-span-8 bg-[#B8D8E8] p-6 lg:p-10 h-[60vh] lg:h-screen relative overflow-hidden flex flex-col justify-end"
          onMouseEnter={() => setHoveredSection('works')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <div className="relative z-10 mb-16">
            <div className="inline-block">
              <h2 className="text-sm font-bold tracking-wider text-white/80 mb-1">WORKS</h2>
              <div className="h-[2px] w-8 bg-white/80"></div>
            </div>
            <h1 className="text-3xl lg:text-5xl font-serif text-white leading-tight max-w-2xl mt-2">
              We create elegant and functional custom-designed websites
            </h1>
          </div>

          <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 w-1/2 h-1/2">
            <div className="absolute inset-0 transform rotate-45 bg-white/10 rounded-lg">
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/8 bg-white/20 rounded" />
              <div className="absolute top-1/2 left-1/4 w-1/3 h-1/8 bg-white/20 rounded" />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 grid grid-rows-2 h-[40vh] lg:h-screen">
          {/* Vision Section */}
          <div 
            className="bg-[#F87F7F] p-6 lg:p-10 relative overflow-hidden flex flex-col justify-end"
            onMouseEnter={() => setHoveredSection('vision')}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <div className="relative z-10 mb-8">
              <div className="inline-block">
                <h2 className="text-base font-bold tracking-wider text-white/80 mb-1">VISION</h2>
                <div className="h-[2px] w-8 bg-white/80"></div>
              </div>
              <h3 className="text-2xl lg:text-3xl font-serif text-white leading-tight mt-2">
                We approach projects with one clear vision
              </h3>
            </div>
            <div 
              className={`absolute right-4 bottom-4 w-24 h-24 border-2 border-white/30 rounded-lg transform rotate-12 transition-all duration-300 ease-in-out ${
                hoveredSection === 'vision' ? 'animate-guitar-string' : ''
              }`}
            />
          </div>

          {/* Studio Section */}
          <div 
            className="bg-[#1A1F3C] p-6 lg:p-10 relative overflow-hidden flex flex-col justify-end"
            onMouseEnter={() => setHoveredSection('studio')}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <div className="relative z-10 mb-8">
              <div className="inline-block">
                <h2 className="text-base font-bold tracking-wider text-white/80 mb-1">STUDIO</h2>
                <div className="h-[2px] w-8 bg-white/80"></div>
              </div>
              <h3 className="text-2xl lg:text-3xl font-serif text-white leading-tight mt-2">
                Our fine studio of two knows the value of hard work
              </h3>
            </div>
            <div className="absolute right-4 bottom-4">
              <div 
                className={`w-12 h-12 border-2 border-white/30 transform rotate-45 transition-all duration-300 ease-in-out ${
                  hoveredSection === 'studio' ? 'animate-guitar-string' : ''
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}