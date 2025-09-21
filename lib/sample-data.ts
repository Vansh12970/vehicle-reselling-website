// Sample vehicle data for demonstration
export const sampleCars = [
  {
    id: "1",
    title: "2020 Maruti Suzuki Swift VXI",
    make: "Maruti Suzuki",
    model: "Swift",
    year: 2020,
    price: 650000,
    run: 25000,
    fuelType: "Petrol" as const,
    color: "Red",
    location: "Mumbai",
    images: [
      "/placeholder-j6zls.png",
      "/red-maruti-swift-car-side-view.jpg",
      "/red-maruti-swift-car-interior.jpg",
      "/red-maruti-swift-car-rear-view.jpg",
    ],
    type: "car" as const,
  },
  {
    id: "2",
    title: "2019 Hyundai Creta SX",
    make: "Hyundai",
    model: "Creta",
    year: 2019,
    price: 1200000,
    run: 35000,
    fuelType: "Diesel" as const,
    color: "White",
    location: "Delhi",
    images: [
      "/white-hyundai-creta-suv-front-view.jpg",
      "/white-hyundai-creta-suv-side-view.jpg",
      "/white-hyundai-creta-suv-interior-dashboard.jpg",
      "/white-hyundai-creta-suv-rear-view.jpg",
    ],
    type: "car" as const,
  },
  {
    id: "3",
    title: "2021 Tata Nexon EV Max",
    make: "Tata",
    model: "Nexon EV",
    year: 2021,
    price: 1400000,
    run: 15000,
    fuelType: "Electric" as const,
    color: "Blue",
    location: "Bangalore",
    images: [
      "/blue-tata-nexon-electric-suv-front-view.jpg",
      "/blue-tata-nexon-electric-suv-side-view.jpg",
      "/blue-tata-nexon-electric-suv-interior.jpg",
      "/blue-tata-nexon-electric-suv-charging-port.jpg",
    ],
    type: "car" as const,
  },
  {
    id: "4",
    title: "2018 Honda City VX",
    make: "Honda",
    model: "City",
    year: 2018,
    price: 850000,
    run: 45000,
    fuelType: "Petrol" as const,
    color: "Silver",
    location: "Pune",
    images: [
      "/silver-honda-city-sedan-front-view.jpg",
      "/silver-honda-city-sedan-side-view.jpg",
      "/silver-honda-city-sedan-interior.jpg",
      "/placeholder.svg?height=300&width=400",
    ],
    type: "car" as const,
  },
  {
    id: "5",
    title: "2022 Mahindra XUV700 AX7",
    make: "Mahindra",
    model: "XUV700",
    year: 2022,
    price: 2200000,
    run: 12000,
    fuelType: "Diesel" as const,
    color: "Black",
    location: "Chennai",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    type: "car" as const,
  },
  {
    id: "6",
    title: "2020 Toyota Innova Crysta",
    make: "Toyota",
    model: "Innova Crysta",
    year: 2020,
    price: 1800000,
    run: 28000,
    fuelType: "Diesel" as const,
    color: "Grey",
    location: "Hyderabad",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    type: "car" as const,
  },
]

export const sampleBikes = [
  {
    id: "7",
    title: "2021 Royal Enfield Classic 350",
    make: "Royal Enfield",
    model: "Classic 350",
    year: 2021,
    price: 180000,
    run: 8000,
    fuelType: "Petrol" as const,
    color: "Black",
    location: "Mumbai",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    type: "bike" as const,
  },
  {
    id: "8",
    title: "2020 Honda CB Shine SP",
    make: "Honda",
    model: "CB Shine SP",
    year: 2020,
    price: 75000,
    run: 15000,
    fuelType: "Petrol" as const,
    color: "Red",
    location: "Delhi",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    type: "bike" as const,
  },
  {
    id: "9",
    title: "2022 KTM Duke 390",
    make: "KTM",
    model: "Duke 390",
    year: 2022,
    price: 280000,
    run: 5000,
    fuelType: "Petrol" as const,
    color: "Orange",
    location: "Bangalore",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    type: "bike" as const,
  },
  {
    id: "10",
    title: "2019 Bajaj Pulsar NS200",
    make: "Bajaj",
    model: "Pulsar NS200",
    year: 2019,
    price: 120000,
    run: 22000,
    fuelType: "Petrol" as const,
    color: "Blue",
    location: "Pune",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    type: "bike" as const,
  },
  {
    id: "11",
    title: "2021 Yamaha FZ-S V3",
    make: "Yamaha",
    model: "FZ-S V3",
    year: 2021,
    price: 110000,
    run: 12000,
    fuelType: "Petrol" as const,
    color: "White",
    location: "Chennai",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    type: "bike" as const,
  },
  {
    id: "12",
    title: "2020 TVS Apache RTR 160 4V",
    make: "TVS",
    model: "Apache RTR 160 4V",
    year: 2020,
    price: 95000,
    run: 18000,
    fuelType: "Petrol" as const,
    color: "Black",
    location: "Hyderabad",
    images: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    type: "bike" as const,
  },
]

export const getUserVehicles = () => {
  if (typeof window !== "undefined") {
    const userVehicles = localStorage.getItem("userVehicles")
    return userVehicles ? JSON.parse(userVehicles) : []
  }
  return []
}

export const deleteUserVehicle = (vehicleId: string) => {
  if (typeof window !== "undefined") {
    const userVehicles = getUserVehicles()
    const updatedVehicles = userVehicles.filter((v: any) => v.id !== vehicleId)
    localStorage.setItem("userVehicles", JSON.stringify(updatedVehicles))
    return true
  }
  return false
}

export const getAllVehicles = () => {
  const userVehicles = getUserVehicles()
  return {
    cars: [...sampleCars, ...userVehicles.filter((v: any) => v.type === "car")],
    bikes: [...sampleBikes, ...userVehicles.filter((v: any) => v.type === "bike")],
  }
}
