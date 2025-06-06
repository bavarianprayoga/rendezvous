
import React, { useState } from 'react';
import VenueCard, { VenueCardProps } from './VenueCard';
import VenueFilters from './VenueFilters';

// Mock data for venues
const MOCK_VENUES: VenueCardProps[] = [
  {
    venueId: '1',
    name: 'Skyline Rooftop Bar',
    location: 'Downtown, 123 Main St',
    description: 'Enjoy craft cocktails with panoramic city views at our stylish rooftop bar.',
    image: ['https://images.unsplash.com/photo-1505373877841-8d25f7d46678'],
    moodTags: ['Energetic', 'Romantic'],
    occasionTags: ['Date Night', 'Celebration'],
    typeTags: ['Rooftop', 'Bar'],
    groupSize: 6
  },
  {
    venueId: '2',
    name: 'Cozy Corner Café',
    location: 'Arts District, 456 Elm St',
    description: 'A quiet café with comfortable seating, perfect for catching up with friends over coffee.',
    image: ['https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb'],
    moodTags: ['Cozy', 'Quiet'],
    occasionTags: ['Casual Meeting', 'Work'],
    typeTags: ['Café'],
    groupSize: 4
  },
  {
    venueId: '3',
    name: 'The Botanical Gardens',
    location: 'Eastside Park, 789 Park Ave',
    description: 'Lush gardens with walking paths, perfect for picnics and outdoor gatherings.',
    image: ['https://images.unsplash.com/photo-1500673922987-e212871fec22'],
    moodTags: ['Chill', 'Elegant'],
    occasionTags: ['Family', 'Date Night'],
    typeTags: ['Park'],
    groupSize: 8
  },
  {
    venueId: '4',
    name: 'Urban Eats Market',
    location: 'Market District, 101 Market St',
    description: 'A food hall featuring diverse local vendors, perfect for groups with different tastes.',
    image: ['https://images.unsplash.com/photo-1606787366850-de6330128bfc'],
    moodTags: ['Energetic', 'Festive'],
    occasionTags: ['Casual Meeting', 'Birthday'],
    typeTags: ['Restaurant'],
    groupSize: 10
  },
  {
    venueId: '5',
    name: 'Lakeside Lounge',
    location: 'Waterfront, 222 Lake Dr',
    description: 'A relaxed bar with lake views, fire pits, and lawn games.',
    image: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb'],
    moodTags: ['Chill', 'Cozy'],
    occasionTags: ['Casual Meeting', 'Date Night'],
    typeTags: ['Bar'],
    groupSize: 5
  },
  {
    venueId: '6',
    name: 'Gallery 360',
    location: 'Arts District, 360 Gallery Road',
    description: 'A contemporary art space with rotating exhibits and a small café.',
    image: ['https://images.unsplash.com/photo-1605810230434-7631ac76ec81'],
    moodTags: ['Quiet', 'Elegant'],
    occasionTags: ['Date Night', 'Casual Meeting'],
    typeTags: ['Gallery'],
    groupSize: 2
  }
];

const VenueExplorer: React.FC = () => {
  const [filters, setFilters] = useState({
    groupSize: 4,
    moods: [] as string[],
    occasions: [] as string[],
    types: [] as string[]
  });
  
  const [venues, setVenues] = useState<VenueCardProps[]>(MOCK_VENUES);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    
    // Apply filters to venues
    const filteredVenues = MOCK_VENUES.filter(venue => {
      // Filter by group size
      if (venue.groupSize && newFilters.groupSize > venue.groupSize) {
        return false;
      }
      
      // Filter by mood tags
      if (newFilters.moods.length > 0 && 
          !newFilters.moods.some((mood: string) => venue.moodTags?.includes(mood))) {
        return false;
      }
      
      // Filter by occasion tags
      if (newFilters.occasions.length > 0 && 
          !newFilters.occasions.some((occasion: string) => venue.occasionTags?.includes(occasion))) {
        return false;
      }
      
      // Filter by venue type
      if (newFilters.types.length > 0 && 
          !newFilters.types.some((type: string) => venue.typeTags?.includes(type))) {
        return false;
      }
      
      return true;
    });
    
    setVenues(filteredVenues.length > 0 ? filteredVenues : MOCK_VENUES);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <VenueFilters onFilterChange={handleFilterChange} />
        </div>
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-bold mb-6">Discover Places</h2>
          
          {venues.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No venues match your filters</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filter criteria</p>
            </div>
          ) : (
            <div className="venue-grid">
              {venues.map((venue) => (
                <VenueCard key={venue.venueId} {...venue} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VenueExplorer;
