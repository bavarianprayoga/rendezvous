
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Search, Users, X } from 'lucide-react';

interface VenueFiltersProps {
  onFilterChange: (filters: any) => void;
}

const moodOptions = ['Cozy', 'Energetic', 'Chill', 'Romantic', 'Elegant', 'Festive', 'Quiet'];
const occasionOptions = ['Date Night', 'Casual Meeting', 'Birthday', 'Work', 'Celebration', 'Family'];
const typeOptions = ['Café', 'Restaurant', 'Bar', 'Park', 'Club', 'Rooftop', 'Gallery'];

const VenueFilters: React.FC<VenueFiltersProps> = ({ onFilterChange }) => {
  const [groupSize, setGroupSize] = useState([4]);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleTag = (tag: string, type: 'mood' | 'occasion' | 'type') => {
    let newSelection;
    
    switch(type) {
      case 'mood':
        newSelection = selectedMoods.includes(tag)
          ? selectedMoods.filter(m => m !== tag)
          : [...selectedMoods, tag];
        setSelectedMoods(newSelection);
        break;
      case 'occasion':
        newSelection = selectedOccasions.includes(tag)
          ? selectedOccasions.filter(o => o !== tag)
          : [...selectedOccasions, tag];
        setSelectedOccasions(newSelection);
        break;
      case 'type':
        newSelection = selectedTypes.includes(tag)
          ? selectedTypes.filter(t => t !== tag)
          : [...selectedTypes, tag];
        setSelectedTypes(newSelection);
        break;
    }

    // Notify parent of filter changes
    onFilterChange({
      groupSize: groupSize[0],
      moods: selectedMoods,
      occasions: selectedOccasions,
      types: selectedTypes
    });
  };

  const clearFilters = () => {
    setGroupSize([4]);
    setSelectedMoods([]);
    setSelectedOccasions([]);
    setSelectedTypes([]);
    
    onFilterChange({
      groupSize: 4,
      moods: [],
      occasions: [],
      types: []
    });
  };

  return (
    <div className="bg-white p-4 rounded-xl venue-card-shadow mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filter Venues</h2>
        {(selectedMoods.length > 0 || selectedOccasions.length > 0 || selectedTypes.length > 0 || groupSize[0] !== 4) && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="text-sm text-gray-500"
          >
            Clear All
            <X size={16} className="ml-1" />
          </Button>
        )}
      </div>

      <div className="space-y-5">
        {/* Group Size Slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Users size={16} className="mr-1" /> Group Size
            </label>
            <span className="text-sm font-medium bg-rendezvous-lightBlue text-rendezvous-blue rounded-full px-2 py-0.5">
              {groupSize[0]} {groupSize[0] === 1 ? 'person' : 'people'}
            </span>
          </div>
          <Slider
            value={groupSize}
            min={1}
            max={10}
            step={1}
            onValueChange={setGroupSize}
            className="my-2"
          />
        </div>

        {/* Mood Filter */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Mood</label>
          <div className="flex flex-wrap gap-2">
            {moodOptions.map((mood) => (
              <Badge
                key={mood}
                variant={selectedMoods.includes(mood) ? 'default' : 'outline'}
                className={`cursor-pointer hover:bg-rendezvous-lightBlue hover:text-rendezvous-blue ${
                  selectedMoods.includes(mood) 
                    ? 'bg-rendezvous-blue text-white' 
                    : 'bg-white text-gray-700'
                }`}
                onClick={() => toggleTag(mood, 'mood')}
              >
                {mood}
              </Badge>
            ))}
          </div>
        </div>

        {/* Occasion Filter */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Occasion</label>
          <div className="flex flex-wrap gap-2">
            {occasionOptions.map((occasion) => (
              <Badge
                key={occasion}
                variant={selectedOccasions.includes(occasion) ? 'default' : 'outline'}
                className={`cursor-pointer hover:bg-rendezvous-lightBlue hover:text-rendezvous-blue ${
                  selectedOccasions.includes(occasion) 
                    ? 'bg-rendezvous-blue text-white' 
                    : 'bg-white text-gray-700'
                }`}
                onClick={() => toggleTag(occasion, 'occasion')}
              >
                {occasion}
              </Badge>
            ))}
          </div>
        </div>

        {/* Venue Type Filter */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Venue Type</label>
          <div className="flex flex-wrap gap-2">
            {typeOptions.map((type) => (
              <Badge
                key={type}
                variant={selectedTypes.includes(type) ? 'default' : 'outline'}
                className={`cursor-pointer hover:bg-rendezvous-lightBlue hover:text-rendezvous-blue ${
                  selectedTypes.includes(type) 
                    ? 'bg-rendezvous-blue text-white' 
                    : 'bg-white text-gray-700'
                }`}
                onClick={() => toggleTag(type, 'type')}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueFilters;
