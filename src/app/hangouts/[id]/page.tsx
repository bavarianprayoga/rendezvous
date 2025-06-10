'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import InviteModal from '@/components/ui/invite-modal'
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Star, 
  Share2, 
  MessageCircle,
  UserPlus,
  UserMinus,
  MoreHorizontal,
  ArrowLeft,
  Send,
  MapIcon,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit
} from 'lucide-react'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import { getHangoutById, isCurrentUserOrganizer, isCurrentUserParticipant } from '@/lib/hangouts'
import { Hangout, RSVPStatus } from '@/models/hangout'

export default function HangoutDetailPage() {
  const params = useParams()
  const router = useRouter()
  const hangoutId = params.id as string
  const [newMessage, setNewMessage] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [showInviteModal, setShowInviteModal] = useState(false)
  
  // Get hangout data - in real app this would be from API/database
  const hangout: Hangout | undefined = getHangoutById(hangoutId)
  
  if (!hangout) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Hangout Not Found</h1>
            <p className="text-muted-foreground mb-6">The hangout you&apos;re looking for doesn&apos;t exist.</p>
            <Button onClick={() => router.back()}>Go Back</Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime)
    return {
      date: date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'open':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'ongoing':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getRSVPIcon = (status: RSVPStatus) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'declined':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'maybe':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const startDateTime = formatDateTime(hangout.startDateTime)
  const endDateTime = hangout.endDateTime ? formatDateTime(hangout.endDateTime) : null
  const acceptedParticipants = hangout.participants.filter(p => p.rsvpStatus === 'accepted')
  const maybeParticipants = hangout.participants.filter(p => p.rsvpStatus === 'maybe')
  const isOrganizer = isCurrentUserOrganizer(hangout)
  const isParticipant = isCurrentUserParticipant(hangout)
  const canJoin = hangout.participants.length < hangout.maxParticipants && !isParticipant

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In real app: send message to chat
      console.log('Sending message:', newMessage)
      setNewMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header with cover image */}
        <div className="relative h-64 md:h-80">
        <Image src={hangout.coverImage || hangout.venue.imageUrl} alt={hangout.title} fill className="object-cover"/>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="container mx-auto px-4">
              <Button
                variant="ghost"
                size="sm"
                className="mb-4 text-white hover:bg-white/20"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Hangouts
              </Button>
              <div className="flex items-end justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {hangout.title}
                  </h1>
                  <div className="flex items-center gap-3 text-white/90">
                    <Badge className={getStatusColor(hangout.status)}>
                      {hangout.status}
                    </Badge>
                    <span className="text-sm">
                      Organized by {hangout.organizer.name}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  {isOrganizer && (
                    <>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => setShowInviteModal(true)}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Invite
                      </Button>
                      <Button size="sm" variant="secondary">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className={`grid w-full ${isParticipant || isOrganizer ? 'grid-cols-4' : 'grid-cols-3'}`}>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="participants">Participants</TabsTrigger>
                  {(isParticipant || isOrganizer) && (
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                  )}
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 mt-6">
                  {/* Description */}
                  <Card>
                    <CardHeader>
                      <CardTitle>About this hangout</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {hangout.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {hangout.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Rules & Requirements */}
                  {(hangout.rules || hangout.requirements) && (
                    <div className="grid md:grid-cols-2 gap-6">
                      {hangout.rules && (
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Hangout Rules</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {hangout.rules.map((rule, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                  <span className="text-primary font-bold mt-1">•</span>
                                  <span className="text-muted-foreground">{rule}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      )}

                      {hangout.requirements && (
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">What to Bring</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {hangout.requirements.map((req, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                  <span className="text-primary font-bold mt-1">•</span>
                                  <span className="text-muted-foreground">{req}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="participants" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Participants ({hangout.participants.length}/{hangout.maxParticipants})</CardTitle>
                      <CardDescription>People joining this hangout</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Organizer */}
                      <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                        <Avatar>
                          <AvatarImage src={hangout.organizer.avatar} />
                          <AvatarFallback>{hangout.organizer.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{hangout.organizer.name}</span>
                            <Badge variant="outline" className="text-xs">Organizer</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Created this hangout
                          </p>
                        </div>
                      </div>

                      <Separator />

                      {/* Accepted participants */}
                      {acceptedParticipants.length > 0 && (
                        <div>
                          <h4 className="font-medium text-green-700 mb-3">Going ({acceptedParticipants.length})</h4>
                          <div className="space-y-3">
                            {acceptedParticipants.map((participant) => (
                              <div key={participant.user.$id} className="flex items-start gap-3">
                                <Avatar>
                                  <AvatarImage src={participant.user.avatar} />
                                  <AvatarFallback>{participant.user.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{participant.user.name}</span>
                                    {getRSVPIcon(participant.rsvpStatus)}
                                  </div>
                                  {/* Only show personal messages if user is participant or organizer */}
                                  {(isParticipant || isOrganizer) && participant.message && (
                                    <p className="text-sm text-muted-foreground mt-1">
                                      &quot;{participant.message}&quot;
                                    </p>
                                  )}
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Joined {new Date(participant.joinedAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Maybe participants */}
                      {maybeParticipants.length > 0 && (
                        <>
                          <Separator />
                          <div>
                            <h4 className="font-medium text-yellow-700 mb-3">Maybe ({maybeParticipants.length})</h4>
                            <div className="space-y-3">
                              {maybeParticipants.map((participant) => (
                                <div key={participant.user.$id} className="flex items-start gap-3">
                                  <Avatar>
                                    <AvatarImage src={participant.user.avatar} />
                                    <AvatarFallback>{participant.user.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">{participant.user.name}</span>
                                      {getRSVPIcon(participant.rsvpStatus)}
                                    </div>
                                    {/* Only show personal messages if user is participant or organizer */}
                                    {(isParticipant || isOrganizer) && participant.message && (
                                      <p className="text-sm text-muted-foreground mt-1">
                                        &quot;{participant.message}&quot;
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {/* Privacy notice for non-participants */}
                      {!isParticipant && !isOrganizer && (
                        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground text-center">
                            💬 Join this hangout to see participant messages and access the group chat!
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Chat tab - only show if user is participant or organizer */}
                {(isParticipant || isOrganizer) && (
                  <TabsContent value="chat" className="space-y-6 mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Group Chat</CardTitle>
                        <CardDescription>Stay connected with other participants</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <ScrollArea className="h-80 pr-4">
                          <div className="space-y-4">
                            {hangout.chatMessages?.map((message) => (
                              <div key={message.$id} className="flex gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={message.senderAvatar} />
                                  <AvatarFallback>{message.senderName[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-sm">{message.senderName}</span>
                                    <span className="text-xs text-muted-foreground">
                                      {new Date(message.timestamp).toLocaleString()}
                                    </span>
                                  </div>
                                  <p className="text-sm">{message.message}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                        
                        <Separator />
                        
                        <div className="flex gap-2">
                          <Input
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          />
                          <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}

                <TabsContent value="details" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Hangout Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Created:</span>
                          <p className="text-muted-foreground">
                            {new Date(hangout.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium">Last updated:</span>
                          <p className="text-muted-foreground">
                            {new Date(hangout.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium">Visibility:</span>
                          <p className="text-muted-foreground">
                            {hangout.isPrivate ? 'Private' : 'Public'}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium">Hangout ID:</span>
                          <p className="text-muted-foreground font-mono text-xs">
                            {hangout.$id}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick actions */}
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {isOrganizer ? (
                      <>
                        <Button className="w-full" size="lg">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Hangout
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setShowInviteModal(true)}
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          Invite Friends
                        </Button>
                        <Button variant="outline" className="w-full">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Manage Participants
                        </Button>
                      </>
                    ) : !isParticipant ? (
                      <>
                        <Button 
                          className="w-full" 
                          disabled={!canJoin}
                          size="lg"
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          {canJoin ? 'Join Hangout' : 'Hangout Full'}
                        </Button>
                        <Button variant="outline" className="w-full">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Contact Organizer
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          size="lg"
                        >
                          <UserMinus className="h-4 w-4 mr-2" />
                          Leave Hangout
                        </Button>
                        <Button variant="outline" className="w-full">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Contact Organizer
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Date & Time */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">When</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{startDateTime.date}</p>
                      <p className="text-sm text-muted-foreground">
                        {startDateTime.time}
                        {endDateTime && ` - ${endDateTime.time}`}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Add to Calendar
                  </Button>
                </CardContent>
              </Card>

              {/* Venue info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Venue</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={hangout.venue.imageUrl}
                      alt={hangout.venue.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-medium">{hangout.venue.name}</h3>
                      <p className="text-sm text-muted-foreground">{hangout.venue.category}</p>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{hangout.venue.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>{'$'.repeat(hangout.venue.priceLevel)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {hangout.venue.address}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <MapIcon className="h-4 w-4 mr-2" />
                        Directions
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        View Venue
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Participants summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Participants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">
                      {hangout.participants.length}/{hangout.maxParticipants}
                    </span>
                    <span className="text-sm text-muted-foreground">joined</span>
                  </div>
                  
                  <div className="flex -space-x-2">
                    <Avatar className="border-2 border-background">
                      <AvatarImage src={hangout.organizer.avatar} />
                      <AvatarFallback>{hangout.organizer.name[0]}</AvatarFallback>
                    </Avatar>
                    {hangout.participants.slice(0, 4).map((participant) => (
                      <Avatar key={participant.user.$id} className="border-2 border-background">
                        <AvatarImage src={participant.user.avatar} />
                        <AvatarFallback>{participant.user.name[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                    {hangout.participants.length > 4 && (
                      <div className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                        <span className="text-xs font-medium">
                          +{hangout.participants.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      {/* Invite Modal */}
      <InviteModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        hangoutId={hangoutId}
        hangoutTitle={hangout.title}
      />
    </div>
  )
} 