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
  const [activeSection, setActiveSection] = useState('studio')

  const contentData = [
    {
      leftTitle: "Ideate",
      leftSubtitle: "Step 01",
      rightContent: "We start by brainstorming innovative ideas that align with your brand's vision and goals."
    },
    {
      leftTitle: "Design",
      leftSubtitle: "Step 02",
      rightContent: "Our design phase brings your ideas to life with stunning visuals and intuitive user experiences."
    },
    {
      leftTitle: "Develop",
      leftSubtitle: "Step 03",
      rightContent: "We build robust, scalable solutions using cutting-edge technologies to ensure optimal performance."
    }
  ]

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

  useEffect(() => {
    const handleScroll = () => {
      const studioSection = document.getElementById('studio')
      const teamSection = document.getElementById('team')
      const contactSection = document.getElementById('contact')
      
      const scrollPosition = window.scrollY + window.innerHeight / 2

      if (studioSection && teamSection && contactSection) {
        if (scrollPosition < teamSection.offsetTop) {
          setActiveSection('studio')
        } else if (scrollPosition < contactSection.offsetTop) {
          setActiveSection('team')
        } else {
          setActiveSection('contact')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <div ref={containerRef} className="bg-[#263366] relative">
      <motion.div
        className="fixed inset-0 flex items-center justify-center pointer-events-none font-sans h-screen"
        style={{ opacity: backgroundOpacity }}
        initial={{ scaleX: 0.05, scaleY: 0.8 }}
        animate={{ scaleX: 2, scaleY: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <span className="text-[40vw] text-white/10 font-black select-none">S</span>
      </motion.div>

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
            {!isMenuOpen && (
              <>
                <Link 
                  href="#studio" 
                  className={`transition-colors ${
                    activeSection === 'studio' 
                      ? 'text-white font-medium tracking-wider' 
                      : 'text-white/60 hover:text-white/80'
                  }`}
                >
                  STUDIO
                </Link>
                <Link 
                  href="#team" 
                  className={`transition-colors ${
                    activeSection === 'team' 
                      ? 'text-white font-medium tracking-wider' 
                      : 'text-white/60 hover:text-white/80'
                  }`}
                >
                  TEAM
                </Link>
                <Link 
                  href="#contact" 
                  className={`transition-colors ${
                    activeSection === 'contact' 
                      ? 'text-white font-medium tracking-wider' 
                      : 'text-white/60 hover:text-white/80'
                  }`}
                >
                  CONTACT
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <section 
  id="studio"
  className="flex flex-col items-start justify-center min-h-screen px-4 -mt-16" 
>
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 1.5 }}
    className="text-left max-w-4xl mx-auto"
  >
    <div className="flex items-center gap-2 mb-8">
      <span className="text-blue-700">◆</span>
      <span className="text-sm tracking-wider text-blue-700">STUDIO</span>
    </div>
    <h1 className="text-4xl md:text-7xl text-white mb-6 leading-tight">
    15 years of industry <br />
    experience creating <br />
    together
    </h1>
    <p className="text-xl text-white/90">
    preferring straightforward relationships with creatives and inspired decision‑makers over impersonal organizations
    </p>
  </motion.div>
</section>

     {/* Team Section */}
     <main className="pt-24 text-white" id="team">
        <section className="min-h-screen flex flex-col lg:flex-row">
          {/* Heading Section */}
          <div className="lg:w-1/3 bg-[#263366] flex items-center justify-center p-8 lg:p-16">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#ff6b6b] tracking-wider">TEAM</span>
                <div className="w-2 h-2 bg-[#ff6b6b] rotate-45" />
              </div>
              <h1 className="text-4xl md:text-5xl font-serif">
                Meet the creative
                <br />
                duo of our studio
              </h1>
            </div>
          </div>

          {/* Team Member 1 */}
          <div className="lg:w-1/3 bg-[#24305e] flex items-center justify-center p-8 lg:p-16">
            <div className="text-center">
              <div className="mb-8 aspect-square relative">
                <Image
                  src="/image1.png"
                  alt="Art Director illustration"
                  width={400}
                  height={400}
                  className="mx-auto"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif mb-4">Jimmy Raheriarisoa</h2>
              <div className="space-y-3">
                <p className="text-lg uppercase tracking-wider">Art Director</p>
                <div className="text-sm text-gray-400">
                  <span className="text-[#ff6b6b]">Awards:</span> 4 FWA • 10 Awwwards • 14 CSS Design Awards
                </div>
              </div>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="lg:w-1/3 bg-[#24305e] flex items-center justify-center p-8 lg:p-16">
            <div className="text-center">
              <div className="mb-8 aspect-square relative">
                <Image
                  src="/image2.png"
                  alt="Developer illustration"
                  width={400}
                  height={400}
                  className="mx-auto"
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif mb-4">Antoine Wodniack</h2>
              <div className="space-y-3">
                <p className="text-lg uppercase tracking-wider">Developer</p>
                <div className="text-sm text-gray-400">
                  <span className="text-[#ff6b6b]">Awards:</span> 4 FWA • 12 Awwwards • 15 CSS Design Awards
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <motion.section 
        id="contact"
        className="h-screen bg-[#2B4EA2]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center justify-center h-full px-6 text-center">
          <div className="space-y-8">
            <h2 className="text-[#FF6B6B] text-sm uppercase tracking-wider">Contact Us</h2>
            <Link href="mailto:hello@wrk.com" className="text-4xl md:text-6xl font-light hover:underline text-white">
              hello@wrk.com
            </Link>
            <div className="text-sm space-x-2 text-white">
              <Link href="#" className="hover:underline">FACEBOOK</Link>
              <span>•</span>
              <Link href="#" className="hover:underline">TWITTER</Link>
              <span>•</span>
              <Link href="#" className="hover:underline">LINKEDIN</Link>
            </div>
          </div>
        </div>
      </motion.section>

      <footer className="bg-[#2B4EA2] py-6 px-6">
        <div className="flex justify-between text-xl md:text-2xl font-light text-white max-w-7xl mx-auto">
          <span>Vision</span>
          <span>Works</span>
          <span className="line-through opacity-50">Studio</span>
        </div>
      </footer>

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