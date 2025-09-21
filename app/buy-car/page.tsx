"use client"

import { useState, useMemo, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { VehicleCard } from "@/components/vehicle-card"
import { VehicleFilters } from "@/components/vehicle-filters"
import { ContactSellerModal } from "@/components/contact-seller-modal"
import { getAllVehicles, deleteUserVehicle } from "@/lib/sample-data"
import { Car } from "lucide-react"

interface FilterState {
  search: string
  priceMin: string
  priceMax: string
  yearMin: string
  yearMax: string
  fuelType: string
  make: string
}

export default function BuyCarPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    priceMin: "",
    priceMax: "",
    yearMin: "",
    yearMax: "",
    fuelType: "",
    make: "",
  })

  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("favorites")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const [allCars, setAllCars] = useState<any[]>([])
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  useEffect(() => {
    // Load all cars including user-added ones
    const { cars } = getAllVehicles()
    setAllCars(cars)
  }, [])

  const filteredCars = useMemo(() => {
    return allCars.filter((car) => {
      // Search filter
      if (
        filters.search &&
        !car.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !car.make.toLowerCase().includes(filters.search.toLowerCase()) &&
        !car.model.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false
      }

      // Price filters
      if (filters.priceMin && car.price < Number.parseInt(filters.priceMin)) return false
      if (filters.priceMax && car.price > Number.parseInt(filters.priceMax)) return false

      // Year filters
      if (filters.yearMin && car.year < Number.parseInt(filters.yearMin)) return false
      if (filters.yearMax && car.year > Number.parseInt(filters.yearMax)) return false

      // Fuel type filter
      if (filters.fuelType && car.fuelType !== filters.fuelType) return false

      // Make filter
      if (filters.make && car.make !== filters.make) return false

      return true
    })
  }, [filters, allCars])

  const handleAddToFavorites = (vehicle: any) => {
    const newFavorites = favorites.includes(vehicle.id)
      ? favorites.filter((id) => id !== vehicle.id)
      : [...favorites, vehicle.id]

    setFavorites(newFavorites)
    localStorage.setItem("favorites", JSON.stringify(newFavorites))
  }

  const handleContactSeller = (vehicle: any) => {
    setSelectedVehicle(vehicle)
    setIsContactModalOpen(true)
  }

  const handleDeleteVehicle = (vehicleId: string) => {
    // Only allow deletion of user-added vehicles (not sample data)
    const userVehicles = JSON.parse(localStorage.getItem("userVehicles") || "[]")
    const vehicleExists = userVehicles.some((v: any) => v.id === vehicleId)

    if (vehicleExists) {
      deleteUserVehicle(vehicleId)
      // Refresh the cars list
      const { cars } = getAllVehicles()
      setAllCars(cars)
    } else {
      alert("Cannot delete sample vehicles. Only admin-added vehicles can be deleted.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-primary text-primary-foreground p-3 rounded-lg">
            <Car className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Buy Cars</h1>
            <p className="text-muted-foreground">Find your perfect car from our collection</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <VehicleFilters filters={filters} onFiltersChange={setFilters} vehicleType="car" />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                {filteredCars.length} car{filteredCars.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {filteredCars.length === 0 ? (
              <div className="text-center py-12">
                <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No cars found</h3>
                <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <VehicleCard
                    key={car.id}
                    vehicle={car}
                    onAddToFavorites={handleAddToFavorites}
                    onContactSeller={handleContactSeller}
                    onDeleteVehicle={handleDeleteVehicle}
                    isFavorite={favorites.includes(car.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
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
