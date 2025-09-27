"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Car, Bike, X } from "lucide-react"


const images = ["/deal1.jpg", "/deal2.jpg", "/deal3.jpg", "/deal4.jpg", "/deal5.jpg"]

export function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [showPopup, setShowPopup] = useState(true) // Controls popup visibility

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative py-5 lg:py-5 overflow-hidden">
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

          {/* Mobile: Text + Images below buttons */}
          <div className="block lg:hidden w-full max-w-md mx-auto text-center">
            <h2 className="text-3xl font-extrabold mb-4">
              <span className="text-black">We Are Proud Of</span>
              <span className="text-red-500">....</span>
            </h2>
            <div className="w-full rounded-xl overflow-hidden shadow-lg">
              <img
                src={images[current]}
                alt="Thakur Dealings"
                className="w-full h-auto object-contain transition-opacity duration-700"
              />
            </div>
          </div>

        </div>

        {/* RIGHT SIDE - Desktop only */}
        <div className="hidden lg:flex flex-col flex-1 items-start max-w-lg">
          <h2 className="text-3xl lg:text-[3rem] font-extrabold mb-4 text-left">
            <span className="text-black">We Are Proud Of</span>
            <span className="text-red-500">....</span>
          </h2>
          <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg">
            <img
              src={images[current]}
              alt="Thakur Dealings"
              className="w-full object-contain transition-opacity duration-700"
            />
          </div>
        </div>

      </div>

      {/* Popup - Lower Right */}
      {showPopup && (
        <div className="fixed bottom-4 right-4 bg-primary text-white rounded-xl shadow-lg p-4 flex items-center space-x-3 z-50 animate-slide-in">
          <span className="font-semibold">Want to Sell?</span>
          <Link href="/contact">
            <Button size="sm" className="bg-white text-primary hover:bg-gray-200 px-4 py-2">
              Contact Us
            </Button>
          </Link>
          <button onClick={() => setShowPopup(false)} className="text-white ml-2">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  )
}
