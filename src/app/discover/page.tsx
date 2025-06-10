'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { 
  Search, 
  MapPin, 
  Users, 
  X,
  SlidersHorizontal,
  Grid3X3,
  List,
  ArrowUpDown
} from 'lucide-react'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import VenueCard from '@/components/ui/venue-card'
import { fetchVenues, searchVenues, getFilterOptions, type Venue } from '@/lib/venues'

interface FilterState {
  searchName: string
  searchLocation: string
  groupSize: string
  occasion: string
  mood: string
  type: string
}

export default function DiscoverPage() {
  const [venues, setVenues] = useState<Venue[]>([])
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'name' | 'groupSize' | 'location'>('name')
  const [showFilters, setShowFilters] = useState(false)
  
  const [filters, setFilters] = useState<FilterState>({
    searchName: '',
    searchLocation: '',
    groupSize: '',
    occasion: '',
    mood: '',
    type: ''
  })

  // Note: filterOptions removed since we're using static filter values for now
  // Can be re-added later if dynamic options from Appwrite data are needed

  // Load venues and filter options
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const venueData = await fetchVenues()
        setVenues(venueData)
        setFilteredVenues(venueData)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  // Apply filters when they change
  useEffect(() => {
    const applyFilters = async () => {
      if (venues.length === 0) return

      try {
        const filtered = await searchVenues(
          filters.searchName || undefined,
          filters.searchLocation || undefined,
          filters.groupSize ? parseInt(filters.groupSize) : undefined,
          filters.occasion || undefined,
          filters.mood || undefined,
          filters.type || undefined
        )
        
        // Apply sorting
        const sorted = [...filtered].sort((a, b) => {
          switch (sortBy) {
            case 'name':
              return a.name.localeCompare(b.name)
            case 'groupSize':
              return b.upToNPeople - a.upToNPeople
            case 'location':
              return a.location.localeCompare(b.location)
            default:
              return 0
          }
        })
        
        setFilteredVenues(sorted)
      } catch (error) {
        console.error('Error applying filters:', error)
      }
    }

    applyFilters()
  }, [filters, venues, sortBy])

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      searchName: '',
      searchLocation: '',
      groupSize: '',
      occasion: '',
      mood: '',
      type: ''
    })
  }

  const getActiveFilterCount = () => {
    return Object.values(filters).filter(value => value.length > 0).length
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Discover Amazing Venues
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Find the perfect place for your next hangout. Filter by occasion, mood, type, and more.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              
              {/* Main Search Bar */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search venues..."
                    value={filters.searchName}
                    onChange={(e) => updateFilter('searchName', e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Location..."
                    value={filters.searchLocation}
                    onChange={(e) => updateFilter('searchLocation', e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="Group size..."
                    value={filters.groupSize}
                    onChange={(e) => updateFilter('groupSize', e.target.value)}
                    className="pl-10"
                    min="1"
                    max="50"
                  />
                </div>
              </div>

              {/* Filter Toggle and Results Info */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="gap-2"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                    {getActiveFilterCount() > 0 && (
                      <Badge variant="secondary" className="ml-1">
                        {getActiveFilterCount()}
                      </Badge>
                    )}
                  </Button>
                  
                  {getActiveFilterCount() > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="gap-2"
                    >
                      <X className="h-4 w-4" />
                      Clear filters
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-sm text-muted-foreground">
                    {isLoading ? 'Loading...' : `${filteredVenues.length} venues found`}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Select value={sortBy} onValueChange={(value: 'name' | 'groupSize' | 'location') => setSortBy(value)}>
                      <SelectTrigger className="w-40">
                        <ArrowUpDown className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Sort by Name</SelectItem>
                        <SelectItem value="groupSize">Sort by Capacity</SelectItem>
                        <SelectItem value="location">Sort by Location</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="flex gap-1">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => setViewMode('grid')}
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => setViewMode('list')}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Advanced Filters</CardTitle>
                    <CardDescription>
                      Narrow down your search with specific criteria
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Occasion</label>
                        <Select value={filters.occasion || "all"} onValueChange={(value) => updateFilter('occasion', value === "all" ? "" : value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Any occasion" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Any occasion</SelectItem>
                            <SelectItem value="Casual">Casual</SelectItem>
                            <SelectItem value="Semi-formal">Semi-formal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Mood</label>
                        <Select value={filters.mood || "all"} onValueChange={(value) => updateFilter('mood', value === "all" ? "" : value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Any mood" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Any mood</SelectItem>
                            <SelectItem value="Sports">Sports</SelectItem>
                            <SelectItem value="Cozy">Cozy</SelectItem>
                            <SelectItem value="Chill">Chill</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Type</label>
                        <Select value={filters.type || "all"} onValueChange={(value) => updateFilter('type', value === "all" ? "" : value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Any type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Any type</SelectItem>
                            <SelectItem value="Outdoor">Outdoor</SelectItem>
                            <SelectItem value="Brunch">Brunch</SelectItem>
                            <SelectItem value="Cafe">Cafe</SelectItem>
                            <SelectItem value="Golf">Golf</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Active Filters Display */}
              {getActiveFilterCount() > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {filters.searchName && (
                    <Badge variant="secondary" className="gap-2">
                      Name: {filters.searchName}
                      <button onClick={() => updateFilter('searchName', '')}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.searchLocation && (
                    <Badge variant="secondary" className="gap-2">
                      Location: {filters.searchLocation}
                      <button onClick={() => updateFilter('searchLocation', '')}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.groupSize && (
                    <Badge variant="secondary" className="gap-2">
                      Group: {filters.groupSize}+ people
                      <button onClick={() => updateFilter('groupSize', '')}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.occasion && (
                    <Badge variant="secondary" className="gap-2">
                      {filters.occasion}
                      <button onClick={() => updateFilter('occasion', '')}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.mood && (
                    <Badge variant="secondary" className="gap-2">
                      {filters.mood}
                      <button onClick={() => updateFilter('mood', '')}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.type && (
                    <Badge variant="secondary" className="gap-2">
                      {filters.type}
                      <button onClick={() => updateFilter('type', '')}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {isLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <div className="h-48 bg-muted" />
                      <CardHeader>
                        <div className="h-4 bg-muted rounded w-3/4" />
                        <div className="h-3 bg-muted rounded w-1/2" />
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="h-3 bg-muted rounded" />
                          <div className="h-3 bg-muted rounded w-2/3" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredVenues.length > 0 ? (
                <div className={
                  viewMode === 'grid' 
                    ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-6'
                }>
                  {filteredVenues.map((venue) => (
                    <VenueCard 
                      key={venue.id} 
                      venue={venue}
                      showPlanButton={true}
                    />
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <h3 className="text-lg font-semibold mb-2">No venues found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={clearFilters}
                  >
                    Clear all filters
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 