"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Car, Bike } from "lucide-react"

const images = ["/deal1.jpg", "/deal2.jpg", "/deal3.jpg"]

export function HeroSection() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        
        {/* LEFT SIDE */}
<div className="flex-1 text-left">
  <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
    Get Your Dream <span className="text-primary">Vehicles</span>
  </h1>

  <img
    src="/thakur-dealings-logo.jpg"
    alt="Thakur Dealings Logo"
    className="w-40 mb-6"
  />

  <p className="text-lg text-black mb-8 max-w-xl">
    Discover thousands of quality cars and bikes from trusted sellers at Thakur Dealings. 
    Your trusted partner for 100% verified vehicles with complete documentation.
  </p>

  {/* Buttons */}
  <div className="flex flex-wrap gap-4 mb-8">
    <Button asChild size="lg" className="text-xl px-10 py-6">
      <Link href="/buy-car" className="flex items-center space-x-2">
        <Car className="h-6 w-6" />
        <span>Buy Car</span>
      </Link>
    </Button>
    <Button asChild variant="secondary" size="lg" className="text-xl px-10 py-6">
      <Link href="/buy-bike" className="flex items-center space-x-2">
        <Bike className="h-6 w-6" />
        <span>Buy Bike</span>
      </Link>
    </Button>
  </div>

  {/* IMAGE comes after buttons on mobile */}
  <div className="block lg:hidden w-full max-w-md mx-auto">
    <img
      src={images[current]}
      alt="Thakur Dealings"
      className="w-full h-auto rounded-xl shadow-lg object-contain"
    />
  </div>
</div>

{/* RIGHT SIDE - IMAGE only for desktop */}
<div className="hidden lg:block flex-1 relative max-w-lg h-[500px] rounded-xl overflow-hidden shadow-lg">
  <img
    src={images[current]}
    alt="Thakur Dealings"
    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 bg-black"
  />
</div>

      </div>
    </section>
  )
}
