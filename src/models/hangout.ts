export interface User {
  $id: string
  name: string
  email: string
  avatar?: string
}

export interface Venue {
  $id: string
  name: string
  address: string
  category: string
  rating: number
  priceLevel: number
  imageUrl: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export type HangoutStatus = 'draft' | 'open' | 'confirmed' | 'ongoing' | 'completed' | 'cancelled'

export type RSVPStatus = 'pending' | 'accepted' | 'declined' | 'maybe'

export interface Participant {
  user: User
  rsvpStatus: RSVPStatus
  joinedAt: string
  message?: string
}

export interface Hangout {
  $id: string
  title: string
  description: string
  venue: Venue
  organizer: User
  participants: Participant[]
  maxParticipants: number
  startDateTime: string
  endDateTime?: string
  status: HangoutStatus
  isPrivate: boolean
  tags: string[]
  createdAt: string
  updatedAt: string
  coverImage?: string
  rules?: string[]
  requirements?: string[]
  chatMessages?: ChatMessage[]
}

export interface ChatMessage {
  $id: string
  senderId: string
  senderName: string
  senderAvatar?: string
  message: string
  timestamp: string
  type: 'text' | 'system' | 'media'
}

export interface CreateHangoutData {
  title: string
  description: string
  venueId: string
  startDateTime: string
  endDateTime?: string
  maxParticipants: number
  isPrivate: boolean
  tags: string[]
  rules?: string[]
  requirements?: string[]
  coverImage?: string
} 