"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Star, SlidersHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const services = [
  {
    id: 1,
    title: "Professional Photography",
    description: "Wedding and event photography across Malta",
    price: "€150",
    rating: 4.9,
    reviews: 127,
    location: "Valletta",
    category: "Photography",
    provider: "John Doe",
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
  },
  {
    id: 2,
    title: "Home Cleaning Service",
    description: "Reliable house cleaning in Sliema area",
    price: "€25/hour",
    rating: 4.8,
    reviews: 89,
    location: "Sliema",
    category: "Cleaning",
    provider: "Maria Borg",
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
  },
  {
    id: 3,
    title: "Web Development",
    description: "Custom websites and web applications",
    price: "€500",
    rating: 5.0,
    reviews: 45,
    location: "St. Julian's",
    category: "Technology",
    provider: "Tech Solutions Malta",
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
  },
  {
    id: 4,
    title: "Personal Fitness Training",
    description: "One-on-one fitness coaching and nutrition guidance",
    price: "€40/session",
    rating: 4.7,
    reviews: 63,
    location: "Msida",
    category: "Fitness",
    provider: "Sarah Fitness",
    image: "/placeholder.svg?height=200&width=300",
    verified: false,
  },
  {
    id: 5,
    title: "Handyman Services",
    description: "General repairs and maintenance for your home",
    price: "€30/hour",
    rating: 4.6,
    reviews: 112,
    location: "Birkirkara",
    category: "Handyman",
    provider: "Fix-It Malta",
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
  },
  {
    id: 6,
    title: "English Tutoring",
    description: "Private English lessons for all levels",
    price: "€20/hour",
    rating: 4.9,
    reviews: 78,
    location: "Gzira",
    category: "Tutoring",
    provider: "Emma Teaching",
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
  },
]

const categories = ["All", "Photography", "Cleaning", "Technology", "Fitness", "Handyman", "Tutoring"]
const locations = ["All Locations", "Valletta", "Sliema", "St. Julian's", "Msida", "Birkirkara", "Gzira"]

export default function BrowseServices() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [sortBy, setSortBy] = useState("rating")

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory
    const matchesLocation = selectedLocation === "All Locations" || service.location === selectedLocation

    return matchesSearch && matchesCategory && matchesLocation
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-primary">
              MaltaServices
            </Link>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button size="sm">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Services</h1>
          <p className="text-gray-600">Find the perfect service provider for your needs in Malta</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">{filteredServices.length} services found</p>
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative h-48">
                <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
                <Badge className="absolute top-3 left-3">{service.category}</Badge>
                {service.verified && (
                  <Badge variant="secondary" className="absolute top-3 right-3 bg-green-100 text-green-800">
                    Verified
                  </Badge>
                )}
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg line-clamp-1">{service.title}</h3>
                  <div className="text-lg font-bold text-primary">{service.price}</div>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>

                <div className="flex items-center justify-between text-sm mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{service.rating}</span>
                    <span className="text-gray-500">({service.reviews})</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    {service.location}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">by {service.provider}</p>
                  <Button size="sm">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Services
          </Button>
        </div>
      </div>
    </div>
  )
}
