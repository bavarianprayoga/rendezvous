
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { VenueCardProps } from '../venues/VenueCard';
import VenueCard from '../venues/VenueCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for featured venues
const FEATURED_VENUES: VenueCardProps[] = [
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
  }
];

const categoryTabs = [
  { id: 'popular', label: 'Popular Places' },
  { id: 'new', label: 'New & Notable' },
  { id: 'trending', label: 'Trending Now' }
];

export default function FeaturedVenues() {
  const [activeCategory, setActiveCategory] = useState('popular');

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Discover Hangout Spots</h2>
            <p className="text-gray-600">Places perfect for meeting friends and creating memories</p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            {categoryTabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeCategory === tab.id ? 'default' : 'outline'}
                className={activeCategory === tab.id ? 'bg-rendezvous-blue' : ''}
                onClick={() => setActiveCategory(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="venue-grid mb-10">
          {FEATURED_VENUES.map((venue) => (
            <VenueCard key={venue.venueId} {...venue} />
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/venues">
            <Button variant="outline" className="rounded-full">
              Explore more places
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
