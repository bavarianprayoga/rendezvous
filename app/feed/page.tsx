"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Search,
  Filter,
  MapPin,
  Users,
  Coffee,
  Utensils,
  Wine,
  Music,
} from "lucide-react"
import Image from "next/image"
import MainLayout from "@/components/main-layout"
import { mockVenues, mockPosts } from "@/lib/mock-data"
import Link from "next/link"

export default function FeedPage() {
  const { user, userData, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("for-you")

  // DEVELOPMENT MODE FLAG - Should match the one in auth-provider.tsx
  const BYPASS_AUTH = true

  useEffect(() => {
    if (!loading && !user && !BYPASS_AUTH) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Discover Places</h1>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search for places, vibes, or locations..." className="pl-10" />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Button variant="outline" size="sm" className="rounded-full">
              <Coffee className="h-4 w-4 mr-2" />
              Cafes
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              <Utensils className="h-4 w-4 mr-2" />
              Restaurants
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              <Wine className="h-4 w-4 mr-2" />
              Bars
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              <Music className="h-4 w-4 mr-2" />
              Live Music
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              <Users className="h-4 w-4 mr-2" />
              Group-friendly
            </Button>
          </div>

          <Tabs defaultValue="for-you" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="for-you">For You</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>
            <TabsContent value="for-you" className="mt-4">
              <div className="grid gap-6">
                {activeTab === "for-you" && mockPosts.map((post) => <PostCard key={post.id} post={post} />)}
              </div>
            </TabsContent>
            <TabsContent value="trending" className="mt-4">
              <div className="grid gap-6">
                {activeTab === "trending" &&
                  [...mockPosts]
                    .sort((a, b) => b.likesCount - a.likesCount)
                    .map((post) => <PostCard key={post.id} post={post} />)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  )
}

function PostCard({ post }: { post: any }) {
  const venue = mockVenues.find((v) => v.id === post.venueId)

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <div className="relative h-64 w-full">
            <Image src={post.mediaUrl || "/placeholder.svg"} alt={post.caption} fill className="object-cover" />
          </div>
          <div className="absolute top-4 left-4 bg-black/60 text-white px-2 py-1 rounded-full text-xs flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {venue?.name || "Unknown Venue"}
          </div>
          {venue?.tags.groupSize && (
            <div className="absolute top-4 right-4 bg-black/60 text-white px-2 py-1 rounded-full text-xs flex items-center">
              <Users className="h-3 w-3 mr-1" />
              {venue.tags.groupSize[0]}
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 rounded-full overflow-hidden relative">
              <Image
                src={post.userProfilePictureUrl || "/placeholder.svg?height=100&width=100&text=User"}
                alt={post.username}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-medium text-sm">{post.username}</div>
              <Link href={`/venue/${post.venueId}`} className="text-xs text-muted-foreground hover:underline">
                @{post.venueName}
              </Link>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{post.caption}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Heart className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">{post.likesCount}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">{post.commentCount || 0}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
