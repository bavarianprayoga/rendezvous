"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MoreHorizontal, Plus, ThumbsUp, ThumbsDown, Users } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import MainLayout from "@/components/main-layout"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { mockHangoutPlans, getMockVenueById } from "@/lib/mock-data"
import type { HangoutPlan } from "@/lib/types"

export default function PlansPage() {
  const { userData } = useAuth()
  const [plans, setPlans] = useState<HangoutPlan[]>(mockHangoutPlans)

  useEffect(() => {
    console.log("User data:", userData)
    console.log("All mock plans:", mockHangoutPlans)

    if (userData) {
      const userPlans = mockHangoutPlans.filter((plan) => plan.invitedUserIds.includes(userData.uid))
      console.log("Filtered plans for user:", userPlans)
      setPlans(userPlans)
    } else {
      // If no user data, show all plans for development
      setPlans(mockHangoutPlans)
    }
  }, [userData])

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Hangout Plans</h1>
          <Button className="bg-rose-500 hover:bg-rose-600">
            <Plus className="h-4 w-4 mr-2" />
            Create Plan
          </Button>
        </div>

        <Tabs defaultValue="upcoming">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <div className="grid gap-6">
              {plans
                .filter((plan) => ["confirmed", "planning", "voting"].includes(plan.status))
                .map((plan) => (
                  <PlanCard key={plan.id} plan={plan} />
                ))}
              {plans.filter((plan) => ["confirmed", "planning", "voting"].includes(plan.status)).length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No upcoming plans</p>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="past">
            <div className="grid gap-6">
              {plans
                .filter((plan) => ["completed", "cancelled"].includes(plan.status))
                .map((plan) => (
                  <PlanCard key={plan.id} plan={plan} />
                ))}
              {plans.filter((plan) => ["completed", "cancelled"].includes(plan.status)).length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No past plans</p>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="drafts">
            <div className="grid gap-6">
              {plans
                .filter((plan) => plan.status === "planning" && !plan.confirmedVenueId)
                .map((plan) => (
                  <PlanCard key={plan.id} plan={plan} />
                ))}
              {plans.filter((plan) => plan.status === "planning" && !plan.confirmedVenueId).length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No draft plans</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}

function PlanCard({ plan }: { plan: HangoutPlan }) {
  const venue = plan.confirmedVenueId ? getMockVenueById(plan.confirmedVenueId) : null

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const options: Intl.DateTimeFormatOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  const formatTime = (dateString: string) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{plan.title}</CardTitle>
            <CardDescription>
              {venue ? (
                <Link href={`/venue/${venue.id}`} className="hover:underline">
                  {venue.name}
                </Link>
              ) : (
                "Venue to be decided"
              )}
              {plan.confirmedTime && ` • ${formatDate(plan.confirmedTime)}`}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Plan</DropdownMenuItem>
              <DropdownMenuItem>Invite More People</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">Cancel Plan</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center gap-4 text-sm">
            {plan.confirmedTime && (
              <>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  {formatDate(plan.confirmedTime)}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                  {formatTime(plan.confirmedTime)}
                </div>
              </>
            )}
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1 text-muted-foreground" />
              {plan.invitedUserIds.length} people
            </div>
          </div>

          {plan.participants && (
            <div>
              <div className="text-sm font-medium mb-2">Participants</div>
              <div className="flex flex-wrap gap-2">
                {plan.participants.map((participant) => (
                  <div key={participant.id} className="flex items-center gap-2 bg-muted rounded-full pl-1 pr-3 py-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                      <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{participant.name}</span>
                    <Badge
                      variant={
                        participant.status === "going"
                          ? "default"
                          : participant.status === "maybe"
                            ? "outline"
                            : participant.status === "declined"
                              ? "destructive"
                              : "secondary"
                      }
                      className="text-[10px] px-1 py-0"
                    >
                      {participant.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {plan.status === "voting" && (
            <div>
              <div className="text-sm font-medium mb-2">Voting on</div>
              <div className="grid gap-2">
                {plan.potentialVenueIds.map((venueId) => {
                  const venue = getMockVenueById(venueId)
                  return venue ? (
                    <div key={venueId} className="flex items-center justify-between bg-muted p-2 rounded-md">
                      <span className="text-sm">{venue.name}</span>
                      <Button variant="outline" size="sm">
                        Vote
                      </Button>
                    </div>
                  ) : null
                })}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {(plan.status === "confirmed" || plan.status === "planning" || plan.status === "voting") && (
          <div className="flex items-center gap-2 w-full">
            <Button variant="outline" className="flex-1">
              <ThumbsUp className="h-4 w-4 mr-2" />
              I'm Going
            </Button>
            <Button variant="outline" className="flex-1">
              <ThumbsDown className="h-4 w-4 mr-2" />
              Can't Make It
            </Button>
          </div>
        )}
        {plan.status === "completed" && (
          <Button variant="outline" className="w-full">
            View Memories
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
