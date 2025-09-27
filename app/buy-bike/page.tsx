"use client"

import { useState, useMemo, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { VehicleCard } from "@/components/vehicle-card"
import { VehicleFilters } from "@/components/vehicle-filters"
import { ContactSellerModal } from "@/components/contact-seller-modal"
import { Bike } from "lucide-react"
import { doc, deleteDoc, setDoc, collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { getAuth } from "firebase/auth"

interface FilterState {
  search: string
  priceMin: string
  priceMax: string
  yearMin: string
  yearMax: string
  fuelType: string
  make: string
}

interface VehicleImage {
  url: string;
  public_id: string;
}

interface Vehicle {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  run: number;
  fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  color: string;
  location: string;
  images: VehicleImage[];
  vehicleType: "car" | "bike";
}

export default function BuyBikePage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    priceMin: "",
    priceMax: "",
    yearMin: "",
    yearMax: "",
    fuelType: "",
    make: "",
  })

  const [favorites, setFavorites] = useState<string[]>([])
  const [allBikes, setAllBikes] = useState<Vehicle[]>([])
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const auth = getAuth()
  const user = auth.currentUser

  // Fetch bikes from Firestore
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const snapshot = await getDocs(collection(db, "vehicles"))
        const bikesData = snapshot.docs
          .map(doc => {
            const data = doc.data()
            let images: VehicleImage[] = []
            if (Array.isArray(data.images)) {
              images = data.images.map((img: any) =>
                typeof img === "string"
                  ? { url: img, public_id: "" }
                  : { url: img.url, public_id: img.public_id || "" }
              )
            }
            return {
              id: doc.id,
              title: data.title || "",
              make: data.make || "",
              model: data.model || "",
              year: data.year || 0,
              price: data.price || 0,
              run: data.run || 0,
              fuelType: data.fuelType || "Petrol",
              color: data.color || "",
              location: data.location || "",
              vehicleType: data.vehicleType || "bike",
              images,
            } as Vehicle
          })
          .filter(v => v.vehicleType === "bike")
        setAllBikes(bikesData)
      } catch (err) {
        console.error("Error fetching bikes:", err)
      }
    }
    fetchVehicles()
  }, [])

  // Fetch user favorites from Firestore
  useEffect(() => {
    if (!user) return
    const fetchFavorites = async () => {
      try {
        const favSnapshot = await getDocs(collection(db, "users", user.uid, "favorites"))
        const favIds = favSnapshot.docs.map(doc => doc.id)
        setFavorites(favIds)
      } catch (err) {
        console.error("Error fetching favorites:", err)
      }
    }
    fetchFavorites()
  }, [user])

  const filteredBikes = useMemo(() => {
    return allBikes.filter(bike => {
      if (
        filters.search &&
        !bike.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !bike.make.toLowerCase().includes(filters.search.toLowerCase()) &&
        !bike.model.toLowerCase().includes(filters.search.toLowerCase())
      ) return false
      if (filters.priceMin && bike.price < Number(filters.priceMin)) return false
      if (filters.priceMax && bike.price > Number(filters.priceMax)) return false
      if (filters.yearMin && bike.year < Number(filters.yearMin)) return false
      if (filters.yearMax && bike.year > Number(filters.yearMax)) return false
      if (filters.fuelType && bike.fuelType !== filters.fuelType) return false
      if (filters.make && bike.make !== filters.make) return false
      return true
    })
  }, [filters, allBikes])

  // Add/remove favorite in Firestore
  const handleAddToFavorites = async (vehicle: Vehicle) => {
    if (!user) {
      alert("Please log in to add favorites")
      return
    }
    const favRef = doc(db, "users", user.uid, "favorites", vehicle.id)
    try {
      if (favorites.includes(vehicle.id)) {
        setFavorites(prev => prev.filter(id => id !== vehicle.id))
        await deleteDoc(favRef)
      } else {
        setFavorites(prev => [...prev, vehicle.id])
        await setDoc(favRef, {
          vehicleType: vehicle.vehicleType,
          title: vehicle.title,
          price: vehicle.price,
          images: vehicle.images.map(img => img.url)
        })
      }
    } catch (err) {
      console.error("Error updating favorites:", err)
    }
  }

  const handleContactSeller = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle)
    setIsContactModalOpen(true)
  }

  const handleDeleteVehicle = async (vehicleId: string) => {
    if(!confirm("Are you sure you want to delete this vehicle?")) return
    try {
      await deleteDoc(doc(db, "vehicles", vehicleId))
      setAllBikes(prev => prev.filter(v => v.id !== vehicleId))
    } catch(err) {
      console.error(err)
      alert("Failed to delete vehicle.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-primary text-primary-foreground p-3 rounded-lg">
            <Bike className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Buy Bikes</h1>
            <p className="text-muted-foreground">Find your perfect bike from our collection</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <VehicleFilters filters={filters} onFiltersChange={setFilters} vehicleType="bike" />
          </div>

          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                {filteredBikes.length} bike{filteredBikes.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {filteredBikes.length === 0 ? (
              <div className="text-center py-12">
                <Bike className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No bikes found</h3>
                <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredBikes.map(bike => (
                  <VehicleCard
                    key={bike.id}
                    vehicle={bike}
                    onAddToFavorites={handleAddToFavorites}
                    onContactSeller={handleContactSeller}
                    onDeleteVehicle={handleDeleteVehicle}
                    isFavorite={favorites.includes(bike.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <ContactSellerModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        vehicle={selectedVehicle ? {
          id: selectedVehicle.id,
          title: selectedVehicle.title,
          price: selectedVehicle.price,
          location: selectedVehicle.location,
          images: selectedVehicle.images.map(img => img.url)
        } : null}
      />
    </div>
  )
}
