"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { VehicleCard } from "@/components/vehicle-card"
import { ContactSellerModal } from "@/components/contact-seller-modal"
import { sampleCars, sampleBikes } from "@/lib/sample-data"
import { Heart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [favoriteVehicles, setFavoriteVehicles] = useState<any[]>([])
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("favorites")
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites)
      setFavorites(favoriteIds)

      // Get the actual vehicle data for favorites
      const allVehicles = [...sampleCars, ...sampleBikes]
      const favoriteVehicleData = allVehicles.filter((vehicle) => favoriteIds.includes(vehicle.id))
      setFavoriteVehicles(favoriteVehicleData)
    }
  }, [])

  const handleRemoveFromFavorites = (vehicle: any) => {
    const newFavorites = favorites.filter((id) => id !== vehicle.id)
    setFavorites(newFavorites)
    setFavoriteVehicles(favoriteVehicles.filter((v) => v.id !== vehicle.id))
    localStorage.setItem("favorites", JSON.stringify(newFavorites))
  }

  const handleContactSeller = (vehicle: any) => {
    setSelectedVehicle(vehicle)
    setIsContactModalOpen(true)
  }

  const clearAllFavorites = () => {
    setFavorites([])
    setFavoriteVehicles([])
    localStorage.removeItem("favorites")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-primary text-primary-foreground p-3 rounded-lg">
              <Heart className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Favorites</h1>
              <p className="text-muted-foreground">
                {favoriteVehicles.length} vehicle{favoriteVehicles.length !== 1 ? "s" : ""} saved
              </p>
            </div>
          </div>

          {favoriteVehicles.length > 0 && (
            <Button
              variant="outline"
              onClick={clearAllFavorites}
              className="flex items-center space-x-2 bg-transparent"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear All</span>
            </Button>
          )}
        </div>

        {favoriteVehicles.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-muted rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">No favorites yet</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Start browsing cars and bikes to add them to your favorites. Click the heart icon on any vehicle card to
              save it here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="/buy-car">Browse Cars</a>
              </Button>
              <Button variant="secondary" asChild>
                <a href="/buy-bike">Browse Bikes</a>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onAddToFavorites={handleRemoveFromFavorites}
                onContactSeller={handleContactSeller}
                isFavorite={true}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />

      {/* Contact Seller Modal */}
      <ContactSellerModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        vehicle={selectedVehicle}
      />
    </div>
  )
}
