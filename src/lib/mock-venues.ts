// import { Venue } from './venues'

// // Mock venues with comprehensive filtering attributes for demo
// export const mockVenuesWithFilters: Venue[] = [
//   {
//     id: 'venue-1',
//     name: 'Turu Coffee',
//     location: 'Downtown Coffee District',
//     description: 'A cozy artisanal coffee shop perfect for intimate conversations and small gatherings. Features local art, comfortable seating, and exceptional coffee.',
//     image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop',
//     tags: ['coffee', 'wifi', 'quiet', 'local-art'],
//     category: 'Cafe',
//     upToNPeople: 6,
//     occasion: 'Casual',
//     mood: 'Cozy',
//     type: 'Cafe'
//   },
//   {
//     id: 'venue-2',
//     name: 'Skyline Rooftop Bar',
//     location: 'Downtown Financial District',
//     description: 'Upscale rooftop bar with stunning city views. Perfect for evening gatherings, business networking, and special celebrations.',
//     image: 'https://images.unsplash.com/photo-1574045419806-6afbe4b9e6b2?w=800&h=600&fit=crop',
//     tags: ['rooftop', 'cocktails', 'city-views', 'upscale'],
//     category: 'Bar',
//     upToNPeople: 12,
//     occasion: 'Semi-formal',
//     mood: 'Chill',
//     type: 'Brunch'
//   },
//   {
//     id: 'venue-3',
//     name: 'The Botanical Gardens',
//     location: 'Eastside Park District',
//     description: 'Beautiful outdoor space with lush greenery and walking paths. Ideal for picnics, outdoor activities, and nature-loving groups.',
//     image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop',
//     tags: ['nature', 'walking', 'picnic', 'family-friendly'],
//     category: 'Park',
//     upToNPeople: 20,
//     occasion: 'Casual',
//     mood: 'Chill',
//     type: 'Outdoor'
//   },
//   {
//     id: 'venue-4',
//     name: 'Sports Bar & Grill',
//     location: 'University District',
//     description: 'Lively sports bar with multiple screens, pool tables, and a full menu. Great for watching games and competitive socializing.',
//     image: 'https://images.unsplash.com/photo-1571935424264-89a0c3d99ee6?w=800&h=600&fit=crop',
//     tags: ['sports', 'games', 'pool', 'loud'],
//     category: 'Bar',
//     upToNPeople: 15,
//     occasion: 'Casual',
//     mood: 'Sports',
//     type: 'Brunch'
//   },
//   {
//     id: 'venue-5',
//     name: 'Sunrise Golf Club',
//     location: 'Country Club Heights',
//     description: 'Premium golf course with well-maintained greens and clubhouse facilities. Perfect for golf enthusiasts and business meetings.',
//     image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=600&fit=crop',
//     tags: ['golf', 'premium', 'business', 'scenic'],
//     category: 'Golf Course',
//     upToNPeople: 8,
//     occasion: 'Semi-formal',
//     mood: 'Sports',
//     type: 'Golf'
//   },
//   {
//     id: 'venue-6',
//     name: 'Central Park Meadow',
//     location: 'Central District',
//     description: 'Open meadow space perfect for yoga, group fitness, picnics, and outdoor gatherings. Beautiful natural setting.',
//     image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
//     tags: ['yoga', 'fitness', 'meadow', 'peaceful'],
//     category: 'Park',
//     upToNPeople: 25,
//     occasion: 'Casual',
//     mood: 'Chill',
//     type: 'Outdoor'
//   },
//   {
//     id: 'venue-7',
//     name: 'Brunch House',
//     location: 'Trendy Arts Quarter',
//     description: 'Stylish brunch spot with seasonal menus and bottomless mimosas. Perfect for weekend gatherings and special occasions.',
//     image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&h=600&fit=crop',
//     tags: ['brunch', 'mimosas', 'trendy', 'weekend'],
//     category: 'Restaurant',
//     upToNPeople: 10,
//     occasion: 'Semi-formal',
//     mood: 'Cozy',
//     type: 'Brunch'
//   },
//   {
//     id: 'venue-8',
//     name: 'Moonlight Books & Café',
//     location: 'Quiet Quarter',
//     description: 'Independent bookstore with cozy café area. Perfect for book clubs, quiet conversations, and intellectual gatherings.',
//     image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
//     tags: ['books', 'quiet', 'intellectual', 'cozy'],
//     category: 'Bookstore',
//     upToNPeople: 8,
//     occasion: 'Casual',
//     mood: 'Cozy',
//     type: 'Cafe'
//   },
//   {
//     id: 'venue-9',
//     name: 'Summit Climbing Gym',
//     location: 'Adventure District',
//     description: 'Indoor climbing facility with walls for all skill levels. Great for fitness groups, team building, and adventure seekers.',
//     image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
//     tags: ['climbing', 'fitness', 'adventure', 'beginner-friendly'],
//     category: 'Gym',
//     upToNPeople: 12,
//     occasion: 'Casual',
//     mood: 'Sports',
//     type: 'Outdoor'
//   },
//   {
//     id: 'venue-10',
//     name: 'Global Café',
//     location: 'Cultural Center',
//     description: 'International café with diverse menu and cultural events. Perfect for language exchange, cultural meetups, and diverse gatherings.',
//     image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
//     tags: ['international', 'cultural', 'diverse', 'events'],
//     category: 'Café',
//     upToNPeople: 15,
//     occasion: 'Casual',
//     mood: 'Chill',
//     type: 'Cafe'
//   },
//   {
//     id: 'venue-11',
//     name: 'Riverside Golf Course',
//     location: 'Riverside Country Club',
//     description: 'Championship golf course with river views and excellent facilities. Ideal for serious golfers and corporate events.',
//     image: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=800&h=600&fit=crop',
//     tags: ['golf', 'championship', 'corporate', 'river-views'],
//     category: 'Golf Course',
//     upToNPeople: 12,
//     occasion: 'Semi-formal',
//     mood: 'Sports',
//     type: 'Golf'
//   },
//   {
//     id: 'venue-12',
//     name: 'Garden Brunch Bistro',
//     location: 'Garden District',
//     description: 'Elegant outdoor brunch spot with garden seating and farm-to-table menu. Perfect for sophisticated weekend gatherings.',
//     image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
//     tags: ['garden', 'farm-to-table', 'elegant', 'outdoor-seating'],
//     category: 'Restaurant',
//     upToNPeople: 8,
//     occasion: 'Semi-formal',
//     mood: 'Cozy',
//     type: 'Brunch'
//   },
//   {
//     id: 'venue-13',
//     name: 'Adventure Park',
//     location: 'North Hills Recreation Area',
//     description: 'Large outdoor recreation area with hiking trails, picnic areas, and adventure activities. Great for active groups.',
//     image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
//     tags: ['hiking', 'adventure', 'large-groups', 'activities'],
//     category: 'Park',
//     upToNPeople: 30,
//     occasion: 'Casual',
//     mood: 'Sports',
//     type: 'Outdoor'
//   },
//   {
//     id: 'venue-14',
//     name: 'The Library Café',
//     location: 'Academic District',
//     description: 'Quiet café within a historic library building. Perfect for study groups, quiet meetings, and intellectual discussions.',
//     image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
//     tags: ['quiet', 'academic', 'historic', 'study'],
//     category: 'Café',
//     upToNPeople: 6,
//     occasion: 'Casual',
//     mood: 'Cozy',
//     type: 'Cafe'
//   },
//   {
//     id: 'venue-15',
//     name: 'Sunday Brunch Club',
//     location: 'Uptown District',
//     description: 'Upscale brunch restaurant with live jazz music and extensive cocktail menu. Perfect for special occasion brunches.',
//     image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop',
//     tags: ['upscale', 'jazz', 'cocktails', 'special-occasions'],
//     category: 'Restaurant',
//     upToNPeople: 12,
//     occasion: 'Semi-formal',
//     mood: 'Chill',
//     type: 'Brunch'
//   }
// ]

// // Override the fetchVenues function to return our mock data for demo
// export async function fetchMockVenues(): Promise<Venue[]> {
//   // Simulate API delay
//   await new Promise(resolve => setTimeout(resolve, 500))
//   return mockVenuesWithFilters
// } 