import type { User, Venue, Post, HangoutPlan, FriendRequest, Comment } from "./types"

// Mock Users
export const mockUsers: User[] = [
  {
    uid: "user1",
    username: "alexj",
    displayName: "Alex Johnson",
    email: "alex@example.com",
    profilePictureUrl: "/placeholder.svg?height=100&width=100&text=AJ",
    friendIds: ["user2", "user3", "user4"],
    interests: ["cafes", "hiking", "photography"],
    createdAt: "2025-01-15T12:00:00Z",
  },
  {
    uid: "user2",
    username: "samtaylor",
    displayName: "Sam Taylor",
    email: "sam@example.com",
    profilePictureUrl: "/placeholder.svg?height=100&width=100&text=ST",
    friendIds: ["user1", "user3"],
    interests: ["restaurants", "craft beer", "music"],
    createdAt: "2025-01-20T14:30:00Z",
  },
  {
    uid: "user3",
    username: "jamiesmith",
    displayName: "Jamie Smith",
    email: "jamie@example.com",
    profilePictureUrl: "/placeholder.svg?height=100&width=100&text=JS",
    friendIds: ["user1", "user2"],
    interests: ["concerts", "bars", "travel"],
    createdAt: "2025-02-05T09:15:00Z",
  },
  {
    uid: "user4",
    username: "twilson",
    displayName: "Taylor Wilson",
    email: "taylor@example.com",
    profilePictureUrl: "/placeholder.svg?height=100&width=100&text=TW",
    friendIds: ["user1"],
    interests: ["brunch", "art galleries", "wine"],
    createdAt: "2025-02-10T16:45:00Z",
  },
  {
    uid: "user5",
    username: "jlee",
    displayName: "Jordan Lee",
    email: "jordan@example.com",
    profilePictureUrl: "/placeholder.svg?height=100&width=100&text=JL",
    friendIds: [],
    interests: ["cafes", "music", "nightlife"],
    createdAt: "2025-02-15T11:20:00Z",
  },
]

// Mock Venues
export const mockVenues: Venue[] = [
  {
    id: "venue1",
    name: "Coastal Coffee House",
    address: "123 Oceanfront Drive, Seaside, CA",
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
    },
    description:
      "A cozy spot with ocean views and amazing pastries. Perfect for small gatherings, work sessions, or quiet conversations with friends.",
    primaryImageUrl: "/placeholder.svg?height=600&width=800&text=Coastal+Coffee",
    tags: {
      mood: ["relaxed", "cozy", "quiet"],
      groupSize: ["2-4"],
      occasion: ["catch-up", "work", "date"],
      type: ["cafe"],
    },
    creatorId: "user1",
    postCount: 18,
    ratingAvg: 4.7,
    createdAt: "2024-12-10T08:30:00Z",
  },
  {
    id: "venue2",
    name: "Urban Rooftop Bar",
    address: "456 Downtown Ave, Metropolis, CA",
    location: {
      latitude: 34.0535,
      longitude: -118.24,
    },
    description:
      "Stunning city views with craft cocktails and small plates. Perfect for evening hangouts and celebrations.",
    primaryImageUrl: "/placeholder.svg?height=600&width=800&text=Urban+Rooftop",
    tags: {
      mood: ["lively", "upscale", "energetic"],
      groupSize: ["5-8"],
      occasion: ["celebration", "night-out", "date"],
      type: ["bar"],
    },
    creatorId: "user2",
    postCount: 42,
    ratingAvg: 4.5,
    createdAt: "2024-11-15T18:45:00Z",
  },
  {
    id: "venue3",
    name: "The Hidden Garden",
    address: "789 Parkside Lane, Greenville, CA",
    location: {
      latitude: 34.05,
      longitude: -118.245,
    },
    description:
      "Secret garden restaurant with farm-to-table cuisine. An intimate setting perfect for special occasions.",
    primaryImageUrl: "/placeholder.svg?height=600&width=800&text=Hidden+Garden",
    tags: {
      mood: ["intimate", "romantic", "peaceful"],
      groupSize: ["8+"],
      occasion: ["celebration", "special-occasion", "date-night"],
      type: ["restaurant"],
    },
    creatorId: "user3",
    postCount: 27,
    ratingAvg: 4.8,
    createdAt: "2025-01-05T19:30:00Z",
  },
  {
    id: "venue4",
    name: "Vinyl & Vino",
    address: "101 Arts District Blvd, Creative City, CA",
    location: {
      latitude: 34.055,
      longitude: -118.238,
    },
    description: "Wine bar with record players and vintage vinyl collection. A chill atmosphere for music lovers.",
    primaryImageUrl: "/placeholder.svg?height=600&width=800&text=Vinyl+Vino",
    tags: {
      mood: ["chill", "nostalgic", "artistic"],
      groupSize: ["2-4"],
      occasion: ["catch-up", "date-night", "casual"],
      type: ["bar"],
    },
    creatorId: "user4",
    postCount: 31,
    ratingAvg: 4.6,
    createdAt: "2025-01-20T17:15:00Z",
  },
  {
    id: "venue5",
    name: "Bytes & Bites",
    address: "202 Tech Hub Street, Innovation City, CA",
    location: {
      latitude: 34.051,
      longitude: -118.242,
    },
    description: "Tech-themed cafe with board games and fast wifi. Great for work meetings or casual hangouts.",
    primaryImageUrl: "/placeholder.svg?height=600&width=800&text=Bytes+Bites",
    tags: {
      mood: ["casual", "productive", "geeky"],
      groupSize: ["5-8"],
      occasion: ["work", "casual", "gaming"],
      type: ["cafe"],
    },
    creatorId: "user5",
    postCount: 15,
    ratingAvg: 4.3,
    createdAt: "2025-02-01T10:00:00Z",
  },
  {
    id: "venue6",
    name: "Skyline Lounge",
    address: "303 Financial District Way, Metropolis, CA",
    location: {
      latitude: 34.053,
      longitude: -118.25,
    },
    description: "Elegant rooftop lounge with panoramic city views. Perfect for upscale gatherings and special events.",
    primaryImageUrl: "/placeholder.svg?height=600&width=800&text=Skyline+Lounge",
    tags: {
      mood: ["upscale", "sophisticated", "elegant"],
      groupSize: ["8+"],
      occasion: ["celebration", "business", "special-occasion"],
      type: ["bar", "restaurant"],
    },
    creatorId: "user2",
    postCount: 54,
    ratingAvg: 4.9,
    createdAt: "2024-12-05T20:00:00Z",
  },
]

// Mock Posts
export const mockPosts: Post[] = [
  {
    id: "post1",
    userId: "user1",
    venueId: "venue1",
    mediaUrl: "/placeholder.svg?height=600&width=800&text=Coastal+Coffee+Post",
    mediaType: "image",
    caption: "Perfect morning spot for coffee and work! #CoastalViews #CoffeeTime",
    createdAt: "2025-04-01T09:30:00Z",
    likesCount: 42,
    likedBy: ["user2", "user3", "user4"],
    username: "alexj",
    userProfilePictureUrl: "/placeholder.svg?height=100&width=100&text=AJ",
    venueName: "Coastal Coffee House",
  },
  {
    id: "post2",
    userId: "user2",
    venueId: "venue2",
    mediaUrl: "/placeholder.svg?height=600&width=800&text=Urban+Rooftop+Post",
    mediaType: "image",
    caption: "Amazing sunset views and cocktails with friends! #CityViews #NightOut",
    createdAt: "2025-04-02T19:45:00Z",
    likesCount: 78,
    likedBy: ["user1", "user3", "user5"],
    username: "samtaylor",
    userProfilePictureUrl: "/placeholder.svg?height=100&width=100&text=ST",
    venueName: "Urban Rooftop Bar",
  },
  {
    id: "post3",
    userId: "user3",
    venueId: "venue3",
    mediaUrl: "/placeholder.svg?height=600&width=800&text=Hidden+Garden+Post",
    mediaType: "image",
    caption: "Celebrating my birthday at this magical place! The food was incredible. #BirthdayDinner #FoodieHeaven",
    createdAt: "2025-04-03T20:15:00Z",
    likesCount: 56,
    likedBy: ["user1", "user2", "user4"],
    username: "jamiesmith",
    userProfilePictureUrl: "/placeholder.svg?height=100&width=100&text=JS",
    venueName: "The Hidden Garden",
  },
  {
    id: "post4",
    userId: "user4",
    venueId: "venue4",
    mediaUrl: "/placeholder.svg?height=600&width=800&text=Vinyl+Vino+Post",
    mediaType: "image",
    caption: "Wine and vinyl - perfect combination for a relaxed evening! #WineLover #VinylCollection",
    createdAt: "2025-04-04T18:30:00Z",
    likesCount: 35,
    likedBy: ["user1", "user5"],
    username: "twilson",
    userProfilePictureUrl: "/placeholder.svg?height=100&width=100&text=TW",
    venueName: "Vinyl & Vino",
  },
  {
    id: "post5",
    userId: "user5",
    venueId: "venue5",
    mediaUrl: "/placeholder.svg?height=600&width=800&text=Bytes+Bites+Post",
    mediaType: "image",
    caption: "Game night with the tech crew! This place has the best board game collection. #GameNight #TechLife",
    createdAt: "2025-04-05T19:00:00Z",
    likesCount: 29,
    likedBy: ["user2", "user3"],
    username: "jlee",
    userProfilePictureUrl: "/placeholder.svg?height=100&width=100&text=JL",
    venueName: "Bytes & Bites",
  },
]

// Mock Hangout Plans
export const mockHangoutPlans: HangoutPlan[] = [
  {
    id: "plan1",
    title: "Coffee Catchup",
    creatorId: "user1",
    invitedUserIds: ["user1", "user2", "user3", "user4"],
    status: "confirmed",
    potentialVenueIds: ["venue1", "venue5"],
    scheduledTimeOptions: ["2025-05-10T10:00:00Z", "2025-05-11T11:00:00Z"],
    confirmedVenueId: "venue1",
    confirmedTime: "2025-05-10T10:00:00Z",
    createdAt: "2025-04-25T14:30:00Z",
    participants: [
      {
        id: "user1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=100&width=100&text=AJ",
        status: "going",
      },
      {
        id: "user2",
        name: "Sam Taylor",
        avatar: "/placeholder.svg?height=100&width=100&text=ST",
        status: "going",
      },
      {
        id: "user3",
        name: "Jamie Smith",
        avatar: "/placeholder.svg?height=100&width=100&text=JS",
        status: "maybe",
      },
      {
        id: "user4",
        name: "Taylor Wilson",
        avatar: "/placeholder.svg?height=100&width=100&text=TW",
        status: "pending",
      },
    ],
  },
  {
    id: "plan2",
    title: "Rooftop Happy Hour",
    creatorId: "user2",
    invitedUserIds: ["user1", "user2", "user5"],
    status: "confirmed",
    potentialVenueIds: ["venue2", "venue6"],
    scheduledTimeOptions: ["2025-05-15T18:00:00Z", "2025-05-16T18:00:00Z"],
    confirmedVenueId: "venue2",
    confirmedTime: "2025-05-15T18:00:00Z",
    createdAt: "2025-04-28T09:15:00Z",
    participants: [
      {
        id: "user1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=100&width=100&text=AJ",
        status: "going",
      },
      {
        id: "user2",
        name: "Sam Taylor",
        avatar: "/placeholder.svg?height=100&width=100&text=ST",
        status: "going",
      },
      {
        id: "user5",
        name: "Jordan Lee",
        avatar: "/placeholder.svg?height=100&width=100&text=JL",
        status: "declined",
      },
    ],
  },
  {
    id: "plan3",
    title: "Dinner at Hidden Garden",
    creatorId: "user1",
    invitedUserIds: ["user1", "user3", "user4"],
    status: "completed",
    potentialVenueIds: ["venue3"],
    scheduledTimeOptions: ["2025-04-20T19:30:00Z"],
    confirmedVenueId: "venue3",
    confirmedTime: "2025-04-20T19:30:00Z",
    createdAt: "2025-04-10T12:00:00Z",
    participants: [
      {
        id: "user1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=100&width=100&text=AJ",
        status: "going",
      },
      {
        id: "user3",
        name: "Jamie Smith",
        avatar: "/placeholder.svg?height=100&width=100&text=JS",
        status: "going",
      },
      {
        id: "user4",
        name: "Taylor Wilson",
        avatar: "/placeholder.svg?height=100&width=100&text=TW",
        status: "going",
      },
    ],
  },
]

// Mock Friend Requests
export const mockFriendRequests: FriendRequest[] = [
  {
    id: "request1",
    senderId: "user3",
    receiverId: "user5",
    status: "pending",
    createdAt: "2025-04-01T10:30:00Z",
    updatedAt: "2025-04-01T10:30:00Z",
  },
  {
    id: "request2",
    senderId: "user4",
    receiverId: "user5",
    status: "pending",
    createdAt: "2025-04-02T14:15:00Z",
    updatedAt: "2025-04-02T14:15:00Z",
  },
  {
    id: "request3",
    senderId: "user5",
    receiverId: "user2",
    status: "accepted",
    createdAt: "2025-03-28T09:45:00Z",
    updatedAt: "2025-03-29T11:20:00Z",
  },
]

// Mock Comments for venues
export const mockComments: Record<string, Comment[]> = {
  venue1: [
    {
      id: "comment1",
      userId: "user2",
      userName: "Alex Johnson",
      userImage: "/placeholder.svg?height=100&width=100&text=AJ",
      text: "This place has the best atmosphere! Perfect for catching up with friends. The ocean view is incredible, especially at sunset.",
      timestamp: "2 days ago",
      likes: 12,
    },
    {
      id: "comment2",
      userId: "user2",
      userName: "Sam Taylor",
      userImage: "/placeholder.svg?height=100&width=100&text=ST",
      text: "The pastries are amazing! I recommend the blueberry scones and their signature latte.",
      timestamp: "1 week ago",
      likes: 8,
    },
    {
      id: "comment3",
      userId: "user3",
      userName: "Jamie Smith",
      userImage: "/placeholder.svg?height=100&width=100&text=JS",
      text: "Great spot for a small work meeting. The WiFi is reliable and there are enough outlets for everyone.",
      timestamp: "2 weeks ago",
      likes: 5,
    },
  ],
}

// Helper function to get a mock user by ID
export const getMockUserById = (userId: string): User | undefined => {
  return mockUsers.find((user) => user.uid === userId)
}

// Helper function to get a mock venue by ID
export const getMockVenueById = (venueId: string): Venue | undefined => {
  return mockVenues.find((venue) => venue.id === venueId)
}

// Helper function to get mock comments for a venue
export const getMockCommentsForVenue = (venueId: string): Comment[] => {
  return mockComments[venueId] || []
}

// Helper function to get mock posts for a venue
export const getMockPostsForVenue = (venueId: string): Post[] => {
  return mockPosts.filter((post) => post.venueId === venueId)
}

// Helper function to get mock posts by a user
export const getMockPostsByUser = (userId: string): Post[] => {
  return mockPosts.filter((post) => post.userId === userId)
}

// Helper function to get mock hangout plans for a user
export const getMockHangoutPlansForUser = (userId: string): HangoutPlan[] => {
  return mockHangoutPlans.filter((plan) => plan.invitedUserIds.includes(userId))
}

// Helper function to get mock friend requests for a user
export const getMockFriendRequestsForUser = (userId: string): FriendRequest[] => {
  return mockFriendRequests.filter(
    (request) => (request.receiverId === userId || request.senderId === userId) && request.status === "pending",
  )
}
