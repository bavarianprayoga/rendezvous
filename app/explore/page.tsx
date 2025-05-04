"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  Filter,
  MapPin,
  Users,
  Coffee,
  Utensils,
  Wine,
  Music,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import MainLayout from "@/components/main-layout"

type Venue = {
  id: string
  name: string
  description: string
  category: string
  imageUrl: string
  location: string
  groupSize: string
  mood: string
  priceRange: string
  likes: number
  comments: number
}

export default function ExplorePage() {
  const [showFilters, setShowFilters] = useState(false)
  const [venues, setVenues] = useState<Venue[]>([
    {
      id: "1",
      name: "Coastal Coffee House",
      description: "A cozy spot with ocean views and amazing pastries",
      category: "cafe",
      imageUrl: "/placeholder.svg?height=600&width=800&text=Coastal+Coffee",
      location: "Oceanfront",
      groupSize: "small",
      mood: "relaxed",
      priceRange: "$$",
      likes: 124,
      comments: 18,
    },
    {
      id: "2",
      name: "Urban Rooftop Bar",
      description: "Stunning city views with craft cocktails and small plates",
      category: "bar",
      imageUrl: "/placeholder.svg?height=600&width=800&text=Urban+Rooftop",
      location: "Downtown",
      groupSize: "medium",
      mood: "lively",
      priceRange: "$$$",
      likes: 256,
      comments: 42,
    },
    {
      id: "3",
      name: "The Hidden Garden",
      description: "Secret garden restaurant with farm-to-table cuisine",
      category: "restaurant",
      imageUrl: "/placeholder.svg?height=600&width=800&text=Hidden+Garden",
      location: "Parkside",
      groupSize: "large",
      mood: "intimate",
      priceRange: "$$$",
      likes: 189,
      comments: 27,
    },
    {
      id: "4",
      name: "Vinyl & Vino",
      description: "Wine bar with record players and vintage vinyl collection",
      category: "bar",
      imageUrl: "/placeholder.svg?height=600&width=800&text=Vinyl+Vino",
      location: "Arts District",
      groupSize: "small",
      mood: "chill",
      priceRange: "$$",
      likes: 145,
      comments: 31,
    },
    {
      id: "5",
      name: "Bytes & Bites",
      description: "Tech-themed cafe with board games and fast wifi",
      category: "cafe",
      imageUrl: "/placeholder.svg?height=600&width=800&text=Bytes+Bites",
      location: "Tech Hub",
      groupSize: "medium",
      mood: "casual",
      priceRange: "$",
      likes: 98,
      comments: 15,
    },
    {
      id: "6",
      name: "Skyline Lounge",
      description: "Elegant rooftop lounge with panoramic city views",
      category: "bar",
      imageUrl: "/placeholder.svg?height=600&width=800&text=Skyline+Lounge",
      location: "Financial District",
      groupSize: "large",
      mood: "upscale",
      priceRange: "$$$$",
      likes: 312,
      comments: 54,
    },
  ])

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Explore Places</h1>
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search for places, vibes, or locations..." className="pl-10" />
          </div>

          {showFilters && (
            <Card>
              <CardContent className="p-4">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <Label>Group Size</Label>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="small" />
                        <label htmlFor="small" className="text-sm">
                          Small (2-4)
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="medium" />
                        <label htmlFor="medium" className="text-sm">
                          Medium (5-8)
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="large" />
                        <label htmlFor="large" className="text-sm">
                          Large (8+)
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Mood</Label>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="relaxed" />
                        <label htmlFor="relaxed" className="text-sm">
                          Relaxed
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="lively" />
                        <label htmlFor="lively" className="text-sm">
                          Lively
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="intimate" />
                        <label htmlFor="intimate" className="text-sm">
                          Intimate
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="upscale" />
                        <label htmlFor="upscale" className="text-sm">
                          Upscale
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Price Range</Label>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="price1" />
                        <label htmlFor="price1" className="text-sm">
                          $
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="price2" />
                        <label htmlFor="price2" className="text-sm">
                          $$
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="price3" />
                        <label htmlFor="price3" className="text-sm">
                          $$$
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="price4" />
                        <label htmlFor="price4" className="text-sm">
                          $$$$
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Distance</Label>
                    <Slider defaultValue={[5]} max={20} step={1} />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0 mi</span>
                      <span>20 mi</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-4 gap-2">
                  <Button variant="outline" size="sm">
                    Reset
                  </Button>
                  <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Button variant="outline" size="sm" className="rounded-full">
              <Coffee className="h-4 w-4 mr-2" />
              Cafes
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              <Utensils className="h-4 w-4 mr-2" />
              Restaurants
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              <Wine className="h-4 w-4 mr-2" />
              Bars
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              <Music className="h-4 w-4 mr-2" />
              Live Music
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              <Users className="h-4 w-4 mr-2" />
              Group-friendly
            </Button>
          </div>

          <Tabs defaultValue="grid">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>
            <TabsContent value="grid" className="mt-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {venues.map((venue) => (
                  <VenueCard key={venue.id} venue={venue} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="map" className="mt-4">
              <div className="relative h-[500px] rounded-md overflow-hidden bg-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-muted-foreground" />
                  <span className="sr-only">Map placeholder</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  )
}

function VenueCard({ venue }: { venue: Venue }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <Link href={`/venue/${venue.id}`}>
          <div className="relative">
            <div className="relative h-48 w-full">
              <Image src={venue.imageUrl || "/placeholder.svg"} alt={venue.name} fill className="object-cover" />
            </div>
            <div className="absolute top-4 left-4 bg-black/60 text-white px-2 py-1 rounded-full text-xs flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {venue.location}
            </div>
            <div className="absolute top-4 right-4 bg-black/60 text-white px-2 py-1 rounded-full text-xs flex items-center">
              <Users className="h-3 w-3 mr-1" />
              {venue.groupSize === "small" ? "2-4" : venue.groupSize === "medium" ? "5-8" : "8+"}
            </div>
          </div>
        </Link>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Link href={`/venue/${venue.id}`}>
              <h3 className="font-semibold text-lg hover:underline">{venue.name}</h3>
            </Link>
            <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full">{venue.category}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{venue.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Heart className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">{venue.likes}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">{venue.comments}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
