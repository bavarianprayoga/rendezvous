'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Search, UserPlus, MapPin, Users, Check, X } from 'lucide-react'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'

// Mock friends data
const mockFriends = {
  current: [
    {
      id: '1',
      name: 'Sarah Johnson',
      username: '@sarahj',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      mutualHangouts: 12,
      status: 'active',
      lastHangout: '2 days ago'
    },
    {
      id: '2',
      name: 'Mike Chen',
      username: '@mikechen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      mutualHangouts: 8,
      status: 'active',
      lastHangout: '1 week ago'
    },
    {
      id: '3',
      name: 'Emma Davis',
      username: '@emmad',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      mutualHangouts: 15,
      status: 'inactive',
      lastHangout: '3 weeks ago'
    },
    {
      id: '4',
      name: 'Alex Turner',
      username: '@alexturner',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      mutualHangouts: 5,
      status: 'active',
      lastHangout: '5 days ago'
    }
  ],
  pending: [
    {
      id: '5',
      name: 'Lisa Wong',
      username: '@lisawong',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop',
      mutualFriends: 3,
      requestDate: '2 days ago'
    },
    {
      id: '6',
      name: 'David Kim',
      username: '@davidkim',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
      mutualFriends: 5,
      requestDate: '1 week ago'
    }
  ],
  discover: [
    {
      id: '7',
      name: 'Rachel Green',
      username: '@rachelg',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop',
      mutualFriends: 8,
      interests: ['Coffee', 'Hiking', 'Photography']
    },
    {
      id: '8',
      name: 'Tom Wilson',
      username: '@tomwilson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      mutualFriends: 4,
      interests: ['Gaming', 'Movies', 'Food']
    },
    {
      id: '9',
      name: 'Sophie Martinez',
      username: '@sophiem',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
      mutualFriends: 6,
      interests: ['Art', 'Music', 'Travel']
    }
  ]
}

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState('friends')
  const [searchTerm, setSearchTerm] = useState('')

  const FriendCard = ({ friend, type }: { friend: any; type: 'current' | 'pending' | 'discover' }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={friend.avatar} alt={friend.name} />
              <AvatarFallback>{friend.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{friend.name}</CardTitle>
              <CardDescription>{friend.username}</CardDescription>
            </div>
          </div>
          {type === 'current' && (
            <Badge variant={friend.status === 'active' ? 'default' : 'secondary'}>
              {friend.status}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {type === 'current' && (
          <>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-2" />
              {friend.mutualHangouts} mutual hangouts
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              Last hangout: {friend.lastHangout}
            </div>
          </>
        )}
        {type === 'pending' && (
          <>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-2" />
              {friend.mutualFriends} mutual friends
            </div>
            <p className="text-sm text-muted-foreground">
              Requested {friend.requestDate}
            </p>
          </>
        )}
        {type === 'discover' && (
          <>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-2" />
              {friend.mutualFriends} mutual friends
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {friend.interests.map((interest: string) => (
                <Badge key={interest} variant="outline" className="text-xs">
                  {interest}
                </Badge>
              ))}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        {type === 'current' && (
          <div className="flex gap-2 w-full">
            <Button className="flex-1">Invite to Hangout</Button>
            <Button variant="outline" className="flex-1">View Profile</Button>
          </div>
        )}
        {type === 'pending' && (
          <div className="flex gap-2 w-full">
            <Button className="flex-1">
              <Check className="h-4 w-4 mr-1" />
              Accept
            </Button>
            <Button variant="outline" className="flex-1">
              <X className="h-4 w-4 mr-1" />
              Decline
            </Button>
          </div>
        )}
        {type === 'discover' && (
          <Button className="w-full">
            <UserPlus className="h-4 w-4 mr-2" />
            Send Friend Request
          </Button>
        )}
      </CardFooter>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Friends</h1>
          <p className="text-muted-foreground">Connect with friends and discover new people to hang out with</p>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search friends..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="friends">
              Friends ({mockFriends.current.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({mockFriends.pending.length})
            </TabsTrigger>
            <TabsTrigger value="discover">
              Discover
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="friends" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockFriends.current
                .filter(friend => 
                  friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  friend.username.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((friend) => (
                  <FriendCard key={friend.id} friend={friend} type="current" />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-6">
            {mockFriends.pending.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockFriends.pending.map((friend) => (
                  <FriendCard key={friend.id} friend={friend} type="pending" />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No pending friend requests</p>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="discover" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockFriends.discover.map((friend) => (
                <FriendCard key={friend.id} friend={friend} type="discover" />
              ))}
            </div>
            <div className="text-center">
              <Button variant="outline">Load More Suggestions</Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
} 