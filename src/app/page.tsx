'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Calendar, Share2, Search, Users } from 'lucide-react'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'

// Mock venue data - Replace this with Appwrite database query
const mockVenues = [
  {
    id: '1',
    name: 'Skyline Rooftop Bar',
    location: 'Downtown, 123 Main St',
    description: 'Enjoy craft cocktails with panoramic city views at our stylish rooftop bar.',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&h=600&fit=crop',
    tags: ['Energetic', 'Romantic', 'Date Night'],
    category: 'Rooftop',
    upToNPeople: 8,
  },
  {
    id: '2',
    name: 'Cozy Corner Café',
    location: 'Arts District, 456 Elm St',
    description: 'A quiet café with comfortable seating, perfect for catching up with friends over coffee.',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&h=600&fit=crop',
    tags: ['Cozy', 'Quiet', 'Casual Meeting'],
    category: 'Café',
    upToNPeople: 4,
  },
  {
    id: '3',
    name: 'The Botanical Gardens',
    location: 'Eastside Park, 789 Park Ave',
    description: 'Lush gardens with walking paths, perfect for picnics and outdoor gatherings.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop',
    tags: ['Chill', 'Elegant', 'Family'],
    category: 'Park',
    upToNPeople: 10,
  },
]

// Popular categories
const popularCategories = ['Cafés', 'Cozy spots', 'Date night', 'Rooftops']

export default function HomePage() {
  const [searchPlace, setSearchPlace] = useState('')
  const [searchLocation, setSearchLocation] = useState('')
  const [groupSize, setGroupSize] = useState<number | ''>('')
  const [filteredVenues, setFilteredVenues] = useState(mockVenues)

  // TODO: Replace with actual venue fetching from Appwrite
  // useEffect(() => {
  //   const fetchVenues = async () => {
  //     try {
  //       const response = await databases.listDocuments(
  //         'YOUR_DATABASE_ID',
  //         'YOUR_VENUES_COLLECTION_ID'
  //       )
  //       setFilteredVenues(response.documents)
  //     } catch (error) {
  //       console.error('Error fetching venues:', error)
  //     }
  //   }
  //   fetchVenues()
  // }, [])

  // Filter venues based on search criteria
  useEffect(() => {
    const filtered = mockVenues.filter(venue => {
      // Place/venue name filter
      const placeMatch = !searchPlace || 
        venue.name.toLowerCase().includes(searchPlace.toLowerCase()) ||
        venue.description.toLowerCase().includes(searchPlace.toLowerCase()) ||
        venue.tags.some(tag => tag.toLowerCase().includes(searchPlace.toLowerCase())) ||
        venue.category.toLowerCase().includes(searchPlace.toLowerCase())
      
      // Location filter
      const locationMatch = !searchLocation || 
        venue.location.toLowerCase().includes(searchLocation.toLowerCase())
      
      // Group size filter - venue must accommodate the group size
      const sizeMatch = !groupSize || venue.upToNPeople >= groupSize

      return placeMatch && locationMatch && sizeMatch
    })
    setFilteredVenues(filtered)
  }, [searchPlace, searchLocation, groupSize])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Filtering happens automatically via useEffect
  }

  const handleGroupSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setGroupSize(value === '' ? '' : parseInt(value))
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h1 className="text-5xl font-bold mb-4">
              Find the perfect place for your<br />
              next <span className="text-primary">hangout</span>
            </h1>
            <p className="text-muted-foreground mb-8">
              Discover authentic venues based on your social needs, not just business<br />
              listings. Perfect for planning meetups with friends.
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
              <Card className="p-3">
                <div className="flex flex-col md:flex-row items-center gap-2">
                  {/* Place Search */}
                  <div className="flex items-center flex-1 w-full">
                    <Search className="ml-3 mr-2 text-muted-foreground h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Coffee shops, restaurants, parks..."
                      className="border-0 shadow-none focus-visible:ring-0 flex-1"
                      value={searchPlace}
                      onChange={(e) => setSearchPlace(e.target.value)}
                    />
                  </div>
                  
                  {/* Location Search */}
                  <div className="flex items-center flex-1 w-full">
                    <MapPin className="ml-3 mr-2 text-muted-foreground h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Downtown, South Side..."
                      className="border-0 shadow-none focus-visible:ring-0 flex-1"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                    />
                  </div>
                  
                  {/* Group Size */}
                  <div className="flex items-center flex-1 w-full">
                    <Users className="ml-3 mr-2 text-muted-foreground h-4 w-4" />
                    <Input
                      type="number"
                      placeholder="Group size"
                      min="1"
                      max="50"
                      className="border-0 shadow-none focus-visible:ring-0 flex-1"
                      value={groupSize}
                      onChange={handleGroupSizeChange}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full md:w-auto px-8">
                    Search
                  </Button>
                </div>
              </Card>
            </form>

            {/* Popular Categories */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <span className="text-sm text-muted-foreground">Popular:</span>
              {popularCategories.map((category) => (
                <Button
                  key={category}
                  variant="link"
                  size="sm"
                  className="text-sm p-0 h-auto"
                  onClick={() => setSearchPlace(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Venues Section */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Discover Hangout Spots</h2>
              <p className="text-muted-foreground">
                {filteredVenues.length === mockVenues.length 
                  ? "Places perfect for meeting friends and creating memories"
                  : `Found ${filteredVenues.length} venue${filteredVenues.length !== 1 ? 's' : ''} matching your search`
                }
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button>Popular Places</Button>
              <Button variant="outline">New & Notable</Button>
              <Button variant="outline">Trending Now</Button>
            </div>
          </div>

          {/* Venue Cards */}
          {filteredVenues.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((venue) => (
                <Card key={venue.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-4 left-4" variant="secondary">
                      {venue.category}
                    </Badge>
                    <Badge className="absolute top-4 right-4" variant="secondary">
                      Up to {venue.upToNPeople} people
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-lg">{venue.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {venue.location}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{venue.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {venue.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" className="text-primary">
                      <Calendar className="h-4 w-4 mr-1" />
                      Plan Hangout
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <h3 className="text-lg font-semibold mb-2">No venues found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or group size
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchPlace('')
                  setSearchLocation('')
                  setGroupSize('')
                }}
              >
                Clear filters
              </Button>
            </Card>
          )}

          {/* View More */}
          {filteredVenues.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="link" className="text-primary">
                Explore more places →
              </Button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
