'use client'

import { motion } from "framer-motion"

export default function AmbientOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div 
        animate={{ 
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[120px]" 
      />
      <motion.div 
        animate={{ 
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vw] bg-secondary/5 rounded-full blur-[140px]" 
      />
    </div>
  )
}
