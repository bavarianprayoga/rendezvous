
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-rendezvous-blue">
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 32 32" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="14" fill="#0048e8" />
            <path 
              d="M11 12C11 10.8954 11.8954 10 13 10H19C20.1046 10 21 10.8954 21 12V20C21 21.1046 20.1046 22 19 22H13C11.8954 22 11 21.1046 11 20V12Z" 
              fill="white" 
            />
            <path 
              d="M14 15.5C14 14.6716 14.6716 14 15.5 14V14C16.3284 14 17 14.6716 17 15.5V18.5C17 19.3284 16.3284 20 15.5 20V20C14.6716 20 14 19.3284 14 18.5V15.5Z" 
              fill="#0048e8" 
            />
          </svg>
          <span className="text-xl font-bold">Rendezvous</span>
        </Link>

        {/* Desktop Navigation */}
        <div className={cn("md:flex items-center space-x-6", isMobile ? "hidden" : "flex")}>
          <Link to="/venues" className="text-gray-600 hover:text-rendezvous-blue transition-colors">
            Discover
          </Link>
          <Link to="/hangouts" className="text-gray-600 hover:text-rendezvous-blue transition-colors">
            Hangouts
          </Link>
          <Link to="/friends" className="text-gray-600 hover:text-rendezvous-blue transition-colors">
            Friends
          </Link>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search venues..."
              className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-rendezvous-blue/20"
            />
          </div>
          <Button className="rounded-full bg-rendezvous-blue hover:bg-rendezvous-darkBlue">
            Create Hangout
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User size={20} />
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4 border-b border-gray-100">
          <div className="flex flex-col space-y-3">
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search venues..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-rendezvous-blue/20"
              />
            </div>
            <Link to="/venues" className="py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md">
              Discover
            </Link>
            <Link to="/hangouts" className="py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md">
              Hangouts
            </Link>
            <Link to="/friends" className="py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md">
              Friends
            </Link>
            <Link to="/profile" className="py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md">
              Profile
            </Link>
            <Button className="w-full rounded-full bg-rendezvous-blue hover:bg-rendezvous-darkBlue">
              Create Hangout
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
