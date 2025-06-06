'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Search, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/Auth'
import { avatars } from '@/models/client/config'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuthStore()
  const router = useRouter()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  const getUserAvatar = () => {
    if (user?.name) {
      return avatars.getInitials(user.name).toString()
    }
    return null
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-background border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">R</span>
          </div>
          <span className="text-xl font-bold">Rendezvous</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/discover" className="text-muted-foreground hover:text-primary transition-colors">
            Discover
          </Link>
          <Link href="/hangouts" className="text-muted-foreground hover:text-primary transition-colors">
            Hangouts
          </Link>
          <Link href="/friends" className="text-muted-foreground hover:text-primary transition-colors">
            Friends
          </Link>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search venues..."
              className="pl-10 w-64"
            />
          </div>
          
          {user ? (
            <>
              <Button asChild>
                <Link href="/hangouts/create">
                  Create Hangout
                </Link>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={getUserAvatar() || undefined} alt={user.name || 'User'} />
                    <AvatarFallback>{user.name?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => router.push('/profile')}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/settings')}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background pb-4 px-4 border-b">
          <div className="flex flex-col space-y-3">
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search venues..."
                className="pl-10 w-full"
              />
            </div>
            <Link 
              href="/discover" 
              className="py-2 px-3 text-muted-foreground hover:bg-muted rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Discover
            </Link>
            <Link 
              href="/hangouts" 
              className="py-2 px-3 text-muted-foreground hover:bg-muted rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Hangouts
            </Link>
            <Link 
              href="/friends" 
              className="py-2 px-3 text-muted-foreground hover:bg-muted rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Friends
            </Link>
            {user ? (
              <>
                <Link 
                  href="/profile" 
                  className="py-2 px-3 text-muted-foreground hover:bg-muted rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Button asChild className="w-full">
                  <Link href="/hangouts/create">Create Hangout</Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
} 