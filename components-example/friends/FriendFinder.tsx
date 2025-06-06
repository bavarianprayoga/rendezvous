
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Search, UserPlus, Heart, MapPin } from 'lucide-react';

// Mock data for potential friends
const mockUsers = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    location: 'Downtown',
    bio: 'Coffee enthusiast and weekend hiker. Always looking for new cafés and trails to explore.',
    interests: ['Coffee', 'Hiking', 'Photography'],
    mutualFriends: 3
  },
  {
    id: '2',
    name: 'Jamie Smith',
    avatar: 'https://i.pravatar.cc/150?img=4',
    location: 'Eastside',
    bio: 'Foodie and concert-goer. I know all the best spots for late-night eats and live music.',
    interests: ['Food', 'Music', 'Nightlife'],
    mutualFriends: 2
  },
  {
    id: '3',
    name: 'Taylor Lee',
    avatar: 'https://i.pravatar.cc/150?img=3',
    location: 'Westside',
    bio: 'Art lover and bookworm. You\'ll find me at gallery openings or quiet bookstore cafés.',
    interests: ['Art', 'Reading', 'Museums'],
    mutualFriends: 1
  }
];

export default function FriendFinder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  
  const allInterests = ['Coffee', 'Food', 'Art', 'Music', 'Sports', 'Outdoors', 'Nightlife', 'Reading'];
  
  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };
  
  const filteredUsers = mockUsers.filter(user => {
    // Filter by search query
    if (searchQuery && !user.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !user.bio.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by selected interests
    if (selectedInterests.length > 0 && 
        !user.interests.some(interest => selectedInterests.includes(interest))) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl venue-card-shadow">
        <h2 className="text-2xl font-bold mb-6">Find Friends with Similar Interests</h2>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              placeholder="Search by name or interests..."
            />
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2">Filter by interests:</p>
            <div className="flex flex-wrap gap-2">
              {allInterests.map((interest) => (
                <Badge
                  key={interest}
                  variant={selectedInterests.includes(interest) ? 'default' : 'outline'}
                  className={`cursor-pointer ${
                    selectedInterests.includes(interest) 
                      ? 'bg-rendezvous-blue text-white' 
                      : 'bg-white text-gray-700'
                  }`}
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <Card key={user.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4 flex">
                  <Avatar className="h-16 w-16 mr-4">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-lg">{user.name}</h3>
                      <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                        <UserPlus size={16} />
                      </Button>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin size={14} className="mr-1" />
                      {user.location}
                      {user.mutualFriends > 0 && (
                        <span className="ml-2 flex items-center">
                          • <Heart size={12} className="mx-1 text-rendezvous-blue" /> 
                          {user.mutualFriends} mutual {user.mutualFriends === 1 ? 'friend' : 'friends'}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{user.bio}</p>
                    <div className="flex flex-wrap gap-1">
                      {user.interests.map((interest) => (
                        <Badge 
                          key={interest} 
                          variant="secondary" 
                          className="text-xs bg-rendezvous-lightBlue text-rendezvous-blue"
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-2 text-center py-12">
            <p className="text-gray-500">No matching friends found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
      
      {filteredUsers.length > 0 && (
        <div className="text-center">
          <Button variant="outline" className="rounded-full">
            Load more suggestions
          </Button>
        </div>
      )}
    </div>
  );
}
