'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog'
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { 
  Search, 
  Users, 
  Send, 
  CheckCircle2, 
  Clock,
  X,
  UserPlus
} from 'lucide-react'
import { getFriendsList, sendHangoutInvites, getHangoutInvites } from '@/lib/hangouts'

interface InviteModalProps {
  isOpen: boolean
  onClose: () => void
  hangoutId: string
  hangoutTitle: string
}

export default function InviteModal({ isOpen, onClose, hangoutId, hangoutTitle }: InviteModalProps) {
  const [selectedFriends, setSelectedFriends] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isInviting, setIsInviting] = useState(false)
  const [invitesSent, setInvitesSent] = useState(false)

  const friends = getFriendsList()
  const existingInvites = getHangoutInvites(hangoutId)
  const alreadyInvited = existingInvites.map(invite => invite.invitedUserId)

  const filteredFriends = friends.filter(friend => 
    !alreadyInvited.includes(friend.$id) &&
    (friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     friend.email.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleSelectFriend = (friendId: string) => {
    setSelectedFriends(prev => 
      prev.includes(friendId) 
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    )
  }

  const handleSendInvites = async () => {
    if (selectedFriends.length === 0) return

    setIsInviting(true)
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const success = sendHangoutInvites(hangoutId, selectedFriends)
      
      if (success) {
        setInvitesSent(true)
        setSelectedFriends([])
        // Close modal after a brief success message
        setTimeout(() => {
          setInvitesSent(false)
          onClose()
        }, 2000)
      }
    } catch (error) {
      console.error('Error sending invites:', error)
    } finally {
      setIsInviting(false)
    }
  }

  const handleClose = () => {
    setSelectedFriends([])
    setSearchQuery('')
    setInvitesSent(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Invite Friends
          </DialogTitle>
          <DialogDescription>
            Invite your friends to join "{hangoutTitle}"
          </DialogDescription>
        </DialogHeader>

        {invitesSent ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Invites Sent!</h3>
            <p className="text-muted-foreground">
              Your friends will receive notifications about the hangout
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Selected friends */}
            {selectedFriends.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Selected ({selectedFriends.length})</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedFriends.map(friendId => {
                    const friend = friends.find(f => f.$id === friendId)
                    if (!friend) return null
                    
                    return (
                      <Badge key={friendId} variant="secondary" className="flex items-center gap-1 px-2 py-1">
                        <Avatar className="h-4 w-4">
                          <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback className="text-xs">
                            {friend.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs">{friend.name}</span>
                        <button
                          onClick={() => handleSelectFriend(friendId)}
                          className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Friends list */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Choose Friends</h4>
              <Command className="border rounded-lg">
                <CommandInput 
                  placeholder="Search friends..." 
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                />
                <CommandList className="max-h-64">
                  <CommandEmpty>No friends found.</CommandEmpty>
                  <CommandGroup>
                    {filteredFriends.map(friend => (
                      <CommandItem
                        key={friend.$id}
                        onSelect={() => handleSelectFriend(friend.$id)}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-3 w-full">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={friend.avatar} alt={friend.name} />
                            <AvatarFallback className="text-xs">
                              {friend.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">{friend.name}</p>
                            <p className="text-xs text-muted-foreground truncate">
                              {friend.mutualFriends} mutual friends
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                            }`} />
                            {selectedFriends.includes(friend.$id) && (
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                            )}
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>

            {/* Existing invites */}
            {existingInvites.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Already Invited</h4>
                <div className="space-y-2">
                  {existingInvites.map(invite => (
                    <div key={invite.$id} className="flex items-center gap-3 p-2 bg-muted rounded-lg">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={invite.invitedUserAvatar} alt={invite.invitedUserName} />
                        <AvatarFallback className="text-xs">
                          {invite.invitedUserName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{invite.invitedUserName}</span>
                      <div className="ml-auto flex items-center gap-1">
                        {invite.status === 'pending' && (
                          <>
                            <Clock className="h-3 w-3 text-yellow-500" />
                            <span className="text-xs text-yellow-600">Pending</span>
                          </>
                        )}
                        {invite.status === 'accepted' && (
                          <>
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                            <span className="text-xs text-green-600">Accepted</span>
                          </>
                        )}
                        {invite.status === 'declined' && (
                          <>
                            <X className="h-3 w-3 text-red-500" />
                            <span className="text-xs text-red-600">Declined</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={handleSendInvites}
                disabled={selectedFriends.length === 0 || isInviting}
                className="flex-1"
              >
                {isInviting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Invites ({selectedFriends.length})
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
} 