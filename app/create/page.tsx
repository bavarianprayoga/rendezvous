"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, MapPin, Calendar, Clock, Users, X } from "lucide-react"
import Image from "next/image"
import MainLayout from "@/components/main-layout"

export default function CreatePage() {
  const [selectedTab, setSelectedTab] = useState("venue")
  const [uploadedImages, setUploadedImages] = useState<string[]>(["/placeholder.svg?height=300&width=400&text=Image+1"])

  const handleAddImage = () => {
    // In a real app, this would open a file picker
    setUploadedImages([
      ...uploadedImages,
      `/placeholder.svg?height=300&width=400&text=Image+${uploadedImages.length + 1}`,
    ])
  }

  const handleRemoveImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index))
  }

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Create</h1>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="venue">Add Venue</TabsTrigger>
            <TabsTrigger value="plan">Create Plan</TabsTrigger>
          </TabsList>
          <TabsContent value="venue">
            <Card>
              <CardHeader>
                <CardTitle>Add a New Venue</CardTitle>
                <CardDescription>Share a great hangout spot with the community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="venue-name">Venue Name</Label>
                  <Input id="venue-name" placeholder="Enter the name of the venue" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venue-description">Description</Label>
                  <Textarea
                    id="venue-description"
                    placeholder="Describe what makes this place special for hangouts"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="venue-category">Category</Label>
                    <Select>
                      <SelectTrigger id="venue-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cafe">Cafe</SelectItem>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="bar">Bar</SelectItem>
                        <SelectItem value="lounge">Lounge</SelectItem>
                        <SelectItem value="park">Park</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="venue-location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="venue-location" placeholder="Address or location" className="pl-10" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Ideal Group Size</Label>
                  <RadioGroup defaultValue="small" className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="small" id="small" />
                      <Label htmlFor="small">Small (2-4)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">Medium (5-8)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="large" id="large" />
                      <Label htmlFor="large">Large (8+)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Mood/Vibe</Label>
                  <RadioGroup defaultValue="relaxed" className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="relaxed" id="relaxed" />
                      <Label htmlFor="relaxed">Relaxed</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lively" id="lively" />
                      <Label htmlFor="lively">Lively</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="intimate" id="intimate" />
                      <Label htmlFor="intimate">Intimate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upscale" id="upscale" />
                      <Label htmlFor="upscale">Upscale</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Price Range</Label>
                  <RadioGroup defaultValue="$$" className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="$" id="price1" />
                      <Label htmlFor="price1">$</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="$$" id="price2" />
                      <Label htmlFor="price2">$$</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="$$$" id="price3" />
                      <Label htmlFor="price3">$$$</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="$$$$" id="price4" />
                      <Label htmlFor="price4">$$$$</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Photos</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="relative rounded-md overflow-hidden h-[150px]">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Venue image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6 rounded-full"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="h-[150px] border-dashed flex flex-col items-center justify-center gap-2"
                      onClick={handleAddImage}
                    >
                      <Camera className="h-6 w-6" />
                      <span>Add Photo</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-rose-500 hover:bg-rose-600">Submit Venue</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="plan">
            <Card>
              <CardHeader>
                <CardTitle>Create a Hangout Plan</CardTitle>
                <CardDescription>Organize a get-together with friends</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="plan-title">Plan Title</Label>
                  <Input id="plan-title" placeholder="Give your hangout a name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plan-description">Description</Label>
                  <Textarea
                    id="plan-description"
                    placeholder="What's the occasion? Any special instructions?"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plan-venue">Venue</Label>
                  <Select>
                    <SelectTrigger id="plan-venue">
                      <SelectValue placeholder="Select venue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Coastal Coffee House</SelectItem>
                      <SelectItem value="2">Urban Rooftop Bar</SelectItem>
                      <SelectItem value="3">The Hidden Garden</SelectItem>
                      <SelectItem value="4">Vinyl & Vino</SelectItem>
                      <SelectItem value="5">Bytes & Bites</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="plan-date">Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="plan-date" type="date" className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="plan-time">Time</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="plan-time" type="time" className="pl-10" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plan-participants">Invite Friends</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="plan-participants" placeholder="Search for friends" className="pl-10" />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div className="flex items-center gap-2 bg-muted rounded-full pl-1 pr-3 py-1">
                      <div className="h-6 w-6 rounded-full bg-rose-200 flex items-center justify-center text-xs">
                        AJ
                      </div>
                      <span className="text-xs">Alex Johnson</span>
                      <Button variant="ghost" size="icon" className="h-4 w-4 rounded-full">
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 bg-muted rounded-full pl-1 pr-3 py-1">
                      <div className="h-6 w-6 rounded-full bg-rose-200 flex items-center justify-center text-xs">
                        ST
                      </div>
                      <span className="text-xs">Sam Taylor</span>
                      <Button variant="ghost" size="icon" className="h-4 w-4 rounded-full">
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Allow Voting On</Label>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="vote-date" className="rounded text-rose-500" />
                      <Label htmlFor="vote-date">Date/Time</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="vote-venue" className="rounded text-rose-500" />
                      <Label htmlFor="vote-venue">Venue</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full bg-rose-500 hover:bg-rose-600">Create Plan</Button>
                <Button variant="outline" className="w-full">
                  Save as Draft
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
