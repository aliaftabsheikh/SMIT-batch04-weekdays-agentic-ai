import { useState, useEffect, useCallback } from 'react'

export function useScrollProgress(totalHeight: number) {
  const [progress, setProgress] = useState(0)

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY
    const maxScroll = Math.max(1, totalHeight - window.innerHeight)
    setProgress(Math.min(1, scrollTop / maxScroll))
  }, [totalHeight])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return progress
}
