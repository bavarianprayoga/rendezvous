"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, Users, Coffee, Utensils, Wine, Music } from "lucide-react"
import MainLayout from "@/components/main-layout"

type User = {
  id: string
  name: string
  username: string
  avatar: string
  bio: string
  mutualFriends: number
  interests: string[]
  status: "friend" | "pending" | "suggested" | "none"
}

export default function FriendsPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "user1",
      name: "Alex Johnson",
      username: "@alexj",
      avatar: "/placeholder.svg?height=100&width=100&text=AJ",
      bio: "Coffee enthusiast, hiking lover, always looking for new cafes",
      mutualFriends: 5,
      interests: ["cafes", "hiking", "photography"],
      status: "friend",
    },
    {
      id: "user2",
      name: "Sam Taylor",
      username: "@samtaylor",
      avatar: "/placeholder.svg?height=100&width=100&text=ST",
      bio: "Foodie and craft beer fan. Always up for trying new restaurants!",
      mutualFriends: 3,
      interests: ["restaurants", "craft beer", "music"],
      status: "friend",
    },
    {
      id: "user3",
      name: "Jamie Smith",
      username: "@jamiesmith",
      avatar: "/placeholder.svg?height=100&width=100&text=JS",
      bio: "Live music lover and cocktail connoisseur",
      mutualFriends: 2,
      interests: ["concerts", "bars", "travel"],
      status: "pending",
    },
    {
      id: "user4",
      name: "Taylor Wilson",
      username: "@twilson",
      avatar: "/placeholder.svg?height=100&width=100&text=TW",
      bio: "Exploring the city one brunch at a time",
      mutualFriends: 4,
      interests: ["brunch", "art galleries", "wine"],
      status: "pending",
    },
    {
      id: "user5",
      name: "Jordan Lee",
      username: "@jlee",
      avatar: "/placeholder.svg?height=100&width=100&text=JL",
      bio: "Coffee shop worker by day, live music fan by night",
      mutualFriends: 1,
      interests: ["cafes", "music", "nightlife"],
      status: "suggested",
    },
    {
      id: "user6",
      name: "Casey Morgan",
      username: "@cmorgan",
      avatar: "/placeholder.svg?height=100&width=100&text=CM",
      bio: "Foodie, craft beer enthusiast, and dog lover",
      mutualFriends: 2,
      interests: ["restaurants", "breweries", "parks"],
      status: "suggested",
    },
    {
      id: "user7",
      name: "Riley Parker",
      username: "@rparker",
      avatar: "/placeholder.svg?height=100&width=100&text=RP",
      bio: "Always looking for the next great rooftop bar",
      mutualFriends: 0,
      interests: ["bars", "rooftops", "cocktails"],
      status: "suggested",
    },
  ])

  const handleAddFriend = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "suggested" ? "pending" : "friend" } : user,
      ),
    )
  }

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Friends</h1>
          <Button variant="outline" size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Friends
          </Button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search friends..." className="pl-10" />
        </div>

        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all">All Friends</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="suggested">Suggested</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {users
                .filter((user) => user.status === "friend")
                .map((user) => (
                  <UserCard key={user.id} user={user} onAddFriend={handleAddFriend} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="pending">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {users
                .filter((user) => user.status === "pending")
                .map((user) => (
                  <UserCard key={user.id} user={user} onAddFriend={handleAddFriend} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="suggested">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {users
                .filter((user) => user.status === "suggested")
                .map((user) => (
                  <UserCard key={user.id} user={user} onAddFriend={handleAddFriend} />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Find Friends by Interest</h2>
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
              Group Activities
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

function UserCard({ user, onAddFriend }: { user: User; onAddFriend: (userId: string) => void }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base">{user.name}</CardTitle>
            <CardDescription>{user.username}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground mb-3">{user.bio}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {user.interests.map((interest) => (
            <Badge key={interest} variant="secondary" className="text-xs">
              {interest}
            </Badge>
          ))}
        </div>
        {user.mutualFriends > 0 && (
          <div className="flex items-center text-xs text-muted-foreground">
            <Users className="h-3 w-3 mr-1" />
            {user.mutualFriends} mutual {user.mutualFriends === 1 ? "friend" : "friends"}
          </div>
        )}
      </CardContent>
      <CardFooter>
        {user.status === "friend" && (
          <Button variant="outline" className="w-full">
            View Profile
          </Button>
        )}
        {user.status === "pending" && (
          <Button className="w-full bg-rose-500 hover:bg-rose-600" onClick={() => onAddFriend(user.id)}>
            Accept Request
          </Button>
        )}
        {user.status === "suggested" && (
          <Button className="w-full bg-rose-500 hover:bg-rose-600" onClick={() => onAddFriend(user.id)}>
            Add Friend
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
