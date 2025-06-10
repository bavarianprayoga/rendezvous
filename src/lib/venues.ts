import { databases, storage } from '@/models/client/config'
import { db, venueCollection, mediaBucket } from '@/models/name'

export interface Venue {
  id: string
  name: string
  location: string
  description: string
  image: string
  tags: string[]
  category: string
  upToNPeople: number
}

export interface AppwriteVenue {
  $id: string
  venueId: string
  name: string
  location: string
  description: string
  image: string
  moodTags: string[]
  occasionTags: string[]
  typeTags: string[]
  groupSize: number
}

// Transform Appwrite venue data to frontend format
export function transformVenue(appwriteVenue: AppwriteVenue): Venue {
  // Combine all tags from different categories
  const allTags = [
    ...(appwriteVenue.moodTags || []),
    ...(appwriteVenue.occasionTags || []),
    ...(appwriteVenue.typeTags || [])
  ]
  
  const category = appwriteVenue.typeTags?.[0] || 'Venue'
  
  return {
    id: appwriteVenue.$id,
    name: appwriteVenue.name,
    location: appwriteVenue.location,
    description: appwriteVenue.description || '',
    image: appwriteVenue.image || '',
    tags: allTags,
    category: category,
    upToNPeople: appwriteVenue.groupSize || 1
  }
}

// Alternative: Get direct file URL (for when getFilePreview doesn't work)
export function getDirectImageUrl(fileId: string): string {
  if (!fileId) return ''
  // Construct direct file URL using Appwrite's file URL format
  // This matches the "file URL" you mentioned seeing in the console
  try {
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_HOST_URL || ''
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || ''
    return `${endpoint}/storage/buckets/${mediaBucket}/files/${fileId}/view?project=${projectId}`
  } catch (error) {
    console.error('Error constructing direct image URL:', error)
    return ''
  }
}

// Get image URL from Appwrite storage
export function getImageUrl(fileId: string): string {
  if (!fileId) return ''
  
  // Try the direct URL approach first since you mentioned it works in browser
  const directUrl = getDirectImageUrl(fileId)
  if (directUrl) return directUrl
  
  // Fallback to the API methods
  try {
    // Use getFilePreview for better image handling with proper URL
    const result = storage.getFilePreview(
      mediaBucket, 
      fileId,
      2000, // width
      2000, // height
      'top', // gravity
      100, // quality
      0, // borderWidth
      '', // borderColor
      0, // borderRadius
      0, // opacity
      0, // rotation
      '', // background
      'jpg' // output format
    )
    return result.href
  } catch (error) {
    console.error('Error getting image URL:', error)
    // Fallback: construct URL manually
    try {
      const result = storage.getFileView(mediaBucket, fileId)
      return result.href
    } catch (fallbackError) {
      console.error('Fallback error getting image URL:', fallbackError)
      return ''
    }
  }
}

// Fetch all venues from Appwrite
export async function fetchVenues(): Promise<Venue[]> {
  try {
    const response = await databases.listDocuments(db, venueCollection)
    const venues = response.documents as unknown as AppwriteVenue[]
    
    return venues.map(venue => {
      const transformedVenue = transformVenue(venue)
      // Get proper image URL if image exists
      if (transformedVenue.image) {
        transformedVenue.image = getImageUrl(transformedVenue.image)
      }
      return transformedVenue
    })
  } catch (error) {
    console.error('Error fetching venues:', error)
    return []
  }
}

// Enhanced search venues with comprehensive filters
export async function searchVenues(
  searchPlace?: string,
  searchLocation?: string,
  groupSize?: number,
  occasion?: string,
  mood?: string,
  type?: string
): Promise<Venue[]> {
  try {
    // For now, we'll fetch all venues and filter client-side
    // In production, you might want to use Appwrite queries for better performance
    const allVenues = await fetchVenues()
    
    return allVenues.filter(venue => {
      // Place/venue name filter
      const placeMatch = !searchPlace || 
        venue.name.toLowerCase().includes(searchPlace.toLowerCase()) ||
        venue.description.toLowerCase().includes(searchPlace.toLowerCase()) ||
        venue.tags.some(tag => tag.toLowerCase().includes(searchPlace.toLowerCase())) ||
        venue.category.toLowerCase().includes(searchPlace.toLowerCase())
      
      // Location filter
      const locationMatch = !searchLocation || 
        venue.location.toLowerCase().includes(searchLocation.toLowerCase())
      
      // Group size filter - venue must accommodate the group size
      const sizeMatch = !groupSize || venue.upToNPeople >= groupSize

      // Tag-based filtering - check if venue has the selected tags
      const occasionMatch = !occasion || venue.tags.includes(occasion)
      const moodMatch = !mood || venue.tags.includes(mood)
      const typeMatch = !type || venue.tags.includes(type)

      return placeMatch && locationMatch && sizeMatch && occasionMatch && moodMatch && typeMatch
    })
  } catch (error) {
    console.error('Error searching venues:', error)
    return []
  }
}

// Get all unique filter values for dropdowns
export async function getFilterOptions(): Promise<{
  occasions: string[]
  moods: string[]
  types: string[]
  locations: string[]
}> {
  try {
    const allVenues = await fetchVenues()
    
    // Extract filter options from your existing tags
    const allTags = allVenues.flatMap(venue => venue.tags)
    
    // Define which tags belong to which categories based on your data
    const occasionTags = ['Casual', 'Semi-formal']
    const moodTags = ['Sports', 'Cozy', 'Chill']
    const typeTags = ['Outdoor', 'Brunch', 'Cafe', 'Golf']
    
    // Filter available options based on what's actually in your data
    const occasions = occasionTags.filter(tag => allTags.includes(tag))
    const moods = moodTags.filter(tag => allTags.includes(tag))
    const types = typeTags.filter(tag => allTags.includes(tag))
    const locations = [...new Set(allVenues.map(v => v.location).filter(Boolean))]
    
    return { occasions, moods, types, locations }
  } catch (error) {
    console.error('Error getting filter options:', error)
    return { occasions: [], moods: [], types: [], locations: [] }
  }
} 