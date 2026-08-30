import { useRef, useEffect, useState } from 'react'
import Scene3D from './three/Scene3D'
import Nav from './sections/Nav'
import Hero from './sections/Hero'
import Features from './sections/Features'
import Stats from './sections/Stats'
import Testimonials from './sections/Testimonials'
import Pricing from './sections/Pricing'
import CTA from './sections/CTA'
import Footer from './sections/Footer'
import { useScrollProgress } from './hooks/useScrollProgress'

export default function App() {
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(10000)

  useEffect(() => {
    if (!contentRef.current) return
    const updateHeight = () => {
      setContentHeight(contentRef.current?.scrollHeight ?? 10000)
    }
    updateHeight()
    const obs = new ResizeObserver(updateHeight)
    obs.observe(contentRef.current)
    return () => obs.disconnect()
  }, [])

  const scrollProgress = useScrollProgress(contentHeight)

  return (
    <>
      <Scene3D scrollProgress={scrollProgress} />

      <div ref={contentRef} className="relative z-10">
        <Nav />
        <Hero />
        <Features />
        <Stats />
        <Testimonials />
        <Pricing />
        <CTA />
        <Footer />
      </div>
    </>
  )
}
