'use client'

import { useEffect, useState } from "react"

interface Testimonial {
  id: string
  quote: string
  author: string
}

interface TestimonialsSectionProps {
  sectionLabel: string
  heading: string
  subheading: string
  items: Testimonial[]
}

export default function TestimonialsSection({
  sectionLabel,
  heading,
  subheading,
  items
}: TestimonialsSectionProps) {

  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState(true)

  const next = () => {
    setFade(false)
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % items.length)
      setFade(true)
    }, 200)
  }

  const prev = () => {
    setFade(false)
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + items.length) % items.length)
      setFade(true)
    }, 200)
  }

  useEffect(() => {
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [])

  const testimonial = items[index]
  const avatarLetter = testimonial.author.charAt(0).toUpperCase()

  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div className="relative">

            {/* Background Quotes */}
            <div className="absolute left-0 top-10 text-[160px] font-bold text-gray-100 select-none">
              "
            </div>

            <div className="flex items-center gap-4 mb-6 relative z-10">

              <span className="text-sm font-semibold text-green-700">
                {sectionLabel}
              </span>

              <div className="w-12 h-[2px] bg-green-600"></div>

            </div>

            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight relative z-10">
              {heading}
            </h2>

            <p className="text-gray-500 mt-6 max-w-md relative z-10">
              {subheading}
            </p>

          </div>


          {/* RIGHT SIDE */}
          <div className="relative">

            <div className={`relative border border-gray-300 bg-white p-10 w-full max-w-xl h-[300px] flex flex-col justify-between transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>

              {/* Quote mark */}
              <div className="absolute -top-6 left-10 text-6xl font-bold text-green-700">
                "
              </div>

              {/* Quote */}
              <p className="text-gray-700 leading-relaxed mt-6">
                {testimonial.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 mt-6">

                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center font-semibold text-green-700">
                  {avatarLetter}
                </div>

                <div>

                  <p className="font-semibold text-gray-900">
                    {testimonial.author}
                  </p>

                  <p className="text-sm text-gray-500">
                    Client
                  </p>

                </div>

              </div>

            </div>


            {/* Indicators + Controls */}
            <div className="flex items-center justify-between mt-6">

              {/* Dot indicators */}
              <div className="flex gap-3">

                {items.map((_, i) => (

                  <div
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-[3px] w-10 cursor-pointer transition ${
                      i === index
                        ? "bg-green-700"
                        : "bg-gray-300"
                    }`}
                  />

                ))}

              </div>


              {/* Arrows */}
              <div className="flex gap-4">

                <button
                  onClick={prev}
                  className="border border-gray-400 w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition"
                >
                  ←
                </button>

                <button
                  onClick={next}
                  className="border border-gray-400 w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition"
                >
                  →
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}