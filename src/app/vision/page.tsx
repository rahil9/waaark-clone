'use client'

import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform, animate } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function Component() {
  const containerRef = useRef<HTMLDivElement>(null)
  const analysisRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const contentOpacity = useTransform(scrollYProgress, [0.05, 0.1], [0, 1])
  const contentY = useTransform(scrollYProgress, [0.05, 0.1], [100, 0])

  const [activeIndex, setActiveIndex] = useState(0)
  const [rotationAngle, setRotationAngle] = useState(0)
  const [showFooter, setShowFooter] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const contentData = [
    {
      leftTitle: "Analysis",
      leftSubtitle: "Process 01",
      rightContent: "We begin with determination to understand your brand and the intricate details of each unique project."
    },
    {
      leftTitle: "Strategy",
      leftSubtitle: "Process 02",
      rightContent: "Our strategy phase brings focus and clarity to your objectives, laying a strong foundation."
    },
    {
      leftTitle: "Execution",
      leftSubtitle: "Process 03",
      rightContent: "Bringing creative solutions to life with precision and attention to detail in every step."
    }
  ]

  // Update the activeIndex based on scrollYProgress
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      const newIndex = Math.min(
        Math.floor(value * contentData.length),
        contentData.length - 1
      )
      setActiveIndex(newIndex)
    })
    return () => unsubscribe()
  }, [scrollYProgress, contentData.length])

  const scrollToAnalysis = () => {
    analysisRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const rotateToNext = () => {
    const nextIndex = (activeIndex + 1) % contentData.length
    setActiveIndex(nextIndex)
    const targetAngle = -nextIndex * (360 / 3)
    animate(rotationAngle, targetAngle, {
      duration: 0.5,
      onUpdate: (value) => setRotationAngle(value),
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      if (analysisRef.current) {
        const rect = analysisRef.current.getBoundingClientRect()
        const isScrollingPast = rect.bottom < window.innerHeight
        setShowFooter(isScrollingPast)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div ref={containerRef} className="min-h-[300vh] bg-[#FF9E9E] relative overflow-hidden scroll-smooth">
      {/* Animated "V" Background */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center pointer-events-none font-sans h-screen"
        style={{ opacity: backgroundOpacity, fontFamily: 'Inter' }}
        initial={{ scaleX: 0.05, scaleY: 0.8 }}
        animate={{ scaleX: 2, scaleY: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <span className="text-[40vw] text-white/10 font-black select-none">V</span>
      </motion.div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-bold text-white flex items-center">
            wrk
            <div className="flex ml-1 space-x-1">
              {[...Array(3)].map((_, i) => (
                <motion.span
                  key={i}
                  className="text-white"
                  initial={{ y: 0 }}
                  animate={{ y: [-4, 0] }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: i * 0.2,
                    repeatType: "mirror"
                  }}
                >
                  .
                </motion.span>
              ))}
            </div>
          </Link>
          <nav className="fixed right-8 top-8 flex flex-col items-end space-y-4 text-sm">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white mb-8" 
              onClick={handleMenuClick}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            <Link href="/vision" className="text-white/60 hover:text-white/80 transition-colors">VISION</Link>
            <Link href="/process" className="text-white font-medium tracking-wider hover:opacity-80 transition-opacity">PROCESS</Link>
            <Link href="/contact" className="text-white/60 hover:text-white/80 transition-colors">CONTACT</Link>
          </nav>
        </div>
      </header>

      {/* Initial Content */}
      <section className="flex flex-col items-start justify-center min-h-screen px-4 -mt-16 font-sans" style={{ fontFamily: 'Inter' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-left max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-2 mb-8">
            <span className="text-blue-700">◆</span>
            <span className="text-sm tracking-wider text-blue-700">VISION</span>
          </div>
          <h1 className="text-4xl md:text-7xl text-white mb-6 leading-tight">
            Creative
            <br />
            Straightforward
            <br />
            and personal
          </h1>
          <p className="text-xl text-white/90">
            Our defining principles
          </p>
        </motion.div>
      </section>

      {/* Analysis Section */}
      <motion.section 
        ref={analysisRef}
        className="min-h-screen flex items-center justify-center px-4"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-3 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-6xl text-white font-sans" style={{ fontFamily: 'Inter' }}>{contentData[activeIndex].leftTitle}</h2>
            <div className="flex items-center gap-4 text-[#2B4EA2]">
              <span className="uppercase tracking-wider text-sm">{contentData[activeIndex].leftSubtitle}</span>
              <div className="w-4 h-4 border-2 border-current rotate-45" />
            </div>
          </div>

          <div className="relative md:col-span-1">
            <motion.div 
              className="relative w-[200px] h-[200px] mx-auto cursor-pointer"
              style={{ rotate: rotationAngle }}
              onClick={rotateToNext}
            >
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-dashed border-white/20"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Position all three dots in a triangle formation */}
              {[...Array(3)].map((_, i) => {
                const angle = (i * 120) - 90; // -90 starts from top, 120 degrees apart
                const radian = (angle * Math.PI) / 180;
                const x = Math.cos(radian) * 80; // Radius of 80px
                const y = Math.sin(radian) * 80;
                
                return (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={false}
                    animate={{
                      scale: activeIndex === i ? 1.2 : 1,
                      opacity: activeIndex === i ? 1 : 0.6,
                    }}
                    whileHover={{ scale: 1.3, opacity: 1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIndex(i);
                    }}
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                  >
                    <div 
                      className={`w-4 h-4 rounded-full cursor-pointer transition-colors duration-300 ${
                        i === activeIndex ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <div>
            <p className="text-white/80 font-sans text-lg" style={{ fontFamily: 'Inter' }}>{contentData[activeIndex].rightContent}</p>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        className="h-screen flex items-center justify-center bg-[#2B4EA2] relative"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showFooter ? 1 : 0
        }}
        transition={{ duration: 0.5 }}
      >
         <main className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] px-6 text-center">
        <div className="space-y-8">
          <h2 className="text-[#FF6B6B] text-sm uppercase tracking-wider">Contact Us</h2>
          <Link href="mailto:hello@waaark.com" className="text-4xl md:text-6xl font-light hover:underline">
            hello@waaark.com
          </Link>
          <div className="text-sm space-x-2">
            <Link href="#" className="hover:underline">FACEBOOK</Link>
            <span>•</span>
            <Link href="#" className="hover:underline">TWITTER</Link>
            <span>•</span>
            <Link href="#" className="hover:underline">LINKEDIN</Link>
          </div>
        </div>
      </main>
      </motion.section>

      {/* Footer */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: showFooter ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <footer className="absolute bottom-0 w-full p-6">
          <div className="flex justify-between text-xl md:text-2xl font-light">
          <span className="line-through opacity-50">Vision</span>
          <span>Works</span>
          <span>Studio</span>
          </div>
        </footer>
      </motion.section>

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
                    <Link 
                      href="/vision" 
                      className="block text-5xl font-serif text-white hover:opacity-80 transition-opacity"
                    >
                      Vision
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link 
                      href="/works" 
                      className="block text-5xl font-serif text-white hover:opacity-80 transition-opacity"
                    >
                      Works
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Link 
                      href="/studio" 
                      className="block text-5xl font-serif text-white hover:opacity-80 transition-opacity"
                    >
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
    </div>
  )
}
