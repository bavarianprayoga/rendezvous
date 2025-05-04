"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/components/auth-provider"
import MainLayout from "@/components/main-layout"
import { Heart, MessageCircle, Share2, MapPin, Users, Star, Calendar, ExternalLink } from "lucide-react"
import { getMockVenueById, getMockCommentsForVenue, getMockPostsForVenue } from "@/lib/mock-data"
import type { Venue, Comment, Post } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

export default function VenuePage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [venue, setVenue] = useState<Venue | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [commentText, setCommentText] = useState("")

  useEffect(() => {
    // Fetch venue data from mock data
    const venueId = Array.isArray(id) ? id[0] : id
    if (!venueId) return

    const fetchedVenue = getMockVenueById(venueId)
    const fetchedComments = getMockCommentsForVenue(venueId)
    const fetchedPosts = getMockPostsForVenue(venueId)

    if (fetchedVenue) {
      setVenue(fetchedVenue)
      setComments(fetchedComments)
      setPosts(fetchedPosts)
    }

    setLoading(false)
  }, [id])

  const handleAddComment = () => {
    if (!commentText.trim() || !user) return

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      userId: user.uid,
      userName: user.displayName || "Anonymous",
      userImage: user.photoURL || "/placeholder.svg?height=100&width=100&text=U",
      text: commentText,
      timestamp: "Just now",
      likes: 0,
    }

    setComments([newComment, ...comments])
    setCommentText("")
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!venue) {
    return <div className="flex items-center justify-center min-h-screen">Venue not found</div>
  }

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="grid gap-6">
          <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
            <Image
              src={venue.primaryImageUrl || "/placeholder.svg"}
              alt={venue.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h1 className="text-3xl font-bold mb-2">{venue.name}</h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {venue.address.split(",")[1]?.trim() || venue.address}
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  {venue.ratingAvg.toFixed(1)}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {venue.tags.groupSize[0]}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {venue.tags.type.map((tag) => (
                <span key={tag} className="bg-rose-100 text-rose-700 px-2 py-1 rounded-full text-xs">
                  {tag}
                </span>
              ))}
              {venue.tags.mood.slice(0, 2).map((mood) => (
                <span key={mood} className="bg-rose-100 text-rose-700 px-2 py-1 rounded-full text-xs">
                  {mood}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="plan">Plan Visit</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Description</h3>
                      <p className="text-muted-foreground">{venue.description}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Location</h3>
                      <p className="text-muted-foreground mb-2">{venue.address}</p>
                      <div className="relative h-[200px] rounded-md overflow-hidden bg-muted">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <MapPin className="h-8 w-8 text-muted-foreground" />
                          <span className="sr-only">Map placeholder</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(venue.tags).flatMap(([category, tags]) =>
                          tags.map((tag) => (
                            <Badge key={`${category}-${tag}`} variant="secondary">
                              {tag}
                            </Badge>
                          )),
                        )}
                      </div>
                    </div>
                    {posts.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Recent Posts</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {posts.slice(0, 3).map((post) => (
                            <div key={post.id} className="relative h-24 rounded-md overflow-hidden">
                              <Image
                                src={post.mediaUrl || "/placeholder.svg"}
                                alt={post.caption}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold">{venue.ratingAvg.toFixed(1)}</div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(venue.ratingAvg)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">({venue.postCount} reviews)</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Write a Review
                    </Button>
                  </div>

                  <div className="mb-6">
                    <Textarea
                      placeholder="Share your experience..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="mb-2"
                    />
                    <Button
                      onClick={handleAddComment}
                      disabled={!commentText.trim() || !user}
                      className="bg-rose-500 hover:bg-rose-600"
                    >
                      Post Comment
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex gap-4">
                        <Avatar>
                          <AvatarImage src={comment.userImage || "/placeholder.svg"} alt={comment.userName} />
                          <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-medium">{comment.userName}</div>
                            <div className="text-xs text-muted-foreground">{comment.timestamp}</div>
                          </div>
                          <p className="text-sm mb-2">{comment.text}</p>
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <Heart className="h-3 w-3 mr-1" />
                              <span className="text-xs">{comment.likes}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <MessageCircle className="h-3 w-3 mr-1" />
                              <span className="text-xs">Reply</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="plan" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Plan Your Visit</h3>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Date</label>
                          <Input type="date" />
                        </div>
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Time</label>
                          <Input type="time" />
                        </div>
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Group Size</label>
                          <Input type="number" min="1" placeholder="Number of people" />
                        </div>
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Notes</label>
                          <Textarea placeholder="Any special requests or notes..." />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <Button className="bg-rose-500 hover:bg-rose-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        Create Hangout Plan
                      </Button>
                      <Button variant="outline">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Website
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  )
}
