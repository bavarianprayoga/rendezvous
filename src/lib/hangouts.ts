import { Hangout, User, Venue, Participant } from '@/models/hangout'

// Mock users
export const mockUsers: User[] = [
  {
    $id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  },
  {
    $id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
  },
  {
    $id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
  },
  {
    $id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  },
  {
    $id: '5',
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
  },
  {
    $id: '6',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily'
  }
]

// Mock venues (reusing from existing venue data structure)
export const mockVenues: Venue[] = [
  {
    $id: 'venue-1',
    name: 'Turu Coffee',
    address: '123 Sleep Street',
    category: 'Café',
    rating: 4.8,
    priceLevel: 2,
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop',
    coordinates: { lat: 34.0522, lng: -118.2437 }
  },
  {
    $id: 'venue-2',
    name: 'Skyline Rooftop Bar',
    address: '123 Main St, Downtown',
    category: 'Bar',
    rating: 4.8,
    priceLevel: 3,
    imageUrl: 'https://images.unsplash.com/photo-1574045419806-6afbe4b9e6b2?w=800&h=600&fit=crop',
    coordinates: { lat: 34.0522, lng: -118.2437 }
  },
  {
    $id: 'venue-3',
    name: 'The Botanical Gardens',
    address: '789 Park Ave, Eastside Park',
    category: 'Park',
    rating: 4.7,
    priceLevel: 1,
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop',
    coordinates: { lat: 34.0522, lng: -118.2437 }
  }
]

// Mock participants for Coffee & Code Session
const coffeeCodeParticipants: Participant[] = [
  {
    user: mockUsers[1], // Jane Smith
    rsvpStatus: 'accepted',
    joinedAt: '2024-12-20T10:30:00Z',
    message: 'Excited to code and chat! Bringing my laptop and some good vibes ☕ Working on a React component library project!'
  },
  {
    user: mockUsers[2], // Mike Johnson
    rsvpStatus: 'accepted',
    joinedAt: '2024-12-21T14:15:00Z',
    message: 'Count me in! Working on a React project, would love some feedback on my architecture decisions'
  },
  {
    user: mockUsers[4], // Alex Chen
    rsvpStatus: 'accepted',
    joinedAt: '2024-12-22T09:45:00Z',
    message: 'Perfect timing! I need help with TypeScript generic types and some advanced patterns 🤓'
  },
  {
    user: mockUsers[5], // Emily Davis
    rsvpStatus: 'maybe',
    joinedAt: '2024-12-23T16:20:00Z',
    message: 'Might join a bit late depending on work schedule. Building a full-stack app with Next.js!'
  }
]

// Main hangout: Coffee & Code Session
export const coffeeCodeHangout: Hangout = {
  $id: 'hangout-1',
  title: 'Coffee & Code Session',
  description: 'Join us for a relaxed coding session with coffee and good company. Whether you\'re working on personal projects, learning something new, or just want to code alongside other developers, this is the perfect casual meetup. Bring your laptop, current project, and questions!\n\nWe usually spend the first 30 minutes chatting and getting settled, then dive into focused coding time. Feel free to ask for help, share what you\'re working on, or just enjoy the productive atmosphere.',
  venue: mockVenues[0], // Cozy Corner Café
  organizer: mockUsers[0], // John Doe
  participants: coffeeCodeParticipants,
  maxParticipants: 6,
  startDateTime: '2025-01-15T17:00:00Z',
  endDateTime: '2025-01-15T20:00:00Z',
  status: 'confirmed',
  isPrivate: false,
  tags: ['coding', 'coffee', 'networking', 'casual', 'development'],
  createdAt: '2024-12-18T12:00:00Z',
  updatedAt: '2024-12-23T16:20:00Z',
  coverImage: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1200&h=600&fit=crop',
  rules: [
    'Bring your own laptop and projects',
    'Respect others\' focus time',
    'Keep conversations at reasonable volume',
    'Wi-Fi password will be shared in the group chat',
    'Order your own food and drinks'
  ],
  requirements: [
    'Laptop or coding device',
    'Current project or learning materials',
    'Positive attitude and willingness to help others'
  ],
  chatMessages: [
    {
      $id: 'msg-1',
      senderId: '1',
      senderName: 'John Doe',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      message: 'Hey everyone! 👋 Looking forward to our coding session next week. I\'ll be working on a Next.js project with the new App Router if anyone wants to pair program!',
      timestamp: '2024-12-23T10:00:00Z',
      type: 'text'
    },
    {
      $id: 'msg-2',
      senderId: '2',
      senderName: 'Jane Smith',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      message: 'Perfect! I\'m working on a React component library with Storybook. Would love to get some feedback on the API design and documentation.',
      timestamp: '2024-12-23T10:15:00Z',
      type: 'text'
    },
    {
      $id: 'msg-3',
      senderId: '3',
      senderName: 'Mike Johnson',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      message: 'I\'ll bring some TypeScript challenges I\'ve been stuck on. Anyone good with generic types and conditional types? 😅 Also working on state management patterns.',
      timestamp: '2024-12-23T11:30:00Z',
      type: 'text'
    },
    {
      $id: 'msg-4',
      senderId: '1',
      senderName: 'John Doe',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      message: 'The café confirmed our usual corner table will be available! 🎉 Wi-Fi password is "CozyCoding2024" - they have great coffee and reliable internet.',
      timestamp: '2024-12-24T09:00:00Z',
      type: 'text'
    },
    {
      $id: 'msg-5',
      senderId: '5',
      senderName: 'Alex Chen',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      message: 'Thanks for organizing John! I\'ll try to arrive by 5:15 PM at the latest. Bringing my mechanical keyboard for that satisfying typing experience 😄',
      timestamp: '2024-12-24T14:45:00Z',
      type: 'text'
    },
    {
      $id: 'msg-6',
      senderId: '6',
      senderName: 'Emily Davis',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      message: 'Might be 30 mins late due to a client call, but definitely coming! Working on a fascinating project with WebRTC and real-time collaboration.',
      timestamp: '2024-12-24T16:30:00Z',
      type: 'text'
    },
    {
      $id: 'msg-7',
      senderId: '2',
      senderName: 'Jane Smith',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      message: 'Should we create a shared workspace on GitHub for the session? Could be cool to see everyone\'s projects and maybe contribute to each other\'s code!',
      timestamp: '2024-12-24T18:00:00Z',
      type: 'text'
    }
  ]
}

// Other mock hangouts for the list
export const mockHangouts: Hangout[] = [
  coffeeCodeHangout,
  {
    $id: 'hangout-2',
    title: 'Sunset Drinks',
    description: 'Watch the sunset with cocktails and great conversations. Perfect way to unwind after a long week!',
    venue: mockVenues[1], // Skyline Rooftop Bar
    organizer: mockUsers[1], // Jane Smith
    participants: [
      {
        user: mockUsers[0],
        rsvpStatus: 'accepted',
        joinedAt: '2024-12-20T10:30:00Z'
      },
      {
        user: mockUsers[2],
        rsvpStatus: 'accepted',
        joinedAt: '2024-12-21T14:15:00Z'
      }
    ],
    maxParticipants: 8,
    startDateTime: '2025-01-20T18:00:00Z',
    endDateTime: '2025-01-20T21:00:00Z',
    status: 'confirmed',
    isPrivate: false,
    tags: ['drinks', 'sunset', 'social', 'rooftop'],
    createdAt: '2024-12-15T12:00:00Z',
    updatedAt: '2024-12-21T14:15:00Z'
  },
  {
    $id: 'hangout-3',
    title: 'Weekend Picnic',
    description: 'Bring your favorite dish for a potluck picnic in the gardens. Family and pets welcome!',
    venue: mockVenues[2], // The Botanical Gardens
    organizer: mockUsers[2], // Mike Johnson
    participants: [
      {
        user: mockUsers[0],
        rsvpStatus: 'accepted',
        joinedAt: '2024-12-18T16:00:00Z'
      },
      {
        user: mockUsers[1],
        rsvpStatus: 'accepted',
        joinedAt: '2024-12-19T11:30:00Z'
      }
    ],
    maxParticipants: 10,
    startDateTime: '2025-01-05T12:00:00Z',
    endDateTime: '2025-01-05T16:00:00Z',
    status: 'open',
    isPrivate: false,
    tags: ['picnic', 'potluck', 'outdoor', 'family-friendly'],
    createdAt: '2024-12-16T14:00:00Z',
    updatedAt: '2024-12-19T11:30:00Z'
  },
  // Discover hangouts - open public hangouts user hasn't joined
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
        user: mockUsers[1], // Jane Smith
        rsvpStatus: 'accepted',
        joinedAt: '2025-01-02T14:30:00Z',
        message: 'Love morning yoga! 🧘‍♀️'
      },
      {
        user: mockUsers[3], // Sarah Wilson
        rsvpStatus: 'accepted',
        joinedAt: '2025-01-03T16:15:00Z',
        message: 'Perfect way to start the weekend!'
      }
    ],
    maxParticipants: 8,
    startDateTime: '2025-01-25T08:00:00Z',
    endDateTime: '2025-01-25T09:30:00Z',
    status: 'open',
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
        user: mockUsers[2], // Mike Johnson
        rsvpStatus: 'accepted',
        joinedAt: '2025-01-04T12:00:00Z',
        message: 'Excited to learn new techniques! 📸'
      }
    ],
    maxParticipants: 6,
    startDateTime: '2025-01-26T14:00:00Z',
    endDateTime: '2025-01-26T17:00:00Z',
    status: 'open',
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
        user: mockUsers[1], // Jane Smith
        rsvpStatus: 'accepted',
        joinedAt: '2025-01-05T19:30:00Z',
        message: 'Love Le Guin! Can\'t wait to discuss 📚'
      },
      {
        user: mockUsers[4], // Alex Chen
        rsvpStatus: 'maybe',
        joinedAt: '2025-01-06T14:20:00Z',
        message: 'Haven\'t finished the book yet, might be late'
      }
    ],
    maxParticipants: 10,
    startDateTime: '2025-01-28T19:00:00Z',
    endDateTime: '2025-01-28T21:00:00Z',
    status: 'open',
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
        user: mockUsers[3], // Sarah Wilson
        rsvpStatus: 'accepted',
        joinedAt: '2025-01-07T10:15:00Z',
        message: 'First time climbing, nervous but excited! 🧗‍♀️'
      }
    ],
    maxParticipants: 5,
    startDateTime: '2025-02-01T10:00:00Z',
    endDateTime: '2025-02-01T12:00:00Z',
    status: 'open',
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
        user: mockUsers[5], // Emily Davis
        rsvpStatus: 'accepted',
        joinedAt: '2025-01-08T13:45:00Z',
        message: '¡Hola! Ready to practice my Spanish 🇪🇸'
      },
      {
        user: mockUsers[2], // Mike Johnson
        rsvpStatus: 'accepted',
        joinedAt: '2025-01-09T09:20:00Z',
        message: 'Need to brush up on my Spanish for travel!'
      }
    ],
    maxParticipants: 8,
    startDateTime: '2025-01-30T18:30:00Z',
    endDateTime: '2025-01-30T20:30:00Z',
    status: 'open',
    isPrivate: false,
    tags: ['language', 'spanish', 'english', 'cultural', 'practice'],
    createdAt: '2025-01-06T11:00:00Z',
    updatedAt: '2025-01-09T09:20:00Z'
  },
  // Past hangouts
  {
    $id: 'hangout-4',
    title: 'Game Night',
    description: 'An evening of board games and friendly competition. We have classics like Catan, Monopoly, and some exciting new games!',
    venue: {
      $id: 'venue-4',
      name: 'Board Game Café',
      address: 'Westside, 321 Oak St',
      category: 'Café',
      rating: 4.6,
      priceLevel: 2,
      imageUrl: 'https://images.unsplash.com/photo-1544428852-52de7c4b948d?w=800&h=600&fit=crop',
      coordinates: { lat: 34.0522, lng: -118.2437 }
    },
    organizer: mockUsers[3], // Sarah Wilson
    participants: [
      {
        user: mockUsers[0],
        rsvpStatus: 'accepted',
        joinedAt: '2024-12-15T10:30:00Z',
        message: 'Love board games! Looking forward to some Catan 🎲'
      },
      {
        user: mockUsers[1],
        rsvpStatus: 'accepted',
        joinedAt: '2024-12-16T14:15:00Z',
        message: 'Bringing Wingspan! Anyone into strategy games?'
      },
      {
        user: mockUsers[2],
        rsvpStatus: 'accepted',
        joinedAt: '2024-12-17T09:45:00Z',
        message: 'Time to break out the competitive side! 😈'
      },
      {
        user: mockUsers[4],
        rsvpStatus: 'accepted',
        joinedAt: '2024-12-18T16:20:00Z',
        message: 'Can\'t wait! I\'m bringing some new indie games to try'
      },
      {
        user: mockUsers[5],
        rsvpStatus: 'accepted',
        joinedAt: '2024-12-19T11:30:00Z',
        message: 'Perfect way to unwind! See you all there 🎯'
      }
    ],
    maxParticipants: 6,
    startDateTime: '2024-12-20T19:00:00Z',
    endDateTime: '2024-12-20T23:00:00Z',
    status: 'completed',
    isPrivate: false,
    tags: ['games', 'board-games', 'social', 'evening', 'strategy'],
    createdAt: '2024-12-10T14:00:00Z',
    updatedAt: '2024-12-20T23:00:00Z',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop',
    rules: [
      'Respect everyone\'s game choices',
      'No phones during gameplay',
      'Food and drinks welcome',
      'Take turns choosing games',
      'Be a good sport - win or lose!'
    ],
    requirements: [
      'Positive attitude',
      'Patience for learning new games',
      'Snacks to share (optional but appreciated)'
    ]
  },
  {
    $id: 'hangout-5',
    title: 'Brunch Club',
    description: 'Monthly brunch meetup for food lovers. Come hungry and ready to try some amazing dishes!',
    venue: {
      $id: 'venue-5',
      name: 'The Morning Table',
      address: 'Downtown, 654 Pine St',
      category: 'Restaurant',
      rating: 4.9,
      priceLevel: 3,
      imageUrl: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop',
      coordinates: { lat: 34.0522, lng: -118.2437 }
    },
    organizer: mockUsers[0], // Current user organized this one
    participants: [
      {
        user: mockUsers[1],
        rsvpStatus: 'accepted',
        joinedAt: '2024-12-10T10:30:00Z',
        message: 'Their eggs benedict is legendary! Can\'t wait 🥞'
      },
      {
        user: mockUsers[3],
        rsvpStatus: 'accepted',
        joinedAt: '2024-12-12T09:45:00Z',
        message: 'Perfect timing for a weekend treat! ☕'
      },
      {
        user: mockUsers[5],
        rsvpStatus: 'accepted',
        joinedAt: '2024-12-13T16:20:00Z',
        message: 'Love this place! The French toast is amazing 🍞'
      }
    ],
    maxParticipants: 4,
    startDateTime: '2024-12-15T11:00:00Z',
    endDateTime: '2024-12-15T13:00:00Z',
    status: 'completed',
    isPrivate: false,
    tags: ['brunch', 'food', 'social', 'monthly', 'weekend'],
    createdAt: '2024-12-01T14:00:00Z',
    updatedAt: '2024-12-15T13:00:00Z',
    coverImage: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&h=600&fit=crop',
    rules: [
      'Come hungry!',
      'Share interesting food discoveries',
      'Split the bill fairly',
      'No dietary judgment zone',
      'Photos of food encouraged!'
    ],
    requirements: [
      'Appetite for good food',
      'Willingness to try new dishes',
      'Good conversation skills'
    ]
  },
  // Additional upcoming hangout
  {
    $id: 'hangout-6',
    title: 'Morning Hike & Coffee',
    description: 'Start your Sunday with a refreshing hike followed by artisan coffee at the summit café. Perfect for nature lovers and coffee enthusiasts!',
    venue: {
      $id: 'venue-6',
      name: 'Griffith Observatory Trail',
      address: '2800 E Observatory Rd, Los Angeles',
      category: 'Outdoor',
      rating: 4.7,
      priceLevel: 1,
      imageUrl: 'https://images.unsplash.com/photo-1586735585022-a87709c1f43b?w=800&h=600&fit=crop',
      coordinates: { lat: 34.1184, lng: -118.3004 }
    },
    organizer: mockUsers[2], // Mike Johnson
    participants: [
      {
        user: mockUsers[0],
        rsvpStatus: 'accepted',
        joinedAt: '2025-01-02T14:30:00Z',
        message: 'Great way to start the year! Excited for the views 🏔️'
      },
      {
        user: mockUsers[4],
        rsvpStatus: 'accepted',
        joinedAt: '2025-01-03T16:15:00Z',
        message: 'Perfect Sunday activity! I\'ll bring my camera 📸'
      }
    ],
    maxParticipants: 8,
    startDateTime: '2025-01-26T08:00:00Z',
    endDateTime: '2025-01-26T11:00:00Z',
    status: 'open',
    isPrivate: false,
    tags: ['hiking', 'coffee', 'outdoors', 'morning', 'exercise', 'nature'],
    createdAt: '2025-01-01T10:00:00Z',
    updatedAt: '2025-01-03T16:15:00Z',
    coverImage: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=1200&h=600&fit=crop',
    rules: [
      'Wear comfortable hiking shoes',
      'Bring water and snacks',
      'Stay with the group',
      'Respect wildlife and nature',
      'Check weather conditions before coming'
    ],
    requirements: [
      'Basic fitness level',
      'Hiking shoes or sturdy sneakers',
      'Water bottle',
      'Sun protection (hat, sunscreen)',
      'Small backpack for personal items'
    ]
  }
]

// Current user (in a real app, this would come from auth context)
export const currentUser = mockUsers[0] // John Doe is the current user

// Mock friends list for inviting
export const mockFriends = [
  {
    $id: '10',
    name: 'Rachel Green',
    email: 'rachel.green@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel',
    status: 'online',
    mutualFriends: 3
  },
  {
    $id: '11',
    name: 'Tom Wilson',
    email: 'tom.wilson@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom',
    status: 'offline',
    mutualFriends: 7
  },
  {
    $id: '12',
    name: 'Lisa Chen',
    email: 'lisa.chen@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    status: 'online',
    mutualFriends: 2
  },
  {
    $id: '13',
    name: 'Mark Rodriguez',
    email: 'mark.rodriguez@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mark',
    status: 'online',
    mutualFriends: 5
  },
  {
    $id: '14',
    name: 'Nina Patel',
    email: 'nina.patel@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nina',
    status: 'offline',
    mutualFriends: 1
  }
]

// Demo state for created hangouts (in real app, this would be in a proper store)
let demoCreatedHangouts: Hangout[] = []

// Demo invite system
interface HangoutInvite {
  $id: string
  hangoutId: string
  invitedUserId: string
  invitedUserName: string
  invitedUserAvatar: string
  status: 'pending' | 'accepted' | 'declined'
  sentAt: string
  respondedAt?: string
}

let demoInvites: HangoutInvite[] = []

export function getHangoutById(id: string): Hangout | undefined {
  // Check both mock hangouts and demo created hangouts
  return [...mockHangouts, ...demoCreatedHangouts].find(hangout => hangout.$id === id)
}

export function getUserById(id: string): User | undefined {
  return mockUsers.find(user => user.$id === id)
}

export function getCurrentUser(): User {
  return currentUser
}

export function isCurrentUserOrganizer(hangout: Hangout): boolean {
  return hangout.organizer.$id === currentUser.$id
}

export function isCurrentUserParticipant(hangout: Hangout): boolean {
  return hangout.participants.some(participant => participant.user.$id === currentUser.$id)
}

// Helper function to get venue by ID
async function getVenueById(venueId: string): Promise<Venue | null> {
  try {
    const { fetchVenues } = await import('@/lib/venues')
    const venues = await fetchVenues()
    return venues.find(v => v.id === venueId) || null
  } catch (error) {
    console.error('Error fetching venue:', error)
    return null
  }
}

// Demo function to save created hangouts
export async function saveCreatedHangout(hangoutData: any): Promise<Hangout> {
  // Get actual venue data
  const realVenue = await getVenueById(hangoutData.venueId)
  
  // Map real venue data to hangout venue format, with fallback values
  const venue: Venue = realVenue ? {
    $id: realVenue.id,
    name: realVenue.name,
    address: realVenue.location,
    category: realVenue.category,
    rating: Math.random() * 1 + 4, // Random rating between 4.0-5.0
    priceLevel: Math.floor(Math.random() * 3) + 1, // Random price level 1-3
    imageUrl: realVenue.image,
    coordinates: { lat: 34.0522, lng: -118.2437 } // Default coordinates
  } : {
    $id: hangoutData.venueId,
    name: 'Selected Venue',
    address: '123 Demo Street',
    category: 'Café',
    rating: 4.5,
    priceLevel: 2,
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop',
    coordinates: { lat: 34.0522, lng: -118.2437 }
  }

  const newHangout: Hangout = {
    $id: `created-${Date.now()}`,
    title: hangoutData.title,
    description: hangoutData.description,
    venue: venue,
    organizer: currentUser,
    participants: [], // Start with no participants
    maxParticipants: hangoutData.maxParticipants,
    startDateTime: hangoutData.startDateTime,
    endDateTime: hangoutData.endDateTime,
    status: 'open',
    isPrivate: hangoutData.isPrivate,
    tags: hangoutData.tags,
    rules: hangoutData.rules,
    requirements: hangoutData.requirements,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    coverImage: hangoutData.coverImage,
    chatMessages: []
  }
  
  demoCreatedHangouts.push(newHangout)
  return newHangout
}

// Mock invite functions
export function sendHangoutInvites(hangoutId: string, friendIds: string[]): boolean {
  const hangout = getHangoutById(hangoutId)
  if (!hangout || !isCurrentUserOrganizer(hangout)) {
    return false
  }

  friendIds.forEach(friendId => {
    const friend = mockFriends.find(f => f.$id === friendId)
    if (friend) {
      const invite: HangoutInvite = {
        $id: `invite-${Date.now()}-${friendId}`,
        hangoutId,
        invitedUserId: friendId,
        invitedUserName: friend.name,
        invitedUserAvatar: friend.avatar,
        status: 'pending',
        sentAt: new Date().toISOString()
      }
      demoInvites.push(invite)

      // Demo: Auto-respond to some invites after a delay to show the system working
      if (friend.status === 'online') {
        setTimeout(() => {
          // 70% chance to accept, 20% to decline, 10% to stay pending
          const random = Math.random()
          if (random < 0.7) {
            mockRespondToInvite(invite.$id, 'accepted')
          } else if (random < 0.9) {
            mockRespondToInvite(invite.$id, 'declined')
          }
          // 10% chance stays pending (no response)
        }, Math.random() * 5000 + 2000) // Random delay between 2-7 seconds
      }
    }
  })

  return true
}

export function getHangoutInvites(hangoutId: string): HangoutInvite[] {
  return demoInvites.filter(invite => invite.hangoutId === hangoutId)
}

export function getPendingInvites(hangoutId: string): HangoutInvite[] {
  return demoInvites.filter(invite => 
    invite.hangoutId === hangoutId && invite.status === 'pending'
  )
}

export function getFriendsList() {
  return mockFriends
}

export function mockRespondToInvite(inviteId: string, response: 'accepted' | 'declined'): boolean {
  const invite = demoInvites.find(i => i.$id === inviteId)
  if (!invite || invite.status !== 'pending') {
    return false
  }

  invite.status = response
  invite.respondedAt = new Date().toISOString()

  // If accepted, add to hangout participants
  if (response === 'accepted') {
    const hangout = getHangoutById(invite.hangoutId)
    if (hangout) {
      const newParticipant = {
        user: {
          $id: invite.invitedUserId,
          name: invite.invitedUserName,
          email: `${invite.invitedUserName.toLowerCase().replace(' ', '.')}@example.com`,
          avatar: invite.invitedUserAvatar
        },
        rsvpStatus: 'accepted' as const,
        joinedAt: new Date().toISOString(),
        message: 'Thanks for the invite! 🎉'
      }
      hangout.participants.push(newParticipant)
    }
  }

  return true
}

// Utility functions for better mock data management
export function getUpcomingHangouts(): Hangout[] {
  const now = new Date()
  const allHangouts = [...mockHangouts, ...demoCreatedHangouts]
  return allHangouts.filter(hangout => {
    const hangoutDate = new Date(hangout.startDateTime)
    return hangoutDate > now && (hangout.status === 'open' || hangout.status === 'confirmed')
  }).sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime())
}

export function getPastHangouts(): Hangout[] {
  const now = new Date()
  const allHangouts = [...mockHangouts, ...demoCreatedHangouts]
  return allHangouts.filter(hangout => {
    const hangoutDate = new Date(hangout.startDateTime)
    return hangoutDate <= now || hangout.status === 'completed'
  }).sort((a, b) => new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime())
}

export function getMyCreatedHangouts(): Hangout[] {
  const allHangouts = [...mockHangouts, ...demoCreatedHangouts]
  return allHangouts.filter(hangout => isCurrentUserOrganizer(hangout))
}

export function getMyJoinedHangouts(): Hangout[] {
  const allHangouts = [...mockHangouts, ...demoCreatedHangouts]
  return allHangouts.filter(hangout => 
    isCurrentUserParticipant(hangout) && !isCurrentUserOrganizer(hangout)
  )
}

export function getHangoutsByStatus(status: string): Hangout[] {
  const allHangouts = [...mockHangouts, ...demoCreatedHangouts]
  return allHangouts.filter(hangout => hangout.status === status)
}

export function getRecentActivity(): { hangouts: Hangout[], messages: any[] } {
  // Get recent hangouts (created or updated in last 7 days)
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  
  const allHangouts = [...mockHangouts, ...demoCreatedHangouts]
  const recentHangouts = allHangouts.filter(hangout => {
    const updated = new Date(hangout.updatedAt)
    return updated > weekAgo
  }).slice(0, 5)

  // Get recent messages from hangouts the user is involved in
  const userHangouts = allHangouts.filter(hangout => 
    isCurrentUserOrganizer(hangout) || isCurrentUserParticipant(hangout)
  )
  
  const recentMessages = userHangouts
    .flatMap(hangout => hangout.chatMessages || [])
    .filter(message => {
      const messageTime = new Date(message.timestamp)
      return messageTime > weekAgo
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10)

  return { hangouts: recentHangouts, messages: recentMessages }
}

export function formatHangoutDateTime(dateTime: string): { date: string, time: string, isToday: boolean, isTomorrow: boolean } {
  const date = new Date(dateTime)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const isToday = date.toDateString() === today.toDateString()
  const isTomorrow = date.toDateString() === tomorrow.toDateString()
  
  let dateStr = ''
  if (isToday) {
    dateStr = 'Today'
  } else if (isTomorrow) {
    dateStr = 'Tomorrow'
  } else {
    dateStr = date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    })
  }
  
  const timeStr = date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  })

  return { date: dateStr, time: timeStr, isToday, isTomorrow }
} 