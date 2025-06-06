'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, MapPin, Users, Clock, Plus } from 'lucide-react'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'

// Mock hangout data
const mockHangouts = {
  upcoming: [
    {
      id: '1',
      title: 'Coffee & Code Session',
      venue: 'Cozy Corner Café',
      location: 'Arts District, 456 Elm St',
      date: 'Dec 28, 2024',
      time: '2:00 PM',
      attendees: 4,
      maxAttendees: 6,
      organizer: 'John Doe',
      description: 'Join us for a relaxed coding session with coffee and good company.',
      status: 'confirmed'
    },
    {
      id: '2',
      title: 'Sunset Drinks',
      venue: 'Skyline Rooftop Bar',
      location: 'Downtown, 123 Main St',
      date: 'Dec 30, 2024',
      time: '6:00 PM',
      attendees: 6,
      maxAttendees: 8,
      organizer: 'Jane Smith',
      description: 'Watch the sunset with cocktails and great conversations.',
      status: 'confirmed'
    },
    {
      id: '3',
      title: 'Weekend Picnic',
      venue: 'The Botanical Gardens',
      location: 'Eastside Park, 789 Park Ave',
      date: 'Jan 5, 2025',
      time: '12:00 PM',
      attendees: 8,
      maxAttendees: 10,
      organizer: 'Mike Johnson',
      description: 'Bring your favorite dish for a potluck picnic in the gardens.',
      status: 'pending'
    }
  ],
  past: [
    {
      id: '4',
      title: 'Game Night',
      venue: 'Board Game Café',
      location: 'Westside, 321 Oak St',
      date: 'Dec 20, 2024',
      time: '7:00 PM',
      attendees: 5,
      maxAttendees: 6,
      organizer: 'Sarah Wilson',
      description: 'An evening of board games and friendly competition.',
      status: 'completed'
    },
    {
      id: '5',
      title: 'Brunch Club',
      venue: 'The Morning Table',
      location: 'Downtown, 654 Pine St',
      date: 'Dec 15, 2024',
      time: '11:00 AM',
      attendees: 4,
      maxAttendees: 4,
      organizer: 'Alex Chen',
      description: 'Monthly brunch meetup for food lovers.',
      status: 'completed'
    }
  ]
}

export default function HangoutsPage() {
  const [activeTab, setActiveTab] = useState('upcoming')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const HangoutCard = ({ hangout }: { hangout: any }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{hangout.title}</CardTitle>
            <CardDescription className="mt-1">{hangout.venue}</CardDescription>
          </div>
          <Badge className={getStatusColor(hangout.status)}>
            {hangout.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{hangout.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            {hangout.location}
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            {hangout.date}
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            {hangout.time}
          </div>
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            {hangout.attendees}/{hangout.maxAttendees} attendees
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Organized by <span className="font-medium text-foreground">{hangout.organizer}</span>
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        {hangout.status === 'confirmed' || hangout.status === 'pending' ? (
          <>
            <Button className="flex-1">View Details</Button>
            <Button variant="outline" className="flex-1">
              {hangout.attendees < hangout.maxAttendees ? 'Join' : 'Full'}
            </Button>
          </>
        ) : (
          <Button variant="outline" className="w-full">View Summary</Button>
        )}
      </CardFooter>
    </Card>
  )

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
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-6">
            {mockHangouts.upcoming.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockHangouts.upcoming.map((hangout) => (
                  <HangoutCard key={hangout.id} hangout={hangout} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground mb-4">No upcoming hangouts</p>
                <Button asChild>
                  <Link href="/hangouts/create">Create your first hangout</Link>
                </Button>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-6">
            {mockHangouts.past.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockHangouts.past.map((hangout) => (
                  <HangoutCard key={hangout.id} hangout={hangout} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No past hangouts</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
} 