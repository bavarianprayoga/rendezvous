"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, MapPin, Navigation, List, Layers } from "lucide-react"
import MainLayout from "@/components/main-layout"

type Venue = {
  id: string
  name: string
  category: string
  location: string
  lat: number
  lng: number
}

export default function MapPage() {
  const [venues] = useState<Venue[]>([
    {
      id: "1",
      name: "Coastal Coffee House",
      category: "cafe",
      location: "Oceanfront",
      lat: 34.0522,
      lng: -118.2437,
    },
    {
      id: "2",
      name: "Urban Rooftop Bar",
      category: "bar",
      location: "Downtown",
      lat: 34.0535,
      lng: -118.24,
    },
    {
      id: "3",
      name: "The Hidden Garden",
      category: "restaurant",
      location: "Parkside",
      lat: 34.05,
      lng: -118.245,
    },
    {
      id: "4",
      name: "Vinyl & Vino",
      category: "bar",
      location: "Arts District",
      lat: 34.055,
      lng: -118.238,
    },
    {
      id: "5",
      name: "Bytes & Bites",
      category: "cafe",
      location: "Tech Hub",
      lat: 34.051,
      lng: -118.242,
    },
  ])

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Map View</h1>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search for places nearby..." className="pl-10" />
          </div>

          <div className="relative h-[calc(100vh-200px)] rounded-md overflow-hidden bg-muted">
            <div className="absolute inset-0 flex items-center justify-center">
              <MapPin className="h-8 w-8 text-muted-foreground" />
              <span className="sr-only">Map placeholder</span>
            </div>

            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full shadow-md">
                <Navigation className="h-5 w-5" />
              </Button>
              <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full shadow-md">
                <Layers className="h-5 w-5" />
              </Button>
            </div>

            <div className="absolute bottom-4 right-4">
              <Button variant="secondary" size="sm" className="shadow-md">
                <List className="h-4 w-4 mr-2" />
                List View
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {venues.map((venue) => (
              <Card key={venue.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{venue.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {venue.location}
                      </div>
                    </div>
                    <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full">{venue.category}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
