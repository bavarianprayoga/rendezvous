"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Home, Search, Map, Calendar, Users, User, LogOut, Menu, X, Sparkles, PlusCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, mockLogout } = useAuth()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // DEVELOPMENT MODE FLAG - Should match the one in auth-provider.tsx
  const BYPASS_AUTH = true

  const handleSignOut = async () => {
    try {
      if (BYPASS_AUTH && mockLogout) {
        // Use mock logout in development mode
        mockLogout()
      } else {
        // Original Firebase signout
        await signOut(auth)
      }
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const navItems = [
    { name: "Home", href: "/feed", icon: <Home className="h-5 w-5" /> },
    { name: "Explore", href: "/explore", icon: <Search className="h-5 w-5" /> },
    { name: "Map", href: "/map", icon: <Map className="h-5 w-5" /> },
    { name: "Plans", href: "/plans", icon: <Calendar className="h-5 w-5" /> },
    { name: "Friends", href: "/friends", icon: <Users className="h-5 w-5" /> },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Development Mode Banner */}
      {BYPASS_AUTH && (
        <div className="bg-yellow-100 text-yellow-800 text-center text-sm py-1 px-4">
          Development Mode: Firebase Authentication is bypassed
        </div>
      )}

      {/* Mobile Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/feed" className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-rose-500" />
            <span className="font-bold">Rendezvous</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/create">
                <PlusCircle className="h-5 w-5" />
              </Link>
            </Button>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-4">
                    <Link href="/feed" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                      <Sparkles className="h-5 w-5 text-rose-500" />
                      <span className="font-bold">Rendezvous</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex flex-col gap-1 py-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                          pathname === item.href ? "bg-muted font-medium" : "hover:bg-muted/50"
                        }`}
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-auto py-4 border-t">
                    {user && (
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
                            <AvatarFallback>{user.displayName?.charAt(0) || "U"}</AvatarFallback>
                          </Avatar>
                          <div className="text-sm font-medium">{user.displayName}</div>
                        </div>
                      </div>
                    )}
                    <Button variant="outline" className="w-full" onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Desktop Layout */}
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col border-r h-screen sticky top-0">
          <div className="p-4">
            <Link href="/feed" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-rose-500" />
              <span className="text-xl font-bold">Rendezvous</span>
            </Link>
          </div>
          <nav className="flex flex-col gap-1 p-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                  pathname === item.href ? "bg-muted font-medium" : "hover:bg-muted/50"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="mt-auto p-4 border-t">
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
                        <AvatarFallback>{user.displayName?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div className="text-sm font-medium">{user.displayName}</div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-50">
        <div className="grid grid-cols-5 h-16">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 ${
                pathname === item.href ? "text-rose-500" : "text-muted-foreground"
              }`}
            >
              {item.icon}
              <span className="text-xs">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}
