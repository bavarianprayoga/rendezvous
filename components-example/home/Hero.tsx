
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Users, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-b from-white to-rendezvous-offWhite py-20 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Find the perfect place for your next
            <span className="text-rendezvous-blue"> hangout</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Discover authentic venues based on your social needs, not just business listings. Perfect for planning meetups with friends.
          </p>
          
          <div className="bg-white p-3 rounded-full shadow-lg max-w-3xl mx-auto flex flex-col md:flex-row items-center">
            <div className="flex items-center flex-1 w-full mb-2 md:mb-0 md:mr-2">
              <Search className="ml-3 mr-1 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Coffee shops, restaurants, parks..." 
                className="w-full p-2 focus:outline-none text-gray-800"
              />
            </div>
            <div className="flex items-center flex-1 w-full mb-2 md:mb-0 md:mr-2">
              <MapPin className="ml-3 mr-1 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Downtown, South Side..." 
                className="w-full p-2 focus:outline-none text-gray-800"
              />
            </div>
            <div className="flex items-center flex-1 w-full mb-2 md:mb-0 md:mr-4">
              <Users className="ml-3 mr-1 text-gray-400" size={20} />
              <select className="w-full p-2 focus:outline-none text-gray-800 bg-transparent">
                <option value="any">Any size</option>
                <option value="1-2">1-2 people</option>
                <option value="3-4">3-4 people</option>
                <option value="5-8">5-8 people</option>
                <option value="9+">9+ people</option>
              </select>
            </div>
            <Button className="w-full md:w-auto bg-rendezvous-blue hover:bg-rendezvous-darkBlue rounded-full text-white px-8 py-6">
              Search
            </Button>
          </div>
          
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
            <span className="text-gray-500">Popular:</span>
            <Link to="/venues?type=cafe" className="text-rendezvous-blue hover:underline">Cafés</Link>
            <span className="text-gray-300">•</span>
            <Link to="/venues?mood=cozy" className="text-rendezvous-blue hover:underline">Cozy spots</Link>
            <span className="text-gray-300">•</span>
            <Link to="/venues?occasion=date" className="text-rendezvous-blue hover:underline">Date night</Link>
            <span className="text-gray-300">•</span>
            <Link to="/venues?type=rooftop" className="text-rendezvous-blue hover:underline">Rooftops</Link>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="hidden md:block absolute top-20 right-10 w-20 h-20 bg-rendezvous-blue opacity-10 rounded-full"></div>
      <div className="hidden md:block absolute bottom-20 left-10 w-32 h-32 bg-rendezvous-blue opacity-10 rounded-full"></div>
    </div>
  );
}
