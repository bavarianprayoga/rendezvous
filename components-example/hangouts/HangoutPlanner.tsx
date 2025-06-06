
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Plus, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HangoutPlanner() {
  const [date, setDate] = useState<Date>();
  const [invitees, setInvitees] = useState(['']);

  const addInviteeField = () => {
    setInvitees([...invitees, '']);
  };

  const updateInvitee = (index: number, value: string) => {
    const updatedInvitees = [...invitees];
    updatedInvitees[index] = value;
    setInvitees(updatedInvitees);
  };

  const removeInvitee = (index: number) => {
    if (invitees.length > 1) {
      const updatedInvitees = invitees.filter((_, i) => i !== index);
      setInvitees(updatedInvitees);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl venue-card-shadow">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Users size={24} className="mr-2 text-rendezvous-blue" />
        Plan Your Hangout
      </h2>
      
      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="hangout-name">Hangout Name</Label>
          <Input 
            id="hangout-name" 
            placeholder="e.g., Coffee Catchup, Movie Night"
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="hangout-description">Description</Label>
          <Textarea 
            id="hangout-description" 
            placeholder="Tell your friends what you're planning..."
            className="w-full"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="hangout-time">Time</Label>
            <Input 
              id="hangout-time" 
              type="time"
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label>Invite Friends</Label>
          {invitees.map((invitee, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input 
                value={invitee}
                onChange={(e) => updateInvitee(index, e.target.value)}
                placeholder="Friend's email or name"
                className="w-full"
              />
              {invitees.length > 1 && (
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeInvitee(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={addInviteeField}
            className="flex items-center"
          >
            <Plus size={16} className="mr-1" />
            Add another friend
          </Button>
        </div>
        
        <div className="pt-4">
          <Button 
            className="w-full bg-rendezvous-blue hover:bg-rendezvous-darkBlue"
          >
            Create Hangout
          </Button>
        </div>
      </form>
    </div>
  );
}
