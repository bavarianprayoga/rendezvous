"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { Edit, Settings, MapPin, Calendar, Heart, Bookmark, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import MainLayout from "@/components/main-layout"

export default function ProfilePage() {
  const { user } = useAuth()
  const [savedVenues, setSavedVenues] = useState([
    {
      id: "1",
      name: "Coastal Coffee House",
      category: "cafe",
      imageUrl: "/placeholder.svg?height=200&width=300&text=Coastal+Coffee",
      location: "Oceanfront",
    },
    {
      id: "2",
      name: "Urban Rooftop Bar",
      category: "bar",
      imageUrl: "/placeholder.svg?height=200&width=300&text=Urban+Rooftop",
      location: "Downtown",
    },
    {
      id: "3",
      name: "The Hidden Garden",
      category: "restaurant",
      imageUrl: "/placeholder.svg?height=200&width=300&text=Hidden+Garden",
      location: "Parkside",
    },
  ])

  const [pastVisits, setPastVisits] = useState([
    {
      id: "visit1",
      venueName: "Coastal Coffee House",
      venueId: "1",
      date: "April 15, 2025",
      imageUrl: "/placeholder.svg?height=200&width=300&text=Coastal+Coffee",
    },
    {
      id: "visit2",
      venueName: "Urban Rooftop Bar",
      venueId: "2",
      date: "March 28, 2025",
      imageUrl: "/placeholder.svg?height=200&width=300&text=Urban+Rooftop",
    },
    {
      id: "visit3",
      venueName: "The Hidden Garden",
      venueId: "3",
      date: "February 10, 2025",
      imageUrl: "/placeholder.svg?height=200&width=300&text=Hidden+Garden",
    },
  ])

  const [interests, setInterests] = useState([
    "cafes",
    "rooftop bars",
    "live music",
    "outdoor seating",
    "craft cocktails",
  ])

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="grid gap-6">
          <Card>
            <CardContent className="p-0">
              <div className="relative h-48 bg-gradient-to-r from-rose-400 to-rose-600">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 text-white bg-black/20 hover:bg-black/30"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Cover
                </Button>
              </div>
              <div className="px-6 pb-6">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-12">
                  <Avatar className="h-24 w-24 border-4 border-background">
                    <AvatarImage
                      src={user?.photoURL || "/placeholder.svg?height=100&width=100&text=User"}
                      alt={user?.displayName || "User"}
                    />
                    <AvatarFallback>{user?.displayName?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold">{user?.displayName || "User"}</h1>
                    <p className="text-muted-foreground">@{user?.email?.split("@")[0] || "username"}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-sm text-muted-foreground mb-4">
                    Coffee enthusiast and foodie. Always looking for new places to explore with friends!
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      San Francisco, CA
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Joined March 2025
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                      <Badge key={interest} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="saved">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="saved">Saved Places</TabsTrigger>
              <TabsTrigger value="visited">Past Visits</TabsTrigger>
              <TabsTrigger value="plans">My Plans</TabsTrigger>
            </TabsList>
            <TabsContent value="saved" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {savedVenues.map((venue) => (
                  <Link key={venue.id} href={`/venue/${venue.id}`}>
                    <Card className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="relative h-40">
                          <Image
                            src={venue.imageUrl || "/placeholder.svg"}
                            alt={venue.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 bg-black/20 text-white hover:bg-black/30"
                            >
                              <Bookmark className="h-4 w-4 fill-current" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold">{venue.name}</h3>
                            <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full">
                              {venue.category}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            {venue.location}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="visited" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pastVisits.map((visit) => (
                  <Link key={visit.id} href={`/venue/${visit.venueId}`}>
                    <Card className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="relative h-40">
                          <Image
                            src={visit.imageUrl || "/placeholder.svg"}
                            alt={visit.venueName}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 bg-black/20 text-white hover:bg-black/30"
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-1">{visit.venueName}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            Visited on {visit.date}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="plans" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Coffee Catchup</CardTitle>
                    <CardDescription>Coastal Coffee House • May 10, 2025</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex -space-x-2">
                        <Avatar className="h-6 w-6 border border-background">
                          <AvatarFallback>AJ</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-6 w-6 border border-background">
                          <AvatarFallback>ST</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-6 w-6 border border-background">
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                      </div>
                      <span className="text-xs text-muted-foreground">You and 3 others</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Rooftop Happy Hour</CardTitle>
                    <CardDescription>Urban Rooftop Bar • May 15, 2025</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex -space-x-2">
                        <Avatar className="h-6 w-6 border border-background">
                          <AvatarFallback>AJ</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-6 w-6 border border-background">
                          <AvatarFallback>ST</AvatarFallback>
                        </Avatar>
                      </div>
                      <span className="text-xs text-muted-foreground">You and 2 others</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  )
}
