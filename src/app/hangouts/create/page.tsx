'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { 
  MapPin, Calendar, Users, Clock, Plus, ArrowLeft, 
  X, Image as ImageIcon, AlertCircle, CheckCircle2,
  Search, Star, Upload
} from 'lucide-react'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import { fetchVenues, type Venue } from '@/lib/venues'
import { CreateHangoutData } from '@/models/hangout'
import Link from 'next/link'

interface FormData {
  title: string
  description: string
  venueId: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  maxParticipants: number
  isPrivate: boolean
  tags: string[]
  rules: string[]
  requirements: string[]
  coverImage?: string
}

interface FormErrors {
  title?: string
  description?: string
  venueId?: string
  startDate?: string
  startTime?: string
  maxParticipants?: string
  general?: string
}

const popularTags = [
  'Coffee', 'Food', 'Drinks', 'Outdoor', 'Gaming', 'Study', 
  'Networking', 'Sports', 'Art', 'Music', 'Tech', 'Social'
]

const commonRules = [
  'Be respectful to all participants',
  'No cancellations 24 hours before the event',
  'BYOB (Bring Your Own Bottle)',
  'Splitting bills equally',
  'No phones during the hangout',
  'Punctuality is appreciated'
]

const commonRequirements = [
  'Valid ID required',
  'Must be 18+ years old',
  'Casual dress code',
  'Bring your own laptop',
  'Parking fee not included',
  'Food allergies must be disclosed'
]

export default function CreateHangoutPage() {
  const router = useRouter()
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    venueId: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    maxParticipants: 4,
    isPrivate: false,
    tags: [],
    rules: [],
    requirements: [],
    coverImage: undefined
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [venues, setVenues] = useState<Venue[]>([])
  const [isLoadingVenues, setIsLoadingVenues] = useState(true)
  const [venueSearch, setVenueSearch] = useState('')
  const [showVenueSelector, setShowVenueSelector] = useState(false)
  const [currentStep, setCurrentStep] = useState(1) // 1: Basic Info, 2: Venue & Time, 3: Details
  
  // Load venues
  useEffect(() => {
    const loadVenues = async () => {
      try {
        setIsLoadingVenues(true)
        const venueData = await fetchVenues()
        setVenues(venueData)
      } catch (error) {
        console.error('Error loading venues:', error)
      } finally {
        setIsLoadingVenues(false)
      }
    }
    loadVenues()
  }, [])

  // Filter venues based on search
  const filteredVenues = venues.filter(venue =>
    venue.name.toLowerCase().includes(venueSearch.toLowerCase()) ||
    venue.location.toLowerCase().includes(venueSearch.toLowerCase()) ||
    venue.category.toLowerCase().includes(venueSearch.toLowerCase())
  )

  const selectedVenue = venues.find(v => v.id === formData.venueId)

  // Handle form field changes
  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  // Handle tag management
  const addTag = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      updateFormData('tags', [...formData.tags, tag])
    }
  }

  const removeTag = (tag: string) => {
    updateFormData('tags', formData.tags.filter(t => t !== tag))
  }

  // Handle rule/requirement management
  const addRule = (rule: string) => {
    if (!formData.rules.includes(rule)) {
      updateFormData('rules', [...formData.rules, rule])
    }
  }

  const removeRule = (rule: string) => {
    updateFormData('rules', formData.rules.filter(r => r !== rule))
  }

  const addRequirement = (requirement: string) => {
    if (!formData.requirements.includes(requirement)) {
      updateFormData('requirements', [...formData.requirements, requirement])
    }
  }

  const removeRequirement = (requirement: string) => {
    updateFormData('requirements', formData.requirements.filter(r => r !== requirement))
  }

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!formData.venueId) {
      newErrors.venueId = 'Please select a venue'
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required'
    }

    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required'
    }

    if (formData.maxParticipants < 2) {
      newErrors.maxParticipants = 'At least 2 participants required'
    }

    // Check if start date/time is in the future
    if (formData.startDate && formData.startTime) {
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`)
      if (startDateTime <= new Date()) {
        newErrors.startDate = 'Start time must be in the future'
      }
    }

    // Check if end date/time is after start date/time
    if (formData.endDate && formData.endTime && formData.startDate && formData.startTime) {
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`)
      const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`)
      if (endDateTime <= startDateTime) {
        newErrors.general = 'End time must be after start time'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Create the hangout data
      const hangoutData: CreateHangoutData = {
        title: formData.title,
        description: formData.description,
        venueId: formData.venueId,
        startDateTime: `${formData.startDate}T${formData.startTime}`,
        endDateTime: formData.endDate && formData.endTime 
          ? `${formData.endDate}T${formData.endTime}` 
          : undefined,
        maxParticipants: formData.maxParticipants,
        isPrivate: formData.isPrivate,
        tags: formData.tags,
        rules: formData.rules.length > 0 ? formData.rules : undefined,
        requirements: formData.requirements.length > 0 ? formData.requirements : undefined,
        coverImage: formData.coverImage
      }

      // Save to demo state (in real app, this would be an API call)
      const { saveCreatedHangout } = await import('@/lib/hangouts')
      const newHangout = await saveCreatedHangout(hangoutData)
      console.log('Created hangout:', newHangout)

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Redirect to the new hangout page
      router.push(`/hangouts/${newHangout.$id}?created=true`)
    } catch (error) {
      console.error('Error creating hangout:', error)
      setErrors({ general: 'Failed to create hangout. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  // Get minimum time (if date is today)
  const getMinTime = () => {
    const today = new Date()
    const selectedDate = new Date(formData.startDate)
    if (selectedDate.toDateString() === today.toDateString()) {
      const now = new Date()
      now.setMinutes(now.getMinutes() + 30) // 30 minutes from now
      return now.toTimeString().slice(0, 5)
    }
    return undefined
  }

  const nextStep = () => {
    if (currentStep === 1) {
      // Validate basic info
      const hasTitle = formData.title.trim().length > 0
      const hasDescription = formData.description.trim().length > 0
      if (hasTitle && hasDescription) {
        setCurrentStep(2)
      }
    } else if (currentStep === 2) {
      // Validate venue and time
      const hasVenue = formData.venueId.length > 0
      const hasDate = formData.startDate.length > 0
      const hasTime = formData.startTime.length > 0
      if (hasVenue && hasDate && hasTime) {
        setCurrentStep(3)
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-4xl font-bold">Create Hangout</h1>
            <p className="text-muted-foreground">Plan your next memorable gathering</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {currentStep > step ? <CheckCircle2 className="h-4 w-4" /> : step}
                </div>
                {step < 3 && (
                  <div 
                    className={`w-16 h-0.5 ${
                      currentStep > step ? 'bg-primary' : 'bg-muted'
                    }`} 
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Labels */}
        <div className="grid grid-cols-3 gap-4 mb-8 text-center text-sm">
          <div className={currentStep >= 1 ? 'text-primary font-medium' : 'text-muted-foreground'}>
            Basic Information
          </div>
          <div className={currentStep >= 2 ? 'text-primary font-medium' : 'text-muted-foreground'}>
            Venue & Schedule
          </div>
          <div className={currentStep >= 3 ? 'text-primary font-medium' : 'text-muted-foreground'}>
            Details & Settings
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Give your hangout a compelling title and description
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Hangout Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Coffee & Code Session, Weekend Brunch, Game Night..."
                    value={formData.title}
                    onChange={(e) => updateFormData('title', e.target.value)}
                    className={errors.title ? 'border-destructive' : ''}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.title}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what you'll be doing, who should join, what to expect..."
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    className={`min-h-[120px] ${errors.description ? 'border-destructive' : ''}`}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {formData.description.length}/500 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Cover Image (Optional)</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload a cover image for your hangout
                    </p>
                    <Button variant="outline" size="sm" type="button">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button 
                    type="button" 
                    onClick={nextStep}
                    disabled={!formData.title.trim() || !formData.description.trim()}
                  >
                    Continue to Venue & Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Venue & Schedule */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Venue Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Choose Venue</CardTitle>
                  <CardDescription>
                    Select where your hangout will take place
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedVenue ? (
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <img 
                          src={selectedVenue.image} 
                          alt={selectedVenue.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium">{selectedVenue.name}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {selectedVenue.location}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary">{selectedVenue.category}</Badge>
                            <span className="text-xs text-muted-foreground">
                              Up to {selectedVenue.upToNPeople} people
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowVenueSelector(true)}
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full p-6 h-auto"
                      onClick={() => setShowVenueSelector(true)}
                      type="button"
                    >
                      <div className="text-center">
                        <MapPin className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                        <p className="font-medium">Select a venue</p>
                        <p className="text-sm text-muted-foreground">Choose from available locations</p>
                      </div>
                    </Button>
                  )}
                  
                  {errors.venueId && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.venueId}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Venue Selector Modal/Overlay */}
              {showVenueSelector && (
                <Card className="border-primary">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Select Venue</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setShowVenueSelector(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search venues..."
                        value={venueSearch}
                        onChange={(e) => setVenueSearch(e.target.value)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isLoadingVenues ? (
                      <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="flex items-center gap-4 p-4 border rounded-lg animate-pulse">
                            <div className="w-16 h-16 bg-muted rounded-lg" />
                            <div className="space-y-2 flex-1">
                              <div className="h-4 bg-muted rounded w-1/3" />
                              <div className="h-3 bg-muted rounded w-1/2" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {filteredVenues.map((venue) => (
                          <div 
                            key={venue.id}
                            className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md cursor-pointer transition-shadow"
                            onClick={() => {
                              updateFormData('venueId', venue.id)
                              setShowVenueSelector(false)
                            }}
                          >
                            <img 
                              src={venue.image} 
                              alt={venue.name}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium">{venue.name}</p>
                                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {venue.location}
                                  </p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="secondary">{venue.category}</Badge>
                                    <div className="flex items-center gap-1 text-xs">
                                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                      <span>4.5</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right text-xs text-muted-foreground">
                                  <p>Up to {venue.upToNPeople} people</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Date & Time */}
              <Card>
                <CardHeader>
                  <CardTitle>Schedule</CardTitle>
                  <CardDescription>
                    When will your hangout take place?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date *</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        min={getMinDate()}
                        onChange={(e) => updateFormData('startDate', e.target.value)}
                        className={errors.startDate ? 'border-destructive' : ''}
                      />
                      {errors.startDate && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.startDate}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time *</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={formData.startTime}
                        min={getMinTime()}
                        onChange={(e) => updateFormData('startTime', e.target.value)}
                        className={errors.startTime ? 'border-destructive' : ''}
                      />
                      {errors.startTime && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.startTime}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date (Optional)</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.endDate}
                        min={formData.startDate || getMinDate()}
                        onChange={(e) => updateFormData('endDate', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time (Optional)</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => updateFormData('endTime', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxParticipants">Maximum Participants</Label>
                    <Select
                      value={formData.maxParticipants.toString()}
                      onValueChange={(value) => updateFormData('maxParticipants', parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(19)].map((_, i) => {
                          const num = i + 2
                          return (
                            <SelectItem key={num} value={num.toString()}>
                              {num} people
                            </SelectItem>
                          )
                        })}
                        <SelectItem value="21">20+ people</SelectItem>
                      </SelectContent>
                    </Select>
                    {selectedVenue && formData.maxParticipants > selectedVenue.upToNPeople && (
                      <p className="text-sm text-yellow-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        This venue typically accommodates up to {selectedVenue.upToNPeople} people
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep}>
                  Back
                </Button>
                <Button 
                  type="button" 
                  onClick={nextStep}
                  disabled={!formData.venueId || !formData.startDate || !formData.startTime}
                >
                  Continue to Details
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Details & Settings */}
          {currentStep === 3 && (
            <div className="space-y-6">
              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                  <CardDescription>
                    Help people find your hangout
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="gap-1">
                          {tag}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 w-4 h-4"
                            onClick={() => removeTag(tag)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div>
                    <Label className="text-sm text-muted-foreground">Popular tags:</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {popularTags.filter(tag => !formData.tags.includes(tag)).map((tag) => (
                        <Button
                          key={tag}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addTag(tag)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          {tag}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rules */}
              <Card>
                <CardHeader>
                  <CardTitle>Rules (Optional)</CardTitle>
                  <CardDescription>
                    Set expectations for participants
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.rules.length > 0 && (
                    <div className="space-y-2">
                      {formData.rules.map((rule, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm">{rule}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRule(rule)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div>
                    <Label className="text-sm text-muted-foreground">Common rules:</Label>
                    <div className="space-y-2 mt-2">
                      {commonRules.filter(rule => !formData.rules.includes(rule)).map((rule, index) => (
                        <Button
                          key={index}
                          type="button"
                          variant="outline"
                          size="sm"
                          className="justify-start h-auto p-2 w-full text-left"
                          onClick={() => addRule(rule)}
                        >
                          <Plus className="h-3 w-3 mr-2 flex-shrink-0" />
                          <span className="text-xs">{rule}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Requirements (Optional)</CardTitle>
                  <CardDescription>
                    What should participants bring or know?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.requirements.length > 0 && (
                    <div className="space-y-2">
                      {formData.requirements.map((requirement, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm">{requirement}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRequirement(requirement)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div>
                    <Label className="text-sm text-muted-foreground">Common requirements:</Label>
                    <div className="space-y-2 mt-2">
                      {commonRequirements.filter(req => !formData.requirements.includes(req)).map((requirement, index) => (
                        <Button
                          key={index}
                          type="button"
                          variant="outline"
                          size="sm"
                          className="justify-start h-auto p-2 w-full text-left"
                          onClick={() => addRequirement(requirement)}
                        >
                          <Plus className="h-3 w-3 mr-2 flex-shrink-0" />
                          <span className="text-xs">{requirement}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Privacy Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Control who can see and join your hangout
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="isPrivate">Private Hangout</Label>
                      <p className="text-sm text-muted-foreground">
                        Only people you invite can see and join this hangout
                      </p>
                    </div>
                    <Switch
                      id="isPrivate"
                      checked={formData.isPrivate}
                      onCheckedChange={(checked) => updateFormData('isPrivate', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Error Display */}
              {errors.general && (
                <div className="p-4 border border-destructive rounded-lg">
                  <p className="text-sm text-destructive flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    {errors.general}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep}>
                  Back
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="min-w-32"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      Creating...
                    </>
                  ) : (
                    'Create Hangout'
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>
      </main>

      <Footer />
    </div>
  )
} 