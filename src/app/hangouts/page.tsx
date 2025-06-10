'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Calendar, MapPin, Users, Clock, Plus, Search, Filter } from 'lucide-react'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import { getUpcomingHangouts, getPastHangouts, formatHangoutDateTime, isCurrentUserOrganizer, Hangout } from '@/lib/hangouts'

// Enhanced mock hangout data with proper upcoming/past separation
const mockHangouts = {
  upcoming: [
    {
      $id: 'hangout-1',
      title: 'Coffee & Code Session',
      description: 'Join us for a relaxed coding session with coffee and good company. Whether you\'re working on personal projects, learning something new, or just want to code alongside other developers, this is the perfect casual meetup.',
      venue: {
        $id: 'venue-1',
        name: 'Turu Coffee',
        address: '123 Sleep Street',
        category: 'Café',
        rating: 4.8,
        priceLevel: 2,
        imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop',
        coordinates: { lat: 34.0522, lng: -118.2437 }
      },
      organizer: {
        $id: '1',
        name: 'You',
        email: 'john.doe@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
      },
      participants: [
        {
          user: {
            $id: '2',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
          },
          rsvpStatus: 'accepted' as const,
          joinedAt: '2024-12-20T10:30:00Z',
          message: 'Excited to code and chat! 🚀'
        },
        {
          user: {
            $id: '3',
            name: 'Mike Johnson',
            email: 'mike.johnson@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
          },
          rsvpStatus: 'accepted' as const,
          joinedAt: '2024-12-21T14:15:00Z',
          message: 'Working on React, need feedback!'
        }
      ],
      maxParticipants: 6,
      startDateTime: '2025-01-15T17:00:00Z',
      endDateTime: '2025-01-15T20:00:00Z',
      status: 'confirmed' as const,
      isPrivate: false,
      tags: ['coding', 'coffee', 'networking'],
      createdAt: '2024-12-18T12:00:00Z',
      updatedAt: '2024-12-23T16:20:00Z'
    },
    {
      $id: 'hangout-2',
      title: 'Sunset Drinks',
      description: 'Watch the sunset with cocktails and great conversations. Perfect way to unwind after a long week!',
      venue: {
        $id: 'venue-2',
        name: 'Skyline Rooftop Bar',
        address: '123 Main St, Downtown',
        category: 'Bar',
        rating: 4.8,
        priceLevel: 3,
        imageUrl: 'https://images.unsplash.com/photo-1574045419806-6afbe4b9e6b2?w=800&h=600&fit=crop',
        coordinates: { lat: 34.0522, lng: -118.2437 }
      },
      organizer: {
        $id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
      },
      participants: [
        {
          user: {
            $id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
          },
          rsvpStatus: 'accepted' as const,
          joinedAt: '2024-12-20T10:30:00Z'
        }
      ],
      maxParticipants: 8,
      startDateTime: '2025-01-20T18:00:00Z',
      endDateTime: '2025-01-20T21:00:00Z',
      status: 'confirmed' as const,
      isPrivate: false,
      tags: ['drinks', 'sunset', 'social'],
      createdAt: '2024-12-15T12:00:00Z',
      updatedAt: '2024-12-21T14:15:00Z'
    },
    {
      $id: 'hangout-3',
      title: 'Weekend Picnic',
      description: 'Bring your favorite dish for a potluck picnic in the gardens. Family and pets welcome!',
      venue: {
        $id: 'venue-3',
        name: 'The Botanical Gardens',
        address: '789 Park Ave, Eastside Park',
        category: 'Park',
        rating: 4.7,
        priceLevel: 1,
        imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop',
        coordinates: { lat: 34.0522, lng: -118.2437 }
      },
      organizer: {
        $id: '3',
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
      },
      participants: [
        {
          user: {
            $id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
          },
          rsvpStatus: 'accepted' as const,
          joinedAt: '2024-12-18T16:00:00Z'
        }
      ],
      maxParticipants: 10,
      startDateTime: '2025-02-05T12:00:00Z',
      endDateTime: '2025-02-05T16:00:00Z',
      status: 'open' as const,
      isPrivate: false,
      tags: ['picnic', 'outdoor', 'family-friendly'],
      createdAt: '2024-12-16T14:00:00Z',
      updatedAt: '2024-12-19T11:30:00Z'
    }
  ],
  past: [
    {
      $id: 'hangout-4',
      title: 'Game Night',
      description: 'An evening of board games and friendly competition. We had classics like Catan, Monopoly, and some exciting new games!',
      venue: {
        $id: 'venue-4',
        name: 'Board Game Café',
        address: '321 Oak St, Westside',
        category: 'Café',
        rating: 4.6,
        priceLevel: 2,
        imageUrl: 'https://images.unsplash.com/photo-1544428852-52de7c4b948d?w=800&h=600&fit=crop',
        coordinates: { lat: 34.0522, lng: -118.2437 }
      },
      organizer: {
        $id: '4',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
      },
      participants: [
        {
          user: {
            $id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
          },
          rsvpStatus: 'accepted' as const,
          joinedAt: '2024-12-15T10:30:00Z',
          message: 'Love board games! 🎲'
        }
      ],
      maxParticipants: 6,
      startDateTime: '2024-12-20T19:00:00Z',
      endDateTime: '2024-12-20T23:00:00Z',
      status: 'completed' as const,
      isPrivate: false,
      tags: ['games', 'social', 'evening'],
      createdAt: '2024-12-10T14:00:00Z',
      updatedAt: '2024-12-20T23:00:00Z'
    },
    {
      $id: 'hangout-5',
      title: 'Brunch Club',
      description: 'Monthly brunch meetup for food lovers. We tried some amazing dishes!',
      venue: {
        $id: 'venue-5',
        name: 'The Morning Table',
        address: '654 Pine St, Downtown',
        category: 'Restaurant',
        rating: 4.9,
        priceLevel: 3,
        imageUrl: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop',
        coordinates: { lat: 34.0522, lng: -118.2437 }
      },
      organizer: {
        $id: '1',
        name: 'You',
        email: 'john.doe@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
      },
      participants: [
        {
          user: {
            $id: '2',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
          },
          rsvpStatus: 'accepted' as const,
          joinedAt: '2024-12-10T10:30:00Z',
          message: 'Amazing eggs benedict! 🥞'
        }
      ],
      maxParticipants: 4,
      startDateTime: '2024-12-15T11:00:00Z',
      endDateTime: '2024-12-15T13:00:00Z',
      status: 'completed' as const,
      isPrivate: false,
      tags: ['brunch', 'food', 'social'],
      createdAt: '2024-12-01T14:00:00Z',
      updatedAt: '2024-12-15T13:00:00Z'
    }
  ],
  discover: [
    {
      $id: 'discover-1',
      title: 'Morning Yoga in the Park',
      description: 'Start your day with peaceful yoga surrounded by nature. All skill levels welcome! We\'ll focus on gentle stretches and mindfulness. Bring your own mat and water bottle.',
      venue: {
        $id: 'venue-6',
        name: 'Central Park Meadow',
        address: '1234 Park Avenue, Central District',
        category: 'Park',
        rating: 4.8,
        priceLevel: 1,
        imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
        coordinates: { lat: 34.0522, lng: -118.2437 }
      },
      organizer: {
        $id: '5',
        name: 'Alex Chen',
        email: 'alex.chen@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
      },
      participants: [
        {
          user: {
            $id: '2',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
          },
          rsvpStatus: 'accepted' as const,
          joinedAt: '2025-01-02T14:30:00Z',
          message: 'Love morning yoga! 🧘‍♀️'
        },
        {
          user: {
            $id: '4',
            name: 'Sarah Wilson',
            email: 'sarah.wilson@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
          },
          rsvpStatus: 'accepted' as const,
          joinedAt: '2025-01-03T16:15:00Z',
          message: 'Perfect way to start the weekend!'
        }
      ],
      maxParticipants: 8,
      startDateTime: '2025-01-25T08:00:00Z',
      endDateTime: '2025-01-25T09:30:00Z',
      status: 'open' as const,
      isPrivate: false,
      tags: ['yoga', 'morning', 'wellness', 'outdoor', 'beginner-friendly'],
      createdAt: '2025-01-01T10:00:00Z',
      updatedAt: '2025-01-03T16:15:00Z'
    },
    {
      $id: 'discover-2',
      title: 'Photography Walk Downtown',
      description: 'Join fellow photography enthusiasts for a guided walk through the city\'s most photogenic spots. We\'ll cover street photography tips, composition techniques, and hidden gems. All camera types welcome - from smartphones to DSLRs!',
      venue: {
        $id: 'venue-7',
        name: 'Downtown Arts District',
        address: 'Arts District, 5th & Main Street',
        category: 'Urban',
        rating: 4.6,
        priceLevel: 1,
        imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop',
        coordinates: { lat: 34.0522, lng: -118.2437 }
      },
      organizer: {
        $id: '6',
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily'
      },
      participants: [
        {
          user: {
            $id: '3',
            name: 'Mike Johnson',
            email: 'mike.johnson@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
          },
          rsvpStatus: 'accepted' as const,
          joinedAt: '2025-01-04T12:00:00Z',
          message: 'Excited to learn new techniques! 📸'
        }
      ],
      maxParticipants: 6,
      startDateTime: '2025-01-26T14:00:00Z',
      endDateTime: '2025-01-26T17:00:00Z',
      status: 'open' as const,
      isPrivate: false,
      tags: ['photography', 'creative', 'walking', 'learning', 'urban'],
      createdAt: '2025-01-02T09:00:00Z',
      updatedAt: '2025-01-04T12:00:00Z'
    },
    {
      $id: 'discover-3',
      title: 'Book Club: Sci-Fi Edition',
      description: 'Monthly book club focusing on science fiction classics and contemporary works. This month we\'re discussing "The Left Hand of Darkness" by Ursula K. Le Guin. New members welcome - just grab the book and join us for thoughtful discussion!',
      venue: {
        $id: 'venue-8',
        name: 'Moonlight Books & Café',
        address: '892 Literary Lane, Quiet Quarter',
        category: 'Bookstore',
        rating: 4.9,
        priceLevel: 2,
        imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
        coordinates: { lat: 34.0522, lng: -118.2437 }
      },
      organizer: {
        $id: '7',
        name: 'David Kim',
        email: 'david.kim@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
      },
      participants: [
        {
          user: {
            $id: '2',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
          },
          rsvpStatus: 'accepted' as const,
          joinedAt: '2025-01-05T19:30:00Z',
          message: 'Love Le Guin! Can\'t wait to discuss 📚'
        },
        {
          user: {
            $id: '5',
            name: 'Alex Chen',
            email: 'alex.chen@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
          },
          rsvpStatus: 'maybe' as const,
          joinedAt: '2025-01-06T14:20:00Z',
          message: 'Haven\'t finished the book yet, might be late'
        }
      ],
      maxParticipants: 10,
      startDateTime: '2025-01-28T19:00:00Z',
      endDateTime: '2025-01-28T21:00:00Z',
      status: 'open' as const,
      isPrivate: false,
      tags: ['books', 'discussion', 'sci-fi', 'intellectual', 'monthly'],
      createdAt: '2025-01-01T15:00:00Z',
      updatedAt: '2025-01-06T14:20:00Z'
    },
    {
      $id: 'discover-4',
      title: 'Beginner Rock Climbing',
      description: 'Perfect introduction to indoor rock climbing! Our experienced climbers will teach you safety basics, proper techniques, and help you get comfortable on the wall. All equipment provided - just bring comfortable clothes and closed-toe shoes.',
      venue: {
        $id: 'venue-9',
        name: 'Summit Climbing Gym',
        address: '456 Boulder Street, Adventure District',
        category: 'Gym',
        rating: 4.7,
        priceLevel: 3,
        imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
        coordinates: { lat: 34.0522, lng: -118.2437 }
      },
      organizer: {
        $id: '8',
        name: 'Marcus Rodriguez',
        email: 'marcus.rodriguez@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus'
      },
      participants: [
        {
          user: {
            $id: '4',
            name: 'Sarah Wilson',
            email: 'sarah.wilson@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
          },
          rsvpStatus: 'accepted' as const,
          joinedAt: '2025-01-07T10:15:00Z',
          message: 'First time climbing, nervous but excited! 🧗‍♀️'
        }
      ],
      maxParticipants: 5,
      startDateTime: '2025-02-01T10:00:00Z',
      endDateTime: '2025-02-01T12:00:00Z',
      status: 'open' as const,
      isPrivate: false,
      tags: ['climbing', 'beginner', 'fitness', 'adventure', 'indoor'],
      createdAt: '2025-01-05T16:00:00Z',
      updatedAt: '2025-01-07T10:15:00Z'
    },
    {
      $id: 'discover-5',
      title: 'Language Exchange: Spanish & English',
      description: 'Practice your Spanish or English in a relaxed, friendly environment! We\'ll split time between both languages, play games, and share cultural experiences. All proficiency levels welcome - the goal is to learn and have fun together.',
      venue: {
        $id: 'venue-10',
        name: 'Global Café',
        address: '123 International Boulevard, Cultural Center',
        category: 'Café',
        rating: 4.5,
        priceLevel: 2,
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
        coordinates: { lat: 34.0522, lng: -118.2437 }
      },
      organizer: {
        $id: '9',
        name: 'Sofia Martinez',
        email: 'sofia.martinez@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia'
      },
      participants: [
        {
          user: {
            $id: '6',
            name: 'Emily Davis',
            email: 'emily.davis@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily'
          },
          rsvpStatus: 'accepted' as const,
          joinedAt: '2025-01-08T13:45:00Z',
          message: '¡Hola! Ready to practice my Spanish 🇪🇸'
        },
        {
          user: {
            $id: '3',
            name: 'Mike Johnson',
            email: 'mike.johnson@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
          },
          rsvpStatus: 'accepted' as const,
          joinedAt: '2025-01-09T09:20:00Z',
          message: 'Need to brush up on my Spanish for travel!'
        }
      ],
      maxParticipants: 8,
      startDateTime: '2025-01-30T18:30:00Z',
      endDateTime: '2025-01-30T20:30:00Z',
      status: 'open' as const,
      isPrivate: false,
      tags: ['language', 'spanish', 'english', 'cultural', 'practice'],
      createdAt: '2025-01-06T11:00:00Z',
      updatedAt: '2025-01-09T09:20:00Z'
    }
  ]
}

export default function HangoutsPage() {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [tagFilter, setTagFilter] = useState('all')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'open':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Filter function for discover hangouts
  const getFilteredDiscoverHangouts = () => {
    return mockHangouts.discover.filter(hangout => {
      const matchesSearch = hangout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           hangout.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           hangout.venue.name.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = categoryFilter === 'all' || hangout.venue.category.toLowerCase() === categoryFilter.toLowerCase()
      
      const matchesTag = tagFilter === 'all' || hangout.tags.includes(tagFilter)
      
      return matchesSearch && matchesCategory && matchesTag
    })
  }

  // Get unique categories and tags for filter options
  const getUniqueCategories = () => {
    const categories = mockHangouts.discover.map(h => h.venue.category)
    return [...new Set(categories)]
  }

  const getUniqueTags = () => {
    const tags = mockHangouts.discover.flatMap(h => h.tags)
    return [...new Set(tags)]
  }

  const HangoutCard = ({ hangout }: { hangout: Hangout }) => {
    const isOrganizer = isCurrentUserOrganizer(hangout)
    const formattedDateTime = formatHangoutDateTime(hangout.startDateTime)
    const isDiscoverHangout = activeTab === 'discover'
    
    return (
      <Card className={`hover:shadow-lg transition-shadow flex flex-col h-full ${isOrganizer ? 'border-primary/50 bg-primary/5' : ''}`}>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{hangout.title}</CardTitle>
              <CardDescription className="mt-1">{hangout.venue.name}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge className={getStatusColor(hangout.status)}>
                {hangout.status}
              </Badge>
              {isOrganizer && (
                <Badge variant="outline" className="text-xs">
                  Organizer
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-3">{hangout.description}</p>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              {hangout.venue.address}
            </div>
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className={`${formattedDateTime.isToday || formattedDateTime.isTomorrow ? 'font-medium text-primary' : ''}`}>
                {formattedDateTime.date}
              </span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              {formattedDateTime.time}
            </div>
            <div className="flex items-center text-sm">
              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
              {hangout.participants.length}/{hangout.maxParticipants} attendees
            </div>
          </div>
          
          {/* Show tags for discover hangouts */}
          {isDiscoverHangout && (
            <div className="flex flex-wrap gap-1">
              {hangout.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {hangout.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{hangout.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
          
          <p className="text-sm text-muted-foreground">
            {isOrganizer ? (
              <span className="font-medium text-primary">Organized by you</span>
            ) : (
              <>Organized by <span className="font-medium text-foreground">{hangout.organizer.name}</span></>
            )}
          </p>
        </CardContent>
        <CardFooter className="flex gap-2 mt-auto">
          {isDiscoverHangout ? (
            // For discover hangouts, always show join option since user hasn't joined
            <>
              <Button asChild className="flex-1">
                <Link href={`/hangouts/${hangout.$id}`}>View Details</Link>
              </Button>
              <Button className="flex-1">
                {hangout.participants.length < hangout.maxParticipants ? 'Join' : 'Full'}
              </Button>
            </>
          ) : hangout.status === 'confirmed' ? (
            <Button asChild className="w-full">
              <Link href={`/hangouts/${hangout.$id}`}>View Details</Link>
            </Button>
          ) : hangout.status === 'pending' || hangout.status === 'open' ? (
            <>
              <Button asChild className="flex-1">
                <Link href={`/hangouts/${hangout.$id}`}>View Details</Link>
              </Button>
              <Button variant="outline" className="flex-1">
                {hangout.participants.length < hangout.maxParticipants ? 'Join' : 'Full'}
              </Button>
            </>
          ) : (
            <Button asChild variant="outline" className="w-full">
              <Link href={`/hangouts/${hangout.$id}`}>View Summary</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Hangouts</h1>
            <p className="text-muted-foreground">Manage your upcoming and past hangout sessions</p>
          </div>
          <Button asChild>
            <Link href="/hangouts/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Hangout
            </Link>
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-lg grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-6">
            {mockHangouts.upcoming.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockHangouts.upcoming.map((hangout) => (
                  <HangoutCard key={hangout.$id} hangout={hangout} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No upcoming hangouts</h3>
                <p className="text-muted-foreground mb-6">
                  Create your first hangout and start connecting with others!
                </p>
                <Button asChild>
                  <Link href="/hangouts/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Hangout
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-6">
            {mockHangouts.past.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockHangouts.past.map((hangout) => (
                  <HangoutCard key={hangout.$id} hangout={hangout} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No past hangouts</h3>
                <p className="text-muted-foreground">
                  Your completed hangouts will appear here.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="discover" className="space-y-6">
            {/* Filter Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Find Your Perfect Hangout
                </CardTitle>
                <CardDescription>
                  Discover open public hangouts happening near you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search hangouts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  {/* Category Filter */}
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {getUniqueCategories().map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {/* Tag Filter */}
                  <Select value={tagFilter} onValueChange={setTagFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Interests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Interests</SelectItem>
                      {getUniqueTags().map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Active Filters Display */}
                {(searchQuery || categoryFilter !== 'all' || tagFilter !== 'all') && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {searchQuery && (
                      <Badge variant="secondary" className="gap-1">
                        Search: "{searchQuery}"
                        <button onClick={() => setSearchQuery('')} className="ml-1 hover:bg-muted rounded-full">
                          ×
                        </button>
                      </Badge>
                    )}
                    {categoryFilter !== 'all' && (
                      <Badge variant="secondary" className="gap-1">
                        Category: {categoryFilter}
                        <button onClick={() => setCategoryFilter('all')} className="ml-1 hover:bg-muted rounded-full">
                          ×
                        </button>
                      </Badge>
                    )}
                    {tagFilter !== 'all' && (
                      <Badge variant="secondary" className="gap-1">
                        Interest: {tagFilter}
                        <button onClick={() => setTagFilter('all')} className="ml-1 hover:bg-muted rounded-full">
                          ×
                        </button>
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results */}
            {getFilteredDiscoverHangouts().length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredDiscoverHangouts().map((hangout) => (
                  <HangoutCard key={hangout.$id} hangout={hangout} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No hangouts found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchQuery('')
                  setCategoryFilter('all')
                  setTagFilter('all')
                }}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
} 