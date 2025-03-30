"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Filter,
  SlidersHorizontal,
  Clock,
  Users,
  ChevronDown,
  Plus,
  Calendar,
  DollarSign,
  ShieldCheck,
  Tag,
  MapPin,
  BookOpen,
  Briefcase,
  Scale,
  FileText,
  Gavel,
} from "lucide-react"

// Mock data for bounties
const mockBounties = [
  {
    id: "1",
    title: "Land Rights Case for Indigenous Community",
    summary:
      "Seeking legal representation for an indigenous community facing displacement due to illegal land grabbing.",
    category: "Land Rights",
    location: "Amazon Region, Brazil",
    fundingGoal: 15000,
    currentFunding: 8750,
    deadline: "2023-12-15",
    status: "active",
    createdAt: "2023-09-10",
    ngo: {
      name: "Amazon Defenders Coalition",
      logo: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    tags: ["indigenous rights", "environmental law", "human rights"],
    applicants: 3,
    urgency: "high",
  },
  {
    id: "2",
    title: "Asylum Seekers Legal Support",
    summary:
      "Legal assistance needed for a group of asylum seekers facing deportation despite credible threats in their home country.",
    category: "Immigration",
    location: "Texas, USA",
    fundingGoal: 12000,
    currentFunding: 9600,
    deadline: "2023-11-30",
    status: "active",
    createdAt: "2023-09-15",
    ngo: {
      name: "Refugee Rights Initiative",
      logo: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    tags: ["asylum", "immigration law", "human rights"],
    applicants: 5,
    urgency: "high",
  },
  {
    id: "3",
    title: "Housing Discrimination Class Action",
    summary: "Seeking representation for tenants experiencing systematic discrimination in public housing.",
    category: "Housing",
    location: "Chicago, USA",
    fundingGoal: 20000,
    currentFunding: 5000,
    deadline: "2024-01-15",
    status: "active",
    createdAt: "2023-09-20",
    ngo: {
      name: "Housing Justice Alliance",
      logo: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    tags: ["housing law", "discrimination", "class action"],
    applicants: 2,
    urgency: "medium",
  },
  {
    id: "4",
    title: "Environmental Impact Litigation",
    summary: "Legal challenge against corporation for illegal toxic waste disposal affecting local water supply.",
    category: "Environmental",
    location: "Michigan, USA",
    fundingGoal: 30000,
    currentFunding: 18000,
    deadline: "2023-12-30",
    status: "active",
    createdAt: "2023-09-05",
    ngo: {
      name: "Clean Water Action",
      logo: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    tags: ["environmental law", "public health", "corporate accountability"],
    applicants: 4,
    urgency: "high",
  },
  {
    id: "5",
    title: "Domestic Violence Survivors Legal Aid",
    summary:
      "Legal representation needed for survivors of domestic violence seeking restraining orders and custody arrangements.",
    category: "Family",
    location: "Remote/Various",
    fundingGoal: 8000,
    currentFunding: 6400,
    deadline: "2023-11-15",
    status: "active",
    createdAt: "2023-09-25",
    ngo: {
      name: "Safe Horizons Network",
      logo: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    tags: ["family law", "domestic violence", "restraining orders"],
    applicants: 7,
    urgency: "high",
  },
  {
    id: "6",
    title: "Wrongful Termination Case",
    summary: "Legal representation for workers terminated after attempting to form a union.",
    category: "Employment",
    location: "Seattle, USA",
    fundingGoal: 15000,
    currentFunding: 3000,
    deadline: "2024-02-28",
    status: "active",
    createdAt: "2023-10-01",
    ngo: {
      name: "Workers Rights Coalition",
      logo: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    tags: ["labor law", "union rights", "wrongful termination"],
    applicants: 1,
    urgency: "medium",
  },
  {
    id: "7",
    title: "Medical Debt Relief Class Action",
    summary:
      "Seeking legal representation for patients affected by predatory medical billing practices at regional hospital.",
    category: "Consumer",
    location: "Florida, USA",
    fundingGoal: 25000,
    currentFunding: 10000,
    deadline: "2024-01-20",
    status: "active",
    createdAt: "2023-09-18",
    ngo: {
      name: "Healthcare Justice Project",
      logo: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    tags: ["consumer protection", "medical debt", "class action"],
    applicants: 3,
    urgency: "medium",
  },
  {
    id: "8",
    title: "Special Education Rights Case",
    summary:
      "Legal advocacy needed for students with disabilities being denied appropriate accommodations in public schools.",
    category: "Education",
    location: "Pennsylvania, USA",
    fundingGoal: 10000,
    currentFunding: 7500,
    deadline: "2023-12-10",
    status: "active",
    createdAt: "2023-09-22",
    ngo: {
      name: "Education Access Alliance",
      logo: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    tags: ["education law", "disability rights", "civil rights"],
    applicants: 2,
    urgency: "high",
  },
]

// Mock data for user's created bounties
const mockCreatedBounties = [
  {
    id: "101",
    title: "Voter Rights Protection Initiative",
    summary:
      "Legal observers and representation needed for upcoming election to ensure voting access in underserved communities.",
    category: "Civil Rights",
    location: "Georgia, USA",
    fundingGoal: 18000,
    currentFunding: 12000,
    deadline: "2023-10-30",
    status: "active",
    createdAt: "2023-09-01",
    ngo: {
      name: "Voting Rights Project",
      logo: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    tags: ["voting rights", "civil rights", "election law"],
    applicants: 6,
    urgency: "high",
  },
  {
    id: "102",
    title: "Disability Discrimination in Workplace",
    summary: "Legal representation for employees facing systematic discrimination based on disabilities.",
    category: "Employment",
    location: "Remote/Various",
    fundingGoal: 15000,
    currentFunding: 3000,
    deadline: "2024-01-15",
    status: "active",
    createdAt: "2023-09-12",
    ngo: {
      name: "Disability Rights Advocates",
      logo: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    tags: ["disability rights", "employment law", "discrimination"],
    applicants: 2,
    urgency: "medium",
  },
]

// Mock data for user's active bounties (bounties the user is working on)
const mockActiveBounties = [
  {
    id: "201",
    title: "Refugee Family Reunification Case",
    summary: "Legal assistance needed to reunite separated refugee families through complex immigration processes.",
    category: "Immigration",
    location: "California, USA",
    fundingGoal: 10000,
    currentFunding: 8000,
    deadline: "2023-11-20",
    status: "active",
    createdAt: "2023-08-15",
    ngo: {
      name: "Family Reunification Project",
      logo: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    tags: ["immigration law", "family reunification", "refugee rights"],
    applicants: 4,
    urgency: "high",
    milestones: [
      {
        title: "Initial case assessment",
        status: "completed",
        dueDate: "2023-09-01",
      },
      {
        title: "Documentation gathering",
        status: "in-progress",
        dueDate: "2023-10-15",
      },
      {
        title: "Legal filing preparation",
        status: "pending",
        dueDate: "2023-11-01",
      },
    ],
  },
]

const categories = [
  { value: "all", label: "All Categories" },
  { value: "human-rights", label: "Human Rights" },
  { value: "land-rights", label: "Land Rights" },
  { value: "environmental", label: "Environmental Law" },
  { value: "immigration", label: "Immigration" },
  { value: "housing", label: "Housing Law" },
  { value: "family", label: "Family Law" },
  { value: "employment", label: "Employment Law" },
  { value: "criminal", label: "Criminal Defense" },
  { value: "civil-rights", label: "Civil Rights" },
  { value: "consumer", label: "Consumer Protection" },
  { value: "education", label: "Education Law" },
  { value: "healthcare", label: "Healthcare Law" },
]

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "funding", label: "Most Funded" },
  { value: "deadline", label: "Deadline (Soonest)" },
  { value: "amount", label: "Funding Goal (Lowest)" },
]

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "human rights":
    case "civil rights":
      return <Scale className="h-4 w-4" />
    case "land rights":
      return <MapPin className="h-4 w-4" />
    case "environmental":
      return <FileText className="h-4 w-4" />
    case "immigration":
      return <BookOpen className="h-4 w-4" />
    case "housing":
      return <FileText className="h-4 w-4" />
    case "family":
      return <Users className="h-4 w-4" />
    case "employment":
      return <Briefcase className="h-4 w-4" />
    case "criminal":
      return <Gavel className="h-4 w-4" />
    case "consumer":
      return <Tag className="h-4 w-4" />
    case "education":
      return <BookOpen className="h-4 w-4" />
    case "healthcare":
      return <FileText className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

export default function BountyDiscoveryPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [fundingRange, setFundingRange] = useState([0, 30000])
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)
  const [showUrgentOnly, setShowUrgentOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const [filteredBounties, setFilteredBounties] = useState(mockBounties)

  // Apply filters and sorting
  useEffect(() => {
    let bountiesToFilter = []

    // Select the right dataset based on active tab
    if (activeTab === "all") {
      bountiesToFilter = [...mockBounties]
    } else if (activeTab === "created") {
      bountiesToFilter = [...mockCreatedBounties]
    } else if (activeTab === "active") {
      bountiesToFilter = [...mockActiveBounties]
    }

    // Apply search filter
    if (searchQuery) {
      bountiesToFilter = bountiesToFilter.filter(
        (bounty) =>
          bounty.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bounty.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bounty.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      bountiesToFilter = bountiesToFilter.filter(
        (bounty) => bounty.category.toLowerCase() === selectedCategory.toLowerCase(),
      )
    }

    // Apply funding range filter
    bountiesToFilter = bountiesToFilter.filter(
      (bounty) => bounty.fundingGoal >= fundingRange[0] && bounty.fundingGoal <= fundingRange[1],
    )

    // Apply verified filter
    if (showVerifiedOnly) {
      bountiesToFilter = bountiesToFilter.filter((bounty) => bounty.ngo.verified)
    }

    // Apply urgency filter
    if (showUrgentOnly) {
      bountiesToFilter = bountiesToFilter.filter((bounty) => bounty.urgency === "high")
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        bountiesToFilter.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "funding":
        bountiesToFilter.sort((a, b) => b.currentFunding / b.fundingGoal - a.currentFunding / a.fundingGoal)
        break
      case "deadline":
        bountiesToFilter.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
        break
      case "amount":
        bountiesToFilter.sort((a, b) => a.fundingGoal - b.fundingGoal)
        break
      default:
        break
    }

    setFilteredBounties(bountiesToFilter)
  }, [activeTab, searchQuery, selectedCategory, sortBy, fundingRange, showVerifiedOnly, showUrgentOnly])

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSortBy("newest")
    setFundingRange([0, 30000])
    setShowVerifiedOnly(false)
    setShowUrgentOnly(false)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Legal Bounties</h1>
          <p className="text-muted-foreground mt-1">Discover legal cases that need your expertise and support</p>
        </div>

        {user?.role === "ngo" && (
          <Button asChild className="mt-4 md:mt-0">
            <Link to="/bounties/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Bounty
            </Link>
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Bounties</TabsTrigger>
          {user && (
            <>
              <TabsTrigger value="created">My Created Bounties</TabsTrigger>
              <TabsTrigger value="active">My Active Bounties</TabsTrigger>
            </>
          )}
        </TabsList>
      </Tabs>

      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="w-full lg:w-3/4">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort by</SelectLabel>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                <span className="hidden md:inline">Filters</span>
              </Button>
            </div>
          </div>

          {showFilters && (
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Filters</CardTitle>
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Reset
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Funding Goal Range</Label>
                    <div className="pt-4">
                      <Slider value={fundingRange} min={0} max={30000} step={1000} onValueChange={setFundingRange} />
                      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                        <span>${fundingRange[0].toLocaleString()}</span>
                        <span>${fundingRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="verified" checked={showVerifiedOnly} onCheckedChange={setShowVerifiedOnly} />
                      <Label htmlFor="verified">Verified NGOs only</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="urgent" checked={showUrgentOnly} onCheckedChange={setShowUrgentOnly} />
                      <Label htmlFor="urgent">Urgent cases only</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {filteredBounties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBounties.map((bounty) => {
                const progressPercentage = (bounty.currentFunding / bounty.fundingGoal) * 100
                const daysLeft = Math.ceil(
                  (new Date(bounty.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                )

                return (
                  <Card key={bounty.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge className="mb-2 flex items-center gap-1">
                          {getCategoryIcon(bounty.category)}
                          {bounty.category}
                        </Badge>
                        {bounty.urgency === "high" && <Badge variant="destructive">Urgent</Badge>}
                      </div>
                      <Link to={`/bounties/${bounty.id}`}>
                        <CardTitle className="text-xl hover:text-primary transition-colors">{bounty.title}</CardTitle>
                      </Link>
                      <div className="flex items-center mt-1">
                        <Avatar className="h-5 w-5 mr-2">
                          <AvatarImage src={bounty.ngo.logo} alt={bounty.ngo.name} />
                          <AvatarFallback>{bounty.ngo.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{bounty.ngo.name}</span>
                        {bounty.ngo.verified && <ShieldCheck className="h-3 w-3 ml-1 text-primary" />}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{bounty.summary}</p>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span className="font-medium">${bounty.currentFunding.toLocaleString()}</span>
                            <span className="text-muted-foreground">of ${bounty.fundingGoal.toLocaleString()}</span>
                          </div>
                          <Progress value={progressPercentage} className="h-2" />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{daysLeft} days left</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{bounty.applicants} applicants</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {bounty.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button asChild className="w-full">
                        <Link to={`/bounties/${bounty.id}`}>View Details</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-md">
              <h3 className="text-lg font-medium mb-2">No bounties found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters or search criteria</p>
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.slice(1, 7).map((category) => (
                    <Badge
                      key={category.value}
                      variant={selectedCategory === category.value ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory(category.value)}
                    >
                      {category.label}
                    </Badge>
                  ))}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Badge variant="outline" className="cursor-pointer">
                        More <ChevronDown className="h-3 w-3 ml-1" />
                      </Badge>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {categories.slice(7).map((category) => (
                        <DropdownMenuItem key={category.value} onClick={() => setSelectedCategory(category.value)}>
                          {category.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-medium">Funding Range</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={fundingRange[1] === 10000 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFundingRange([0, 10000])}
                  >
                    Under $10k
                  </Button>
                  <Button
                    variant={fundingRange[0] === 10000 && fundingRange[1] === 20000 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFundingRange([10000, 20000])}
                  >
                    $10k - $20k
                  </Button>
                  <Button
                    variant={fundingRange[0] === 20000 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFundingRange([20000, 30000])}
                  >
                    Over $20k
                  </Button>
                  <Button
                    variant={fundingRange[0] === 0 && fundingRange[1] === 30000 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFundingRange([0, 30000])}
                  >
                    Any Amount
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-medium">Deadline</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" onClick={() => setSortBy("deadline")}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Urgent First
                  </Button>
                  <Button
                    variant={showUrgentOnly ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowUrgentOnly(!showUrgentOnly)}
                  >
                    Urgent Only
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-medium">Other Filters</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="verified-quick" checked={showVerifiedOnly} onCheckedChange={setShowVerifiedOnly} />
                    <Label htmlFor="verified-quick">Verified NGOs only</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="funding-quick"
                      checked={sortBy === "funding"}
                      onCheckedChange={() => setSortBy(sortBy === "funding" ? "newest" : "funding")}
                    />
                    <Label htmlFor="funding-quick">Most funded first</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {user?.role === "lawyer" && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Expertise Match</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  We can help you find bounties that match your legal expertise and interests.
                </p>
                <Button className="w-full">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Set Expertise Preferences
                </Button>
              </CardContent>
            </Card>
          )}

          {user?.role === "donor" && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Impact Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Track the impact of your donations and see how your contributions are making a difference.
                </p>
                <Button className="w-full">
                  <DollarSign className="h-4 w-4 mr-2" />
                  View My Impact
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

