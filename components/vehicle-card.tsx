"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ChevronLeft, ChevronRight, Fuel, Calendar, Palette, MapPin, Trash2 } from "lucide-react"
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // your Firebase Firestore instance

interface Vehicle {
  id: string
  title: string
  make: string
  model: string
  year: number
  price: number
  run: number
  fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid"
  color: string
  location: string
  images: string[]
  type: "car" | "bike"
}

interface VehicleCardProps {
  vehicle: Vehicle
  onAddToFavorites: (vehicle: Vehicle) => void
  onContactSeller: (vehicle: Vehicle) => void
  onDeleteVehicle?: (vehicleId: string) => void
  isFavorite?: boolean
}

export function VehicleCard({
  vehicle,
  onAddToFavorites,
  onContactSeller,
  onDeleteVehicle,
  isFavorite = false,
}: VehicleCardProps) {
const [currentImageIndex, setCurrentImageIndex] = useState(0)
const [isAdmin, setIsAdmin] = useState(false)
const [isImageModalOpen, setIsImageModalOpen] = useState(false)
const [modalImageIndex, setModalImageIndex] = useState(0)

  useEffect(() => {
    // Check if user is admin
    const userType = localStorage.getItem("userType")
    setIsAdmin(userType === "admin")
  }, [])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % vehicle.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length)
  }

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`
    } else {
      return `₹${price.toLocaleString()}`
    }
  }

  const formatRun = (run: number) => {
    if (run >= 100000) {
      return `${(run / 100000).toFixed(1)}L km`
    } else if (run >= 1000) {
      return `${(run / 1000).toFixed(0)}K km`
    } else {
      return `${run} km`
    }
  }

  const handleDelete = async () => {
  if (onDeleteVehicle && window.confirm(`Are you sure you want to delete "${vehicle.title}"?`)) {
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, "vehicles", vehicle.id));
      // Call parent callback
      onDeleteVehicle(vehicle.id);
    } catch (err) {
      console.error("Failed to delete vehicle:", err);
      alert("Failed to delete vehicle. Please try again.");
    }
  }
};


  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        {/* Image Gallery */}
        <div className="relative h-48 bg-muted">
          <Image
  src={vehicle.images[currentImageIndex] || "/placeholder.svg"}
  alt={vehicle.title}
  fill
  className="object-cover cursor-pointer"
  onClick={() => {
    setModalImageIndex(currentImageIndex)
    setIsImageModalOpen(true)
  }}
/>


          {/* Image Navigation */}
          {vehicle.images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              {/* Image Indicators */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                {vehicle.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? "bg-primary" : "bg-background/60"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 bg-background/80 hover:bg-background/90"
            onClick={() => onAddToFavorites(vehicle)}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          </Button>

          {isAdmin && onDeleteVehicle && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-12 bg-red-500/80 hover:bg-red-500/90 text-white"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}

          {/* Vehicle Type Badge */}
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
            {vehicle.type === "car" ? "Car" : "Bike"}
          </Badge>
        </div>

        <CardContent className="p-4">
          {/* Title and Price */}
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-lg text-foreground line-clamp-1">{vehicle.title}</h3>
              <p className="text-sm text-muted-foreground">
                {vehicle.make} {vehicle.model} • {vehicle.year}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-xl text-primary">{formatPrice(vehicle.price)}</p>
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{formatRun(vehicle.run)}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Fuel className="h-4 w-4" />
              <span>{vehicle.fuelType}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Palette className="h-4 w-4" />
              <span>{vehicle.color}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{vehicle.location}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button className="flex-1" onClick={() => onContactSeller(vehicle)}>
              Contact Seller
            </Button>
          </div>
        </CardContent>
      </div>
      {isImageModalOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    onClick={() => setIsImageModalOpen(false)}
  >
    <div className="relative max-w-3xl w-full p-4">
      <Image
        src={vehicle.images[modalImageIndex] || "/placeholder.svg"}
        alt={vehicle.title}
        width={800}
        height={600}
        className="object-contain rounded"
      />
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 text-white"
        onClick={() => setIsImageModalOpen(false)}
      >
        ✕
      </Button>

      {vehicle.images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-2 top-1/2 -translate-y-1/2 text-white"
            onClick={(e) => {
              e.stopPropagation()
              setModalImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length)
            }}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white"
            onClick={(e) => {
              e.stopPropagation()
              setModalImageIndex((prev) => (prev + 1) % vehicle.images.length)
            }}
          >
            <ChevronRight />
          </Button>
        </>
      )}
    </div>
  </div>
)}

    </Card>
  )
}
