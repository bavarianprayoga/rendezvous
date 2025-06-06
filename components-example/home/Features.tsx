
import { Calendar, Users, Map } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Map size={32} className="text-rendezvous-blue" />,
      title: 'Social Context Discovery',
      description: 'Find places that match your group size, mood, and occasion instead of endless scrolling through reviews.'
    },
    {
      icon: <Calendar size={32} className="text-rendezvous-blue" />,
      title: 'Group Planning Tools',
      description: 'Coordinate with friends through voting, scheduling, and real-time updates for seamless hangout planning.'
    },
    {
      icon: <Users size={32} className="text-rendezvous-blue" />,
      title: 'Friend Finder',
      description: 'Connect with new people who share your hangout interests and expand your social circle.'
    }
  ];
  
  return (
    <div className="py-16 bg-rendezvous-offWhite">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Why Use Rendezvous?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're reinventing how friends discover and plan great places to hang out together.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl venue-card-shadow text-center">
              <div className="mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
