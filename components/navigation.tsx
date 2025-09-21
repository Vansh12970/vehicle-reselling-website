"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Car, Bike, Heart, Phone, LogIn, LogOut, User } from "lucide-react"
import Image from "next/image"


export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState<"user" | "admin" | null>(null)

  useEffect(() => {
    // Check login status from localStorage
    const loginStatus = localStorage.getItem("isLoggedIn")
    const userTypeStored = localStorage.getItem("userType") as "user" | "admin" | null
    if (loginStatus === "true") {
      setIsLoggedIn(true)
      setUserType(userTypeStored)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userType")
    setIsLoggedIn(false)
    setUserType(null)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200" style={{ backgroundColor: "#ffffff" }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-16 h-16">
              <Image
                src="/thakur-dealings-logo.jpg"
                alt="Thakur Dealings Logo"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          <span className="thakur-branding text-[10px] tracking-wide leading-none">
  Thakur Dealings
</span>

          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="transition-colors" style={{ color: "#374151" }}>
              Home
            </Link>
            <Link
              href="/buy-car"
              className="flex items-center space-x-1 transition-colors"
              style={{ color: "#374151" }}
            >
              <Car className="h-4 w-4" />
              <span style={{ color: "#374151" }}>Buy Car</span>
            </Link>
            <Link
              href="/buy-bike"
              className="flex items-center space-x-1 transition-colors"
              style={{ color: "#374151" }}
            >
              <Bike className="h-4 w-4" />
              <span style={{ color: "#374151" }}>Buy Bike</span>
            </Link>
            <Link
              href="/favorites"
              className="flex items-center space-x-1 transition-colors"
              style={{ color: "#374151" }}
            >
              <Heart className="h-4 w-4" />
              <span style={{ color: "#374151" }}>Favorites</span>
            </Link>
            {isLoggedIn && userType === "admin" && (
              <Link href="/sell" className="flex items-center space-x-1 transition-colors" style={{ color: "#374151" }}>
                <span style={{ color: "#374151" }}>Sell Vehicle</span>
              </Link>
            )}
            <Link
              href="/contact"
              className="flex items-center space-x-1 transition-colors"
              style={{ color: "#374151" }}
            >
              <Phone className="h-4 w-4" />
              <span style={{ color: "#374151" }}>Contact Us</span>
            </Link>
            {!isLoggedIn ? (
              <Link
                href="/login"
                className="flex items-center space-x-1 transition-colors"
                style={{ color: "#374151" }}
              >
                <LogIn className="h-4 w-4" />
                <span style={{ color: "#374151" }}>Login</span>
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1 text-sm" style={{ color: "#6b7280" }}>
                  <User className="h-4 w-4" />
                  <span style={{ color: "#6b7280" }}>{userType === "admin" ? "Admin" : "User"}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                  style={{ color: "#374151" }}
                >
                  <LogOut className="h-4 w-4" />
                  <span style={{ color: "#374151" }}>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ color: "#374151" }}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="transition-colors" style={{ color: "#374151" }}>
                Home
              </Link>
              <Link
                href="/buy-car"
                className="flex items-center space-x-2 transition-colors"
                style={{ color: "#374151" }}
              >
                <Car className="h-4 w-4" />
                <span style={{ color: "#374151" }}>Buy Car</span>
              </Link>
              <Link
                href="/buy-bike"
                className="flex items-center space-x-2 transition-colors"
                style={{ color: "#374151" }}
              >
                <Bike className="h-4 w-4" />
                <span style={{ color: "#374151" }}>Buy Bike</span>
              </Link>
              <Link
                href="/favorites"
                className="flex items-center space-x-2 transition-colors"
                style={{ color: "#374151" }}
              >
                <Heart className="h-4 w-4" />
                <span style={{ color: "#374151" }}>Favorites</span>
              </Link>
              {isLoggedIn && userType === "admin" && (
                <Link
                  href="/sell"
                  className="flex items-center space-x-2 transition-colors"
                  style={{ color: "#374151" }}
                >
                  <span style={{ color: "#374151" }}>Sell Vehicle</span>
                </Link>
              )}
              <Link
                href="/contact"
                className="flex items-center space-x-2 transition-colors"
                style={{ color: "#374151" }}
              >
                <Phone className="h-4 w-4" />
                <span style={{ color: "#374151" }}>Contact Us</span>
              </Link>
              {!isLoggedIn ? (
                <Link
                  href="/login"
                  className="flex items-center space-x-2 transition-colors"
                  style={{ color: "#374151" }}
                >
                  <LogIn className="h-4 w-4" />
                  <span style={{ color: "#374151" }}>Login</span>
                </Link>
              ) : (
                <div className="flex flex-col space-y-2">
                  <span className="flex items-center space-x-2 text-sm" style={{ color: "#6b7280" }}>
                    <User className="h-4 w-4" />
                    <span style={{ color: "#6b7280" }}>{userType === "admin" ? "Admin" : "User"}</span>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 justify-start px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                    style={{ color: "#374151" }}
                  >
                    <LogOut className="h-4 w-4" />
                    <span style={{ color: "#374151" }}>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
