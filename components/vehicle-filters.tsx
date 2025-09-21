"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, X } from "lucide-react"

interface FilterState {
  search: string
  priceMin: string
  priceMax: string
  yearMin: string
  yearMax: string
  fuelType: string
  make: string
}

interface VehicleFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  vehicleType: "car" | "bike"
}

export function VehicleFilters({ filters, onFiltersChange, vehicleType }: VehicleFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      priceMin: "",
      priceMax: "",
      yearMin: "",
      yearMax: "",
      fuelType: "",
      make: "",
    })
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

  const makes = vehicleType === "car" ? carMakes : bikeMakes

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={`Search ${vehicleType}s...`}
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </Button>

        {(filters.priceMin ||
          filters.priceMax ||
          filters.yearMin ||
          filters.yearMax ||
          filters.fuelType ||
          filters.make) && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter {vehicleType === "car" ? "Cars" : "Bikes"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Price Range */}
            <div className="space-y-2">
              <Label>Price Range</Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Input
                    placeholder="Min Price"
                    value={filters.priceMin}
                    onChange={(e) => handleFilterChange("priceMin", e.target.value)}
                    type="number"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Max Price"
                    value={filters.priceMax}
                    onChange={(e) => handleFilterChange("priceMax", e.target.value)}
                    type="number"
                  />
                </div>
              </div>
            </div>

            {/* Year Range */}
            <div className="space-y-2">
              <Label>Year Range</Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Input
                    placeholder="Min Year"
                    value={filters.yearMin}
                    onChange={(e) => handleFilterChange("yearMin", e.target.value)}
                    type="number"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Max Year"
                    value={filters.yearMax}
                    onChange={(e) => handleFilterChange("yearMax", e.target.value)}
                    type="number"
                  />
                </div>
              </div>
            </div>

            {/* Make */}
            <div className="space-y-2">
              <Label>Make</Label>
              <Select value={filters.make} onValueChange={(value) => handleFilterChange("make", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Make" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Makes</SelectItem>
                  {makes.map((make) => (
                    <SelectItem key={make} value={make}>
                      {make}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Fuel Type */}
            <div className="space-y-2">
              <Label>Fuel Type</Label>
              <Select value={filters.fuelType} onValueChange={(value) => handleFilterChange("fuelType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Fuel Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="petrol">Petrol</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
