
import { Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

interface Hangout {
  id: string;
  name: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  status: 'planning' | 'confirmed' | 'voting';
  participants: Array<{
    name: string;
    avatar?: string;
  }>;
  progress: number;
}

const mockHangouts: Hangout[] = [
  {
    id: '1',
    name: 'Weekend Coffee Meetup',
    venue: 'Cozy Corner Café',
    location: 'Arts District, 456 Elm St',
    date: 'Saturday, Jun 4',
    time: '10:00 AM',
    status: 'confirmed',
    participants: [
      { name: 'Alex', avatar: 'https://i.pravatar.cc/150?img=1' },
      { name: 'Morgan', avatar: 'https://i.pravatar.cc/150?img=2' },
      { name: 'Taylor', avatar: 'https://i.pravatar.cc/150?img=3' },
      { name: 'Jordan' },
    ],
    progress: 100,
  },
  {
    id: '2',
    name: 'Birthday Dinner Planning',
    venue: 'Vote in progress...',
    location: '3 options to choose from',
    date: 'Friday, Jun 10',
    time: '7:30 PM',
    status: 'voting',
    participants: [
      { name: 'Alex', avatar: 'https://i.pravatar.cc/150?img=1' },
      { name: 'Jamie', avatar: 'https://i.pravatar.cc/150?img=4' },
      { name: 'Riley', avatar: 'https://i.pravatar.cc/150?img=5' },
      { name: 'Casey' },
      { name: 'Taylor', avatar: 'https://i.pravatar.cc/150?img=3' },
    ],
    progress: 60,
  },
];

export default function ActiveHangouts() {
  return (
    <div className="bg-white p-6 rounded-xl venue-card-shadow">
      <h2 className="text-2xl font-bold mb-6">Your Hangouts</h2>
      
      <div className="space-y-6">
        {mockHangouts.map((hangout) => (
          <div 
            key={hangout.id} 
            className="border border-gray-100 rounded-lg p-4 transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium text-lg">{hangout.name}</h3>
              <Badge className={
                hangout.status === 'confirmed' 
                  ? 'bg-green-100 text-green-800 hover:bg-green-100'
                  : hangout.status === 'voting'
                  ? 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-100'
              }>
                {hangout.status === 'confirmed' 
                  ? 'Confirmed'
                  : hangout.status === 'voting'
                  ? 'Voting Open'
                  : 'Planning'
                }
              </Badge>
            </div>
            
            <div className="flex items-start mb-4">
              <MapPin size={16} className="mr-2 text-gray-500 mt-0.5" />
              <div>
                <div className="font-medium">{hangout.venue}</div>
                <div className="text-sm text-gray-500">{hangout.location}</div>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <Calendar size={16} className="mr-2 text-gray-500" />
              <div className="text-gray-700">
                {hangout.date} at {hangout.time}
              </div>
            </div>
            
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <div className="text-sm text-gray-500 flex items-center">
                  <Users size={14} className="mr-1" />
                  {hangout.participants.length} participants
                </div>
                <div className="text-sm text-gray-500">
                  {hangout.progress}% complete
                </div>
              </div>
              <Progress value={hangout.progress} className="h-1.5" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {hangout.participants.slice(0, 4).map((participant, index) => (
                  <Avatar key={index} className="border-2 border-white w-8 h-8">
                    {participant.avatar ? (
                      <AvatarImage src={participant.avatar} />
                    ) : null}
                    <AvatarFallback className="text-xs bg-rendezvous-blue text-white">
                      {participant.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {hangout.participants.length > 4 && (
                  <Avatar className="border-2 border-white w-8 h-8">
                    <AvatarFallback className="text-xs bg-gray-200 text-gray-600">
                      +{hangout.participants.length - 4}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs rounded-full"
              >
                {hangout.status === 'voting' ? 'Vote Now' : 'View Details'}
              </Button>
            </div>
          </div>
        ))}
        
        {mockHangouts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">You don't have any active hangouts yet.</p>
            <Button className="bg-rendezvous-blue hover:bg-rendezvous-darkBlue">
              Plan Your First Hangout
            </Button>
          </div>
        )}
      </div>
      
      {mockHangouts.length > 0 && (
        <div className="mt-6 text-center">
          <Button className="w-full sm:w-auto bg-rendezvous-blue hover:bg-rendezvous-darkBlue">
            View All Hangouts
          </Button>
        </div>
      )}
    </div>
  );
}
