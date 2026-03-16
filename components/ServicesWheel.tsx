'use client'

import { useEffect, useState } from "react"
import { Code, BarChart, ServerCog, FlaskConical } from "lucide-react"

const iconMap: any = {
  code: Code,
  strategy: BarChart,
  support: ServerCog,
  research: FlaskConical
}

export default function ServicesWheel({
  services,
  activeIndex,
  setActiveIndex
}) {
  const [rotation, setRotation] = useState(0)
  const total = services.length
  const radius = 220
  const step = 360 / total

  useEffect(() => {
    const interval = setInterval(() => {
      // Invert rotation direction to match index progression
      setRotation(prev => prev - step)
      setActiveIndex(prev => (prev + 1) % total)
    }, 4000)

    return () => clearInterval(interval)
  }, [step, total, setActiveIndex])

  return (
    <div className="flex flex-col items-center">
      {/* SPINNER AREA */}
      <div className="relative w-[500px] h-[300px] overflow-hidden flex justify-center items-end">
        
        {/* OFFSET WRAPPER */}
        <div className="absolute top-[40px] w-full h-full flex justify-center">
          
          {/* THE ROTATING WHEEL */}
          <div
            className="relative"
            style={{
              transform: `rotate(${rotation}deg)`,
              width: radius * 2,
              height: radius * 2,
              transition: "transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
          >
            {/* FAT GRADIENT ARC (Outer Ring) */}
            <div 
              className="absolute inset-0 rounded-full border-[70px] border-transparent shadow-[0_0_50px_rgba(59,130,246,0.1)]"
              style={{
                background: 'conic-gradient(from 180deg, transparent 0deg, #60a5fa 60deg, #2563eb 180deg, #60a5fa 300deg, transparent 360deg)',
                maskImage: 'radial-gradient(circle, transparent 149px, black 150px)',
                WebkitMaskImage: 'radial-gradient(circle, transparent 149px, black 150px)',
              }}
            ></div>

            {/* ICONS */}
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Code
              const isActive = index === activeIndex
              
              const angle = (360 / total) * index
              
              const x = radius * Math.cos((angle - 90) * Math.PI / 180)
              const y = radius * Math.sin((angle - 90) * Math.PI / 180)

              return (
                <div
                  key={service.id}
                  className="absolute"
                  style={{
                    left: radius + x,
                    top: radius + y,
                    transform: `translate(-50%, -50%) rotate(${-rotation}deg)`,
                    transition: 'transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  <div className={`p-5 transition-all duration-700 flex items-center justify-center rounded-full ${isActive ? 'scale-150 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]' : 'text-blue-300/40'}`}>
                    <Icon size={36} strokeWidth={isActive ? 2.5 : 1.5} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ANALOG HUB & POINTER */}
        <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[340px] h-[340px] flex justify-center items-start z-10">
          
          {/* HUB OUTER RING */}
          <div className="absolute inset-0 bg-blue-900/20 rounded-full border border-blue-500/20 backdrop-blur-md"></div>
          
          {/* INNER HUB */}
          <div className="absolute inset-8 bg-[#0f172a] rounded-full border border-white/5 shadow-2xl flex items-center justify-center">
            {/* CENTER OVERLAY OR HOLE */}
             <div className="w-12 h-12 bg-blue-500/10 rounded-full border border-blue-500/20"></div>
          </div>

          {/* THE RED NEEDLE */}
          <div className="absolute top-10 transform -translate-y-1/2 flex flex-col items-center">
             {/* Needle Base */}
             <div className="w-4 h-4 bg-red-600 rounded-full z-30 shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>
             {/* The Needle Tip */}
             <div className="w-1.5 h-36 bg-gradient-to-t from-red-600 to-red-400 rounded-full -mt-2 z-20 shadow-[0_0_20px_rgba(220,38,38,0.3)] origin-bottom"></div>
          </div>
        </div>

      </div>
    </div>
  )
}
