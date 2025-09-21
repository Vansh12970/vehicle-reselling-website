"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ImageUpload } from "@/components/image-upload"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Plus, Car, Bike, Lock, Shield, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

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
  description?: string
}

interface VehicleFormData {
  type: "car" | "bike"
  make: string
  model: string
  year: string
  run: string
  fuelType: string
  color: string
  price: string
  location: string
  description: string
  images: string[]
}

export default function SellPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState<"user" | "admin" | null>(null)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<VehicleFormData>({
    type: "car",
    make: "",
    model: "",
    year: "",
    run: "",
    fuelType: "",
    color: "",
    price: "",
    location: "",
    description: "",
    images: [],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn")
    const userTypeStored = localStorage.getItem("userType") as "user" | "admin" | null

    if (loginStatus === "true" && userTypeStored === "admin") {
      setIsLoggedIn(true)
      setUserType(userTypeStored)
      loadVehicles()
    } else {
      // Redirect non-admin users to login
      router.push("/login")
    }
  }, [router])

  const loadVehicles = () => {
    const existingVehicles = localStorage.getItem("userVehicles")
    if (existingVehicles) {
      setVehicles(JSON.parse(existingVehicles))
    }
  }

  const handleDeleteVehicle = (vehicleId: string) => {
    if (confirm("Are you sure you want to delete this vehicle?")) {
      const updatedVehicles = vehicles.filter((v) => v.id !== vehicleId)
      setVehicles(updatedVehicles)
      localStorage.setItem("userVehicles", JSON.stringify(updatedVehicles))
    }
  }

  const handleInputChange = (field: keyof VehicleFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleImagesChange = (images: string[]) => {
    setFormData((prev) => ({
      ...prev,
      images,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create new vehicle object
      const newVehicle = {
        id: Date.now().toString(),
        title: `${formData.year} ${formData.make} ${formData.model}`,
        make: formData.make,
        model: formData.model,
        year: Number.parseInt(formData.year),
        price: Number.parseInt(formData.price),
        run: Number.parseInt(formData.run),
        fuelType: formData.fuelType as "Petrol" | "Diesel" | "Electric" | "Hybrid",
        color: formData.color,
        location: formData.location,
        images: formData.images.length > 0 ? formData.images : ["/placeholder.svg?height=300&width=400"],
        type: formData.type,
        description: formData.description,
      }

      // Add new vehicle
      const updatedVehicles = [...vehicles, newVehicle]
      setVehicles(updatedVehicles)
      localStorage.setItem("userVehicles", JSON.stringify(updatedVehicles))

      // Show success message
      alert("Vehicle added successfully!")

      // Reset form and hide it
      setFormData({
        type: "car",
        make: "",
        model: "",
        year: "",
        run: "",
        fuelType: "",
        color: "",
        price: "",
        location: "",
        description: "",
        images: [],
      })
      setShowForm(false)
    } catch (error) {
      console.error("Error submitting vehicle:", error)
      alert("Error adding vehicle. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isLoggedIn || userType !== "admin") {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />

        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Admin Access Required</CardTitle>
              <p className="text-muted-foreground">
                Only authorized administrators can manage vehicles in Thakur Dealings inventory.
              </p>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push("/login")} className="w-full">
                <Lock className="h-4 w-4 mr-2" />
                Go to Login
              </Button>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    )
  }

  const carMakes = [
    "Maruti Suzuki",
    "Hyundai",
    "Tata",
    "Mahindra",
    "Honda",
    "Toyota",
    "Ford",
    "Volkswagen",
    "BMW",
    "Mercedes-Benz",
    "Audi",
  ]

  const bikeMakes = [
    "Hero",
    "Honda",
    "Bajaj",
    "TVS",
    "Yamaha",
    "Royal Enfield",
    "KTM",
    "Suzuki",
    "Kawasaki",
    "Harley-Davidson",
  ]

  const makes = formData.type === "car" ? carMakes : bikeMakes

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i)

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`
    } else {
      return `₹${price.toLocaleString()}`
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-primary text-primary-foreground p-3 rounded-lg">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-muted-foreground">Manage Thakur Dealings vehicle inventory</p>
            </div>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>{showForm ? "Cancel" : "Add Vehicle"}</span>
          </Button>
        </div>

        {!showForm && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Current Inventory ({vehicles.length} vehicles)</h2>
            {vehicles.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">No vehicles in inventory. Add your first vehicle!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                  <Card key={vehicle.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={vehicle.images[0] || "/placeholder.svg"}
                        alt={vehicle.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{vehicle.title}</h3>
                      <p className="text-primary font-bold text-xl mb-2">{formatPrice(vehicle.price)}</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        {vehicle.fuelType} • {vehicle.color} • {vehicle.location}
                      </p>
                      <div className="flex space-x-2">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteVehicle(vehicle.id)}
                          className="flex items-center space-x-1"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Delete</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Add Vehicle Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Vehicle Type */}
                <Card>
                  <CardHeader>
                    <CardTitle>Vehicle Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={formData.type}
                      onValueChange={(value) => handleInputChange("type", value)}
                      className="flex space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="car" id="car" />
                        <Label htmlFor="car" className="flex items-center space-x-2 cursor-pointer">
                          <Car className="h-4 w-4" />
                          <span>Car</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bike" id="bike" />
                        <Label htmlFor="bike" className="flex items-center space-x-2 cursor-pointer">
                          <Bike className="h-4 w-4" />
                          <span>Bike</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Basic Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="make">Make *</Label>
                        <Select value={formData.make} onValueChange={(value) => handleInputChange("make", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Make" />
                          </SelectTrigger>
                          <SelectContent>
                            {makes.map((make) => (
                              <SelectItem key={make} value={make}>
                                {make}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="model">Model *</Label>
                        <Input
                          id="model"
                          value={formData.model}
                          onChange={(e) => handleInputChange("model", e.target.value)}
                          placeholder="Enter model"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="year">Year *</Label>
                        <Select value={formData.year} onValueChange={(value) => handleInputChange("year", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Year" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="run">Run (km) *</Label>
                        <Input
                          id="run"
                          type="number"
                          value={formData.run}
                          onChange={(e) => handleInputChange("run", e.target.value)}
                          placeholder="Enter kilometers driven"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fuelType">Fuel Type *</Label>
                        <Select
                          value={formData.fuelType}
                          onValueChange={(value) => handleInputChange("fuelType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Fuel Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Petrol">Petrol</SelectItem>
                            <SelectItem value="Diesel">Diesel</SelectItem>
                            <SelectItem value="Electric">Electric</SelectItem>
                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="color">Color *</Label>
                        <Input
                          id="color"
                          value={formData.color}
                          onChange={(e) => handleInputChange("color", e.target.value)}
                          placeholder="Enter color"
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Pricing & Location */}
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing & Location</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price (₹) *</Label>
                        <Input
                          id="price"
                          type="number"
                          value={formData.price}
                          onChange={(e) => handleInputChange("price", e.target.value)}
                          placeholder="Enter price in rupees"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location *</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          placeholder="Enter city"
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label htmlFor="description">Additional Details</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Describe the vehicle's condition, features, service history, etc."
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Images Section */}
              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle>Vehicle Images (Max 5)</CardTitle>
                    <p className="text-sm text-muted-foreground">Upload 4-5 high-quality images of the vehicle</p>
                  </CardHeader>
                  <CardContent>
                    <ImageUpload images={formData.images} onImagesChange={handleImagesChange} maxImages={5} />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <Button type="submit" size="lg" disabled={isSubmitting} className="px-12">
                {isSubmitting ? "Adding Vehicle..." : "Add Vehicle to Inventory"}
              </Button>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  )
}
