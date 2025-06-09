'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { X, Upload, Plus } from 'lucide-react'
import { databases, storage } from '@/models/client/config'
import { db, venueCollection, mediaBucket } from '@/models/name'
import { ID } from 'appwrite'
import ImageTester from '@/components/ImageTester'

interface VenueFormData {
  name: string
  location: string
  description: string
  moodTags: string[]
  occasionTags: string[]
  typeTags: string[]
  groupSize: number
}

export default function VenueInputPage() {
  const [formData, setFormData] = useState<VenueFormData>({
    name: '',
    location: '',
    description: '',
    moodTags: [],
    occasionTags: [],
    typeTags: [],
    groupSize: 1
  })
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  
  // Tag input states
  const [moodTagInput, setMoodTagInput] = useState('')
  const [occasionTagInput, setOccasionTagInput] = useState('')
  const [typeTagInput, setTypeTagInput] = useState('')

  const handleInputChange = (field: keyof VenueFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addTag = (type: 'moodTags' | 'occasionTags' | 'typeTags', value: string) => {
    if (value.trim() && !formData[type].includes(value.trim())) {
      setFormData(prev => ({
        ...prev,
        [type]: [...prev[type], value.trim()]
      }))
    }
  }

  const removeTag = (type: 'moodTags' | 'occasionTags' | 'typeTags', index: number) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      let imageId = ''
      
      // Upload image if selected
      if (selectedFile) {
        console.log('Uploading image...')
        const imageFile = await storage.createFile(
          mediaBucket,
          ID.unique(),
          selectedFile
        )
        imageId = imageFile.$id
        console.log('Image uploaded with ID:', imageId)
        console.log('Image file object:', imageFile)
      }

      // Create venue document
      const venueData = {
        venueId: ID.unique(),
        name: formData.name,
        location: formData.location,
        description: formData.description,
        image: imageId,
        moodTags: formData.moodTags,
        occasionTags: formData.occasionTags,
        typeTags: formData.typeTags,
        groupSize: formData.groupSize
      }

      // Debug logging
      console.log('Venue data being submitted:', venueData)
      console.log('Tags:', {
        moodTags: formData.moodTags,
        occasionTags: formData.occasionTags,
        typeTags: formData.typeTags
      })

      await databases.createDocument(
        db,
        venueCollection,
        ID.unique(),
        venueData
      )

      setMessage('Venue added successfully!')
      
      // Reset form
      setFormData({
        name: '',
        location: '',
        description: '',
        moodTags: [],
        occasionTags: [],
        typeTags: [],
        groupSize: 1
      })
      setSelectedFile(null)
      setImagePreview(null)
      setMoodTagInput('')
      setOccasionTagInput('')
      setTypeTagInput('')

    } catch (error) {
      console.error('Error adding venue:', error)
      setMessage('Error adding venue. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        {/* Temporary Image Tester - Remove after testing */}
        <ImageTester />
        <div className="mb-8" />
        <Card>
          <CardHeader>
            <CardTitle>Add New Venue</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Venue Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g., Skyline Rooftop Bar"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g., Downtown, 123 Main St"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe the venue and what makes it special..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="groupSize">Max Group Size</Label>
                  <Input
                    id="groupSize"
                    type="number"
                    min="1"
                    max="99"
                    value={formData.groupSize}
                    onChange={(e) => handleInputChange('groupSize', parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <Label>Venue Image</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50">
                      {imagePreview ? (
                        <div className="space-y-2">
                          <img src={imagePreview} alt="Preview" className="max-h-32 mx-auto rounded" />
                          <p className="text-sm text-muted-foreground">Click to change image</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Click to upload venue image</p>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-4">
                {/* Mood Tags */}
                <div>
                  <Label>Mood Tags (e.g., Energetic, Cozy, Romantic)</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={moodTagInput}
                      onChange={(e) => setMoodTagInput(e.target.value)}
                      placeholder="Add mood tag..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addTag('moodTags', moodTagInput)
                          setMoodTagInput('')
                        }
                      }}
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        addTag('moodTags', moodTagInput)
                        setMoodTagInput('')
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.moodTags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => removeTag('moodTags', index)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Occasion Tags */}
                <div>
                  <Label>Occasion Tags (e.g., Date Night, Casual Meeting, Family)</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={occasionTagInput}
                      onChange={(e) => setOccasionTagInput(e.target.value)}
                      placeholder="Add occasion tag..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addTag('occasionTags', occasionTagInput)
                          setOccasionTagInput('')
                        }
                      }}
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        addTag('occasionTags', occasionTagInput)
                        setOccasionTagInput('')
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.occasionTags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => removeTag('occasionTags', index)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Type Tags */}
                <div>
                  <Label>Type Tags (e.g., Rooftop, Café, Park, Restaurant)</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={typeTagInput}
                      onChange={(e) => setTypeTagInput(e.target.value)}
                      placeholder="Add type tag..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addTag('typeTags', typeTagInput)
                          setTypeTagInput('')
                        }
                      }}
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        addTag('typeTags', typeTagInput)
                        setTypeTagInput('')
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.typeTags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => removeTag('typeTags', index)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {message && (
                <div className={`p-3 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {message}
                </div>
              )}

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Adding Venue...' : 'Add Venue'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 