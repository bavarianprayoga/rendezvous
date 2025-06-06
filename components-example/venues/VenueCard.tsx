
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Share, MapPin } from 'lucide-react';

export interface VenueCardProps {
  venueId: string;
  name: string;
  location: string;
  description?: string;
  image: string[];
  moodTags?: string[];
  occasionTags?: string[];
  typeTags?: string[];
  groupSize?: number;
}

const VenueCard: React.FC<VenueCardProps> = ({
  venueId,
  name,
  location,
  description,
  image,
  moodTags = [],
  occasionTags = [],
  typeTags = [],
  groupSize,
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden venue-card-shadow transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col h-full">
      <div className="relative">
        <img
          src={image[0] || "https://images.unsplash.com/photo-1506744038136-46273834b3fb"}
          alt={name}
          className="w-full h-48 object-cover"
        />
        {typeTags.length > 0 && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-rendezvous-blue text-white">
              {typeTags[0]}
            </Badge>
          </div>
        )}
        {groupSize && (
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-white text-gray-700">
              {groupSize === 1 ? 'Solo' : groupSize > 10 ? '10+ people' : `Up to ${groupSize} people`}
            </Badge>
          </div>
        )}
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold line-clamp-1">{name}</h3>
        </div>
        <div className="flex items-center mt-1 text-gray-500 text-sm">
          <MapPin size={14} className="mr-1" />
          <span className="line-clamp-1">{location}</span>
        </div>
        
        {description && (
          <p className="mt-3 text-sm text-gray-600 line-clamp-2">{description}</p>
        )}

        <div className="mt-3 flex flex-wrap gap-1">
          {moodTags.slice(0, 2).map((tag) => (
            <Badge variant="secondary" key={tag} className="text-xs bg-rendezvous-lightBlue text-rendezvous-blue">
              {tag}
            </Badge>
          ))}
          {occasionTags.slice(0, 1).map((tag) => (
            <Badge variant="secondary" key={tag} className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs rounded-full flex items-center gap-1"
          >
            <Calendar size={14} />
            Plan Hangout
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs rounded-full"
          >
            <Share size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
