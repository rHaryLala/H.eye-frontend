"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"

export const AnimatedEye = ({ className }: { className?: string }) => {
  const controls = useAnimation()

  // Animation séquence pour le clignotement
  useEffect(() => {
    const sequence = async () => {
      while (true) {
        // Attendre un temps aléatoire entre 3 et 7 secondes
        await new Promise((resolve) => setTimeout(resolve, Math.random() * 4000 + 3000))

        // Fermer l'œil rapidement
        await controls.start({ scaleY: 0.1, transition: { duration: 0.15 } })

        // Ouvrir l'œil
        await controls.start({ scaleY: 1, transition: { duration: 0.2 } })

        // Parfois faire un double clignotement
        if (Math.random() > 0.7) {
          await new Promise((resolve) => setTimeout(resolve, 100))
          await controls.start({ scaleY: 0.1, transition: { duration: 0.15 } })
          await controls.start({ scaleY: 1, transition: { duration: 0.2 } })
        }
      }
    }

    sequence()
  }, [controls])

  return (
    <div className={`relative ${className || ""}`}>
      {/* Contour de l'œil */}
      <svg width="100" height="50" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="25" rx="50" ry="25" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>

      {/* Iris et pupille avec animation */}
      <motion.div
        animate={controls}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ originY: 0.5 }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="20" fill="url(#eye-gradient)" />
          <circle cx="20" cy="20" r="8" fill="black" />
          <circle cx="16" cy="16" r="3" fill="white" />
        </svg>
      </motion.div>

      <defs>
        <linearGradient id="eye-gradient" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>
    </div>
  )
}
