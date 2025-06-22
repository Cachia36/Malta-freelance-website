"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Star, Briefcase, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import { EnvCheck } from "@/components/env-check"

const featuredServices = [
  {
    id: 1,
    title: "Professional Photography",
    description: "Wedding and event photography across Malta",
    price: "€150",
    rating: 4.9,
    reviews: 127,
    location: "Valletta",
    category: "Photography",
    image: "/placeholder.svg?height=200&width=300",
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
    image: "/placeholder.svg?height=200&width=300",
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
    image: "/placeholder.svg?height=200&width=300",
  },
]

const categories = [
  { name: "Technology", icon: "💻", count: 234 },
  { name: "Cleaning", icon: "🧹", count: 189 },
  { name: "Photography", icon: "📸", count: 156 },
  { name: "Tutoring", icon: "📚", count: 143 },
  { name: "Handyman", icon: "🔧", count: 198 },
  { name: "Beauty", icon: "💄", count: 87 },
  { name: "Fitness", icon: "💪", count: 76 },
  { name: "Catering", icon: "🍽️", count: 65 },
]

export default function HomePage() {
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-primary">
                MaltaServices
              </Link>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                <MapPin className="w-3 h-3 mr-1" />
                Malta
              </Badge>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/browse" className="text-sm font-medium hover:text-primary">
                Browse Services
              </Link>
              <Link href="/post-service" className="text-sm font-medium hover:text-primary">
                Offer Service
              </Link>
              <Link href="/post-request" className="text-sm font-medium hover:text-primary">
                Request Service
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              {user ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost" size="sm">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: "/" })}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/signin">
                    <Button variant="ghost" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button size="sm">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Environment Check */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <EnvCheck />
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Local Services in <span className="text-primary">Malta</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Connect with skilled professionals and service providers across Malta. From home repairs to digital
              services, find exactly what you need locally.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input placeholder="What service do you need?" className="pl-10 h-12 text-lg" />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input placeholder="Location in Malta" className="pl-10 h-12 text-lg sm:w-48" />
                </div>
                <Button size="lg" className="h-12 px-8">
                  Search
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-gray-600">Active Services</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1,200+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover services across various categories, all provided by local professionals in Malta
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} services</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Top-rated services from verified professionals across Malta
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
                  <Badge className="absolute top-3 left-3">{service.category}</Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{service.title}</h3>
                    <div className="text-lg font-bold text-primary">{service.price}</div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>

                  <div className="flex items-center justify-between text-sm">
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
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting started is simple. Whether you're offering services or looking for help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* For Service Seekers */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-center">Looking for a Service?</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Search & Browse</h4>
                    <p className="text-gray-600 text-sm">Find services by category or search for specific needs</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Compare & Contact</h4>
                    <p className="text-gray-600 text-sm">Review profiles, ratings, and contact service providers</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Book & Pay</h4>
                    <p className="text-gray-600 text-sm">Secure booking and payment through our platform</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Service Providers */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-center">Offering a Service?</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Create Profile</h4>
                    <p className="text-gray-600 text-sm">Set up your professional profile with photos and details</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">List Services</h4>
                    <p className="text-gray-600 text-sm">Add your services with pricing and availability</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Get Booked</h4>
                    <p className="text-gray-600 text-sm">Receive bookings and grow your local business</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join Malta's growing community of service providers and customers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-primary">
              <Briefcase className="w-5 h-5 mr-2" />
              Offer Your Services
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Search className="w-5 h-5 mr-2" />
              Find Services
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MaltaServices</h3>
              <p className="text-gray-400 text-sm">
                Connecting Malta's local service providers with customers who need them.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Customers</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/browse" className="hover:text-white">
                    Browse Services
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white">
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Providers</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/become-provider" className="hover:text-white">
                    Become a Provider
                  </Link>
                </li>
                <li>
                  <Link href="/provider-resources" className="hover:text-white">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/provider-support" className="hover:text-white">
                    Provider Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 MaltaServices. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
