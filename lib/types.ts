// Define types based on the Firebase structure

// User types
export type User = {
  uid: string
  username: string
  displayName: string
  email: string | null
  profilePictureUrl: string | null
  friendIds: string[]
  blockedUserIds?: string[]
  interests: string[]
  createdAt: string
}

// Venue types
export type VenueTag = {
  mood: string[]
  groupSize: string[]
  occasion: string[]
  type: string[]
}

export type Venue = {
  id: string
  name: string
  address: string
  location: {
    latitude: number
    longitude: number
  }
  description: string
  primaryImageUrl: string
  tags: VenueTag
  creatorId: string
  postCount: number
  ratingAvg: number
  createdAt: string
}

// Post types
export type Post = {
  id: string
  userId: string
  venueId: string
  mediaUrl: string
  mediaType: "image" | "video"
  caption: string
  createdAt: string
  likesCount: number
  likedBy: string[]
  // Denormalized data
  username: string
  userProfilePictureUrl: string
  venueName: string
}

// Hangout Plan types
export type PlanStatus = "planning" | "voting" | "confirmed" | "cancelled" | "completed"

export type HangoutPlan = {
  id: string
  title: string
  creatorId: string
  invitedUserIds: string[]
  status: PlanStatus
  potentialVenueIds: string[]
  scheduledTimeOptions: string[]
  confirmedVenueId?: string
  confirmedTime?: string
  createdAt: string
  // Additional fields for UI
  participants?: {
    id: string
    name: string
    avatar: string
    status: "going" | "maybe" | "declined" | "pending"
  }[]
}

// Friend Request types
export type FriendRequestStatus = "pending" | "accepted" | "declined"

export type FriendRequest = {
  id: string
  senderId: string
  receiverId: string
  status: FriendRequestStatus
  createdAt: string
  updatedAt: string
}

// Vote type for hangout plans
export type Vote = {
  userId: string
  votedVenueId: string
  timestamp: string
}

// Message type for hangout plan chats
export type Message = {
  id: string
  userId: string
  username: string
  text: string
  timestamp: string
}

// Comment type for venue reviews
export type Comment = {
  id: string
  userId: string
  userName: string
  userImage: string
  text: string
  timestamp: string
  likes: number
}
