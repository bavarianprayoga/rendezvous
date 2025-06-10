'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { 
  MapPin, Calendar, Share2, Heart, Star, Users, Clock, 
  Phone, Globe, Camera, ChevronLeft, ChevronRight,
  Wifi, Parking, CreditCard, Coffee, Music, Accessibility,
  ArrowLeft, BookOpen, MessageCircle, ThumbsUp
} from 'lucide-react'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import { fetchVenues, type Venue } from '@/lib/venues'
import Link from 'next/link'

// Enhanced venue interface for detail page
interface VenueDetail extends Venue {
  images?: string[]
  rating?: number
  reviewCount?: number
  priceLevel?: number
  phone?: string
  website?: string
  hours?: {
    monday?: string
    tuesday?: string
    wednesday?: string
    thursday?: string
    friday?: string
    saturday?: string
    sunday?: string
  }
  amenities?: string[]
  reviews?: Review[]
}

interface Review {
  id: string
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  date: string
  helpful?: number
}

// Mock additional data for comprehensive venue details
const generateVenueDetails = (venue: Venue): VenueDetail => {
  const mockImages = [
    venue.image,
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=600&fit=crop'
  ].filter(Boolean)

  const mockReviews: Review[] = [
    {
      id: '1',
      userName: 'Alex Johnson',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      comment: 'Perfect spot for our team meetup! Great atmosphere and the staff was super accommodating for our group of 8.',
      date: '2024-01-15',
      helpful: 12
    },
    {
      id: '2',
      userName: 'Sarah Chen',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b550?w=100&h=100&fit=crop&crop=face',
      rating: 4,
      comment: 'Beautiful venue with great ambiance. Prices are reasonable and the service is excellent. Will definitely come back!',
      date: '2024-01-10',
      helpful: 8
    },
    {
      id: '3',
      userName: 'Mike Rodriguez',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      comment: 'Had an amazing hangout here with friends. The space is perfect for groups and the vibe is exactly what we were looking for.',
      date: '2024-01-08',
      helpful: 15
    }
  ]

  const mockAmenities = venue.category === 'Café' 
    ? ['Free WiFi', 'Power Outlets', 'Group Seating', 'Coffee']
    : venue.category === 'Bar'
    ? ['Music', 'Happy Hour', 'Group Tables', 'Credit Cards']
    : venue.category === 'Park'
    ? ['Parking', 'Accessible', 'Outdoor Seating', 'Pet Friendly']
    : ['WiFi', 'Parking', 'Credit Cards', 'Group Friendly']

  return {
    ...venue,
    images: mockImages,
    rating: 4.2 + Math.random() * 0.8, // Random rating between 4.2-5.0
    reviewCount: Math.floor(Math.random() * 200) + 50,
    priceLevel: Math.floor(Math.random() * 4) + 1, // 1-4 price level
    phone: '+1 (555) 123-4567',
    website: 'https://example.com',
    hours: {
      monday: '8:00 AM - 10:00 PM',
      tuesday: '8:00 AM - 10:00 PM',
      wednesday: '8:00 AM - 10:00 PM',
      thursday: '8:00 AM - 11:00 PM',
      friday: '8:00 AM - 12:00 AM',
      saturday: '9:00 AM - 12:00 AM',
      sunday: '9:00 AM - 9:00 PM'
    },
    amenities: mockAmenities,
    reviews: mockReviews
  }
}

const amenityIcons: { [key: string]: any } = {
  'Free WiFi': Wifi,
  'WiFi': Wifi,
  'Power Outlets': Coffee,
  'Group Seating': Users,
  'Coffee': Coffee,
  'Music': Music,
  'Happy Hour': Clock,
  'Group Tables': Users,
  'Credit Cards': CreditCard,
  'Parking': Parking,
  'Accessible': Accessibility,
  'Outdoor Seating': Users,
  'Pet Friendly': Heart,
  'Group Friendly': Users
}

export default function VenueDetailPage() {
  const params = useParams()
  const router = useRouter()
  const venueId = params.id as string
  
  const [venue, setVenue] = useState<VenueDetail | null>(null)
  const [relatedVenues, setRelatedVenues] = useState<Venue[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    const loadVenueDetails = async () => {
      try {
        setIsLoading(true)
        const venues = await fetchVenues()
        const foundVenue = venues.find(v => v.id === venueId)
        
        if (foundVenue) {
          const detailVenue = generateVenueDetails(foundVenue)
          setVenue(detailVenue)
          
          // Get related venues (same category, excluding current venue)
          const related = venues
            .filter(v => v.id !== venueId && v.category === foundVenue.category)
            .slice(0, 3)
          setRelatedVenues(related)
        }
      } catch (error) {
        console.error('Error loading venue details:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (venueId) {
      loadVenueDetails()
    }
  }, [venueId])

  const nextImage = () => {
    if (venue?.images) {
      setCurrentImageIndex((prev) => 
        prev === venue.images!.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (venue?.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? venue.images!.length - 1 : prev - 1
      )
    }
  }

  const formatRating = (rating?: number) => {
    return rating ? rating.toFixed(1) : '0.0'
  }

  const getPriceDisplay = (level?: number) => {
    if (!level) return '$'
    return '$'.repeat(level)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="h-96 bg-muted rounded-lg mb-8" />
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="h-8 bg-muted rounded w-3/4 mb-4" />
                  <div className="h-4 bg-muted rounded w-1/2 mb-8" />
                  <div className="space-y-4">
                    <div className="h-4 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded w-5/6" />
                    <div className="h-4 bg-muted rounded w-4/6" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-32 bg-muted rounded" />
                  <div className="h-32 bg-muted rounded" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!venue) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Venue not found</h1>
            <p className="text-muted-foreground mb-8">
              The venue you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => router.push('/')}>
              Back to Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Image Gallery */}
        <section className="max-w-7xl mx-auto px-4 mb-8">
          <div className="relative h-96 rounded-lg overflow-hidden">
            {venue.images && venue.images.length > 0 && (
              <>
                <img
                  src={venue.images[currentImageIndex]}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
                
                {venue.images.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}

                {/* Image indicators */}
                {venue.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {venue.images.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                )}

                {/* Action buttons overlay */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => setIsFavorited(!isFavorited)}
                  >
                    <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button variant="secondary" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" size="icon">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{venue.name}</h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{venue.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>Up to {venue.upToNPeople} people</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{formatRating(venue.rating)}</span>
                      <span className="text-muted-foreground">({venue.reviewCount} reviews)</span>
                    </div>
                    <div className="text-muted-foreground">{getPriceDisplay(venue.priceLevel)} • {venue.category}</div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{venue.category}</Badge>
                  {venue.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator className="my-6" />

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">About this place</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {venue.description}
                </p>
              </div>

              <Separator className="my-6" />

              {/* Amenities */}
              {venue.amenities && venue.amenities.length > 0 && (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {venue.amenities.map((amenity) => {
                        const IconComponent = amenityIcons[amenity] || Coffee
                        return (
                          <div key={amenity} className="flex items-center gap-2 text-sm">
                            <IconComponent className="h-4 w-4 text-primary" />
                            <span>{amenity}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <Separator className="my-6" />
                </>
              )}

              {/* Hours */}
              {venue.hours && (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Hours</h2>
                    <div className="space-y-2">
                      {Object.entries(venue.hours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between items-center text-sm">
                          <span className="capitalize font-medium">{day}</span>
                          <span className="text-muted-foreground">{hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-6" />
                </>
              )}

              {/* Reviews */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Reviews ({venue.reviewCount})</h2>
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Write a review
                  </Button>
                </div>

                <div className="space-y-6">
                  {venue.reviews?.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src={review.userAvatar} />
                          <AvatarFallback>{review.userName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{review.userName}</span>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-muted-foreground'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{review.comment}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <button className="flex items-center gap-1 hover:text-primary">
                              <ThumbsUp className="h-3 w-3" />
                              Helpful ({review.helpful})
                            </button>
                            <button className="flex items-center gap-1 hover:text-primary">
                              <MessageCircle className="h-3 w-3" />
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-6">
                  <Button variant="outline">
                    Load more reviews
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Booking & Info */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Plan Your Hangout</CardTitle>
                  <CardDescription>
                    Reserve this spot for your group
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" size="lg">
                    <Calendar className="h-4 w-4 mr-2" />
                    Plan Hangout Here
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Heart className="h-4 w-4 mr-2" />
                    Add to Favorites
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share with Friends
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {venue.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{venue.phone}</span>
                    </div>
                  )}
                  {venue.website && (
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a href={venue.website} className="text-primary hover:underline">
                        Visit website
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{venue.location}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Map placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Map view</span>
                  </div>
                  <Button variant="outline" className="w-full mt-3" size="sm">
                    Get Directions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Venues */}
        {relatedVenues.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold mb-6">Similar Places</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedVenues.map((relatedVenue) => (
                <Link key={relatedVenue.id} href={`/venue/${relatedVenue.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="relative h-48">
                      <img
                        src={relatedVenue.image}
                        alt={relatedVenue.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-4 left-4" variant="secondary">
                        {relatedVenue.category}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{relatedVenue.name}</CardTitle>
                      <CardDescription className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {relatedVenue.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {relatedVenue.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">4.5</span>
                        </div>
                        <Badge variant="outline">
                          Up to {relatedVenue.upToNPeople} people
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
} 