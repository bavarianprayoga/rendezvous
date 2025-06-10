'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, MapPin, Share2 } from 'lucide-react'
import { Venue } from '@/lib/venues'

interface VenueCardProps {
  venue: Venue
  onPlanHangout?: (venue: Venue) => void
  onShare?: (venue: Venue) => void
  showPlanButton?: boolean
}

export default function VenueCard({ venue, onPlanHangout, onShare, showPlanButton = true }: VenueCardProps) {
  const handleCardClick = () => {
    window.location.href = `/venue/${venue.id}`
  }

  const handlePlanHangout = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onPlanHangout) {
      onPlanHangout(venue)
    } else {
      // Default behavior - redirect to create hangout with venue pre-selected
      window.location.href = `/hangouts/create?venue=${venue.id}`
    }
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onShare) {
      onShare(venue)
    } else {
      // Default share behavior
      if (navigator.share) {
        navigator.share({
          title: venue.name,
          text: `Check out ${venue.name} - ${venue.description}`,
          url: window.location.origin + `/venue/${venue.id}`
        })
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.origin + `/venue/${venue.id}`)
      }
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="relative h-48" onClick={handleCardClick}>
        {venue.image ? (
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              const target = e.target as HTMLImageElement
              target.src = 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&h=600&fit=crop'
            }}
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">No image</p>
          </div>
        )}
        
        {/* Top badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <Badge variant="secondary">
            {venue.category}
          </Badge>
          <Badge variant="secondary">
            Up to {venue.upToNPeople} people
          </Badge>
        </div>

        {/* Filter attribute badges from tags */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          {venue.tags.filter(tag => 
            ['Casual', 'Semi-formal', 'Sports', 'Cozy', 'Chill', 'Outdoor', 'Brunch', 'Cafe', 'Golf'].includes(tag)
          ).slice(0, 3).map(tag => (
            <Badge key={tag} variant="outline" className="bg-white/90 text-black">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      <CardHeader onClick={handleCardClick}>
        <CardTitle className="text-lg group-hover:text-primary transition-colors">
          {venue.name}
        </CardTitle>
        <CardDescription className="flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          {venue.location}
        </CardDescription>
      </CardHeader>
      
      <CardContent onClick={handleCardClick}>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {venue.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {venue.tags.slice(0, 3).map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {venue.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{venue.tags.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      
      {showPlanButton && (
        <CardFooter className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary"
            onClick={handlePlanHangout}
          >
            <Calendar className="h-4 w-4 mr-1" />
            Plan Hangout
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  )
} 