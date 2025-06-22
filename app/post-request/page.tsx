"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Euro, AlertCircle } from "lucide-react"
import Link from "next/link"

const categories = [
  "Photography",
  "Cleaning",
  "Technology",
  "Fitness",
  "Handyman",
  "Tutoring",
  "Beauty",
  "Catering",
  "Transportation",
  "Pet Care",
]

const locations = [
  "Valletta",
  "Sliema",
  "St. Julian's",
  "Msida",
  "Birkirkara",
  "Gzira",
  "Hamrun",
  "Qormi",
  "Zabbar",
  "Fgura",
  "Paola",
  "Tarxien",
]

const urgencyLevels = [
  { value: "flexible", label: "Flexible - Within a month", color: "bg-green-100 text-green-800" },
  { value: "soon", label: "Soon - Within a week", color: "bg-yellow-100 text-yellow-800" },
  { value: "urgent", label: "Urgent - Within 24 hours", color: "bg-red-100 text-red-800" },
]

export default function PostRequest() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [urgency, setUrgency] = useState("")
  const [budgetType, setBudgetType] = useState("fixed")

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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Request a Service</h1>
            <p className="text-gray-600">Tell us what you need and get quotes from local service providers</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Service Details */}
              <Card>
                <CardHeader>
                  <CardTitle>What do you need?</CardTitle>
                  <CardDescription>Describe the service you're looking for</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Request Title</Label>
                    <Input id="title" placeholder="e.g., Need a photographer for wedding" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Detailed Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide as much detail as possible about what you need..."
                      className="mt-1 min-h-[120px]"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Location & Timing */}
              <Card>
                <CardHeader>
                  <CardTitle>Location & Timing</CardTitle>
                  <CardDescription>Where and when do you need this service?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="address">Specific Address (Optional)</Label>
                    <Input id="address" placeholder="Street address or area details" className="mt-1" />
                  </div>

                  <div>
                    <Label>When do you need this?</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div>
                        <Label htmlFor="date" className="text-sm">
                          Preferred Date
                        </Label>
                        <Input id="date" type="date" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="time" className="text-sm">
                          Preferred Time
                        </Label>
                        <Input id="time" type="time" className="mt-1" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Urgency Level</Label>
                    <div className="space-y-2 mt-2">
                      {urgencyLevels.map((level) => (
                        <div key={level.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={level.value}
                            checked={urgency === level.value}
                            onCheckedChange={() => setUrgency(level.value)}
                          />
                          <Label htmlFor={level.value} className="flex items-center space-x-2">
                            <span>{level.label}</span>
                            <Badge className={level.color}>{level.label.split(" - ")[0]}</Badge>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Budget */}
              <Card>
                <CardHeader>
                  <CardTitle>Budget</CardTitle>
                  <CardDescription>What's your budget for this service?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Budget Type</Label>
                    <div className="flex gap-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="fixed-budget"
                          checked={budgetType === "fixed"}
                          onCheckedChange={() => setBudgetType("fixed")}
                        />
                        <Label htmlFor="fixed-budget">Fixed Budget</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hourly-budget"
                          checked={budgetType === "hourly"}
                          onCheckedChange={() => setBudgetType("hourly")}
                        />
                        <Label htmlFor="hourly-budget">Hourly Rate</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="negotiable"
                          checked={budgetType === "negotiable"}
                          onCheckedChange={() => setBudgetType("negotiable")}
                        />
                        <Label htmlFor="negotiable">Negotiable</Label>
                      </div>
                    </div>
                  </div>

                  {budgetType !== "negotiable" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="min-budget">Minimum Budget (€)</Label>
                        <div className="relative mt-1">
                          <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input id="min-budget" type="number" placeholder="0.00" className="pl-10" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="max-budget">Maximum Budget (€)</Label>
                        <div className="relative mt-1">
                          <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input id="max-budget" type="number" placeholder="0.00" className="pl-10" />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Additional Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Requirements</CardTitle>
                  <CardDescription>Any special requirements or preferences?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="requirements">Special Requirements</Label>
                    <Textarea
                      id="requirements"
                      placeholder="e.g., Must have insurance, Need references, Specific equipment required..."
                      className="mt-1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Preferences</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="verified-only" />
                        <Label htmlFor="verified-only">Only verified service providers</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="insured" />
                        <Label htmlFor="insured">Must have insurance</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="references" />
                        <Label htmlFor="references">Must provide references</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* How it Works */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How it Works</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                        1
                      </div>
                      <div>
                        <p className="font-medium text-sm">Post Your Request</p>
                        <p className="text-xs text-gray-600">Describe what you need</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-sm">Receive Quotes</p>
                        <p className="text-xs text-gray-600">Get offers from providers</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-sm">Choose & Book</p>
                        <p className="text-xs text-gray-600">Select the best offer</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-blue-500" />
                    Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Be specific about your needs</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Set a realistic budget</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Include photos if helpful</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Respond quickly to quotes</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  Post Request
                </Button>
                <Button variant="outline" className="w-full">
                  Save as Draft
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
