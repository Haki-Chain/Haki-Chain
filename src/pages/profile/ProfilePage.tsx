"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Edit,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Upload,
  Star,
  Calendar,
  Users,
  Gavel,
  BookOpen,
  Shield,
  Building,
} from "lucide-react"

// Mock user profile data
const profileData = {
  id: "user123",
  firstName: "Elena",
  lastName: "Rodriguez",
  email: "elena.rodriguez@example.com",
  phone: "+1 (555) 123-4567",
  location: "New York, USA",
  role: "lawyer",
  avatar: "/placeholder.svg?height=128&width=128",
  bio: "Human rights attorney with 8+ years of experience in immigration and asylum cases. Passionate about providing legal representation to underserved communities.",
  specializations: ["Immigration Law", "Human Rights", "Asylum Cases"],
  barNumber: "NY123456",
  jurisdiction: "New York State Bar",
  yearsOfExperience: 8,
  languages: ["English", "Spanish", "Portuguese"],
  education: [
    {
      degree: "J.D.",
      institution: "Columbia Law School",
      year: "2015",
    },
    {
      degree: "B.A. Political Science",
      institution: "University of California, Berkeley",
      year: "2012",
    },
  ],
  certifications: [
    {
      name: "Immigration Law Specialist",
      issuer: "American Immigration Lawyers Association",
      year: "2018",
    },
    {
      name: "Human Rights Law Certificate",
      issuer: "International Bar Association",
      year: "2017",
    },
  ],
  stats: {
    casesCompleted: 42,
    bountiesWon: 15,
    totalEarned: 12500,
    clientRating: 4.8,
    reviewCount: 37,
  },
  socialLinks: {
    linkedin: "https://linkedin.com/in/elenarodriguez",
    twitter: "https://twitter.com/elenarodriguez",
    website: "https://elenarodriguez.legal",
  },
}

// Mock data for NGO profile
const ngoProfileData = {
  id: "ngo123",
  name: "Global Justice Initiative",
  email: "contact@globaljustice.org",
  phone: "+1 (555) 987-6543",
  location: "Washington D.C., USA",
  role: "ngo",
  avatar: "/placeholder.svg?height=128&width=128",
  bio: "Non-profit organization dedicated to providing legal aid to marginalized communities worldwide. We focus on human rights violations, refugee assistance, and environmental justice.",
  foundedYear: 2010,
  registrationNumber: "501(c)(3) #45-6789012",
  mission: "To ensure access to justice for all, regardless of socioeconomic status or geographic location.",
  focusAreas: ["Human Rights", "Refugee Assistance", "Environmental Justice", "Indigenous Rights"],
  stats: {
    casesCompleted: 156,
    bountiesCreated: 48,
    peopleHelped: 12500,
    lawyersEngaged: 75,
    totalFundsRaised: 1250000,
  },
  team: [
    {
      name: "Maria Johnson",
      title: "Executive Director",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "David Chen",
      title: "Legal Director",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Sarah Williams",
      title: "Development Director",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
  socialLinks: {
    website: "https://globaljustice.org",
    twitter: "https://twitter.com/globaljustice",
    linkedin: "https://linkedin.com/company/globaljustice",
    facebook: "https://facebook.com/globaljustice",
  },
}

// Mock data for donor profile
const donorProfileData = {
  id: "donor123",
  firstName: "Michael",
  lastName: "Thompson",
  email: "michael.thompson@example.com",
  role: "donor",
  avatar: "/placeholder.svg?height=128&width=128",
  bio: "Passionate about supporting access to justice initiatives. I believe everyone deserves quality legal representation regardless of their financial situation.",
  location: "Chicago, IL",
  joinedDate: "2022-06-15",
  stats: {
    bountiesFunded: 12,
    totalDonated: 5000,
    impactScore: 85,
    peopleHelped: 250,
  },
  interests: ["Human Rights", "Environmental Justice", "Immigration", "Criminal Justice Reform"],
  recentDonations: [
    {
      id: "1",
      bountyTitle: "Land Rights Case for Indigenous Community",
      ngo: "Amazon Defenders Coalition",
      amount: 500,
      date: "2023-09-15",
    },
    {
      id: "2",
      bountyTitle: "Asylum Seekers Legal Support",
      ngo: "Refugee Rights Initiative",
      amount: 250,
      date: "2023-08-22",
    },
    {
      id: "3",
      bountyTitle: "Environmental Impact Litigation",
      ngo: "Clean Water Action",
      amount: 750,
      date: "2023-07-10",
    },
  ],
}

// Mock data for active bounties
const activeBounties = [
  {
    id: "1",
    title: "Land Rights Case for Indigenous Community",
    status: "active",
    deadline: "2023-12-15",
    progress: 65,
    role: "hunter", // lawyer working on this bounty
  },
  {
    id: "2",
    title: "Asylum Seekers Legal Support",
    status: "active",
    deadline: "2023-11-30",
    progress: 80,
    role: "creator", // NGO created this bounty
  },
  {
    id: "3",
    title: "Environmental Impact Litigation",
    status: "active",
    deadline: "2023-12-30",
    progress: 45,
    role: "funder", // donor funded this bounty
  },
]

export default function ProfilePage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(
    user?.role === "ngo" ? ngoProfileData : user?.role === "donor" ? donorProfileData : profileData,
  )
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  // Determine which profile data to use based on user role
  const getProfileData = () => {
    if (!user) return profileData

    switch (user.role) {
      case "ngo":
        return ngoProfileData
      case "donor":
        return donorProfileData
      case "lawyer":
      default:
        return profileData
    }
  }

  const profile = getProfileData()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = () => {
    setIsLoading(true)
    setErrorMessage("")

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsEditing(false)
      setShowSuccess(true)
    }, 1500)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  if (!user) {
    return (
      <div className="container mx-auto py-12">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please log in to view your profile.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <a href="/login">Go to Login</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  const renderLawyerProfile = () => {
    return (
      <>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar} alt={`${profile.firstName} ${profile.lastName}`} />
                    <AvatarFallback>
                      {profile.firstName?.charAt(0)}
                      {profile.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle>
                  {profile.firstName} {profile.lastName}
                </CardTitle>
                <CardDescription className="flex items-center justify-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  <span>Attorney at Law</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{profile.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{profile.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{profile.location}</span>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-2">Specializations</h3>
                  <div className="flex flex-wrap gap-1">
                    {profile.specializations.map((spec, index) => (
                      <Badge key={index} variant="secondary">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-1">
                    {profile.languages.map((lang, index) => (
                      <Badge key={index} variant="outline">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardFooter>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Credentials</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Bar Admission</h3>
                  <p className="font-medium">{profile.jurisdiction}</p>
                  <p className="text-sm">Bar Number: {profile.barNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Experience</h3>
                  <p className="font-medium">{profile.yearsOfExperience} years</p>
                </div>
                <Separator />
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Education</h3>
                  <div className="space-y-2">
                    {profile.education.map((edu, index) => (
                      <div key={index}>
                        <p className="font-medium">{edu.degree}</p>
                        <p className="text-sm">
                          {edu.institution}, {edu.year}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Certifications</h3>
                  <div className="space-y-2">
                    {profile.certifications.map((cert, index) => (
                      <div key={index}>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-sm">
                          {cert.issuer}, {cert.year}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-2/3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="bounties">Active Bounties</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{profile.bio}</p>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{profile.stats.casesCompleted}</div>
                        <p className="text-sm text-muted-foreground">Cases Completed</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{profile.stats.bountiesWon}</div>
                        <p className="text-sm text-muted-foreground">Bounties Won</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">${profile.stats.totalEarned.toLocaleString()}</div>
                        <p className="text-sm text-muted-foreground">Total Earned</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold flex items-center justify-center">
                          {profile.stats.clientRating}
                          <Star className="h-4 w-4 ml-1 text-yellow-500 fill-yellow-500" />
                        </div>
                        <p className="text-sm text-muted-foreground">{profile.stats.reviewCount} Reviews</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="bounties" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Bounties</CardTitle>
                    <CardDescription>Legal cases you are currently working on</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {activeBounties.filter((b) => b.role === "hunter").length > 0 ? (
                      <div className="space-y-4">
                        {activeBounties
                          .filter((b) => b.role === "hunter")
                          .map((bounty) => (
                            <div
                              key={bounty.id}
                              className="flex items-center justify-between border-b pb-4 last:border-0"
                            >
                              <div>
                                <h3 className="font-medium">{bounty.title}</h3>
                                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>Deadline: {formatDate(bounty.deadline)}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge variant={bounty.status === "active" ? "default" : "outline"}>
                                  {bounty.status}
                                </Badge>
                                <div className="w-32 mt-2">
                                  <div className="text-xs text-muted-foreground mb-1 text-right">
                                    {bounty.progress}% Complete
                                  </div>
                                  <Progress value={bounty.progress} className="h-1" />
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">You are not working on any bounties yet</p>
                        <Button variant="outline" className="mt-4" asChild>
                          <a href="/bounties">Browse Bounties</a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Client Reviews</CardTitle>
                    <CardDescription>Feedback from clients and organizations you've worked with</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="mr-4">
                            <div className="text-3xl font-bold">{profile.stats.clientRating}</div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < Math.floor(profile.stats.clientRating) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
                                />
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">{profile.stats.reviewCount} reviews</div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div>
                          <div className="flex items-start">
                            <Avatar className="h-10 w-10 mr-4">
                              <AvatarFallback>AC</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-medium">Amazon Defenders Coalition</h3>
                                <Badge variant="outline" className="ml-2">
                                  NGO
                                </Badge>
                              </div>
                              <div className="flex mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${i < 5 ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
                                  />
                                ))}
                              </div>
                              <p className="mt-2 text-sm">
                                "Elena was instrumental in our land rights case. Her expertise in indigenous rights law
                                and dedication to the community made all the difference. Highly recommended!"
                              </p>
                              <div className="mt-1 text-xs text-muted-foreground">
                                October 15, 2023 • Land Rights Case for Indigenous Community
                              </div>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <div className="flex items-start">
                            <Avatar className="h-10 w-10 mr-4">
                              <AvatarFallback>RR</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-medium">Refugee Rights Initiative</h3>
                                <Badge variant="outline" className="ml-2">
                                  NGO
                                </Badge>
                              </div>
                              <div className="flex mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${i < 4 ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
                                  />
                                ))}
                              </div>
                              <p className="mt-2 text-sm">
                                "Elena provided excellent legal representation for our asylum seekers. Her knowledge of
                                immigration law and compassionate approach helped secure positive outcomes."
                              </p>
                              <div className="mt-1 text-xs text-muted-foreground">
                                September 22, 2023 • Asylum Seekers Legal Support
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>Update your profile information</DialogDescription>
            </DialogHeader>

            {errorMessage && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar} alt={`${profile.firstName} ${profile.lastName}`} />
                    <AvatarFallback>
                      {profile.firstName?.charAt(0)}
                      {profile.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button size="icon" variant="outline" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
                    <Upload className="h-4 w-4" />
                    <span className="sr-only">Upload avatar</span>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" value={formData.location} onChange={handleInputChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" name="bio" value={formData.bio} onChange={handleInputChange} rows={4} />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveProfile} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Profile Updated</DialogTitle>
              <DialogDescription>Your profile information has been successfully updated.</DialogDescription>
            </DialogHeader>
            <div className="py-6 flex flex-col items-center justify-center text-center">
              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 mb-4">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-medium">Profile Updated Successfully</h3>
            </div>
            <DialogFooter>
              <Button onClick={() => setShowSuccess(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  const renderNgoProfile = () => {
    return (
      <>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={ngoProfileData.avatar} alt={ngoProfileData.name} />
                    <AvatarFallback>{ngoProfileData.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle>{ngoProfileData.name}</CardTitle>
                <CardDescription className="flex items-center justify-center">
                  <Building className="h-4 w-4 mr-1" />
                  <span>Legal Aid Organization</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{ngoProfileData.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{ngoProfileData.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{ngoProfileData.location}</span>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-2">Focus Areas</h3>
                  <div className="flex flex-wrap gap-1">
                    {ngoProfileData.focusAreas.map((area, index) => (
                      <Badge key={index} variant="secondary">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Founded in {ngoProfileData.foundedYear}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardFooter>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {ngoProfileData.team.map((member, index) => (
                  <div key={index} className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.title}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="md:w-2/3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="bounties">Active Bounties</TabsTrigger>
                <TabsTrigger value="impact">Impact</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About Us</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>{ngoProfileData.bio}</p>
                    <div>
                      <h3 className="font-medium">Our Mission</h3>
                      <p className="text-muted-foreground">{ngoProfileData.mission}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Registration</h3>
                      <p className="text-muted-foreground">{ngoProfileData.registrationNumber}</p>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{ngoProfileData.stats.casesCompleted}</div>
                        <p className="text-sm text-muted-foreground">Cases Completed</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{ngoProfileData.stats.bountiesCreated}</div>
                        <p className="text-sm text-muted-foreground">Bounties Created</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{ngoProfileData.stats.peopleHelped.toLocaleString()}</div>
                        <p className="text-sm text-muted-foreground">People Helped</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{ngoProfileData.stats.lawyersEngaged}</div>
                        <p className="text-sm text-muted-foreground">Lawyers Engaged</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          ${(ngoProfileData.stats.totalFundsRaised / 1000).toFixed(0)}K
                        </div>
                        <p className="text-sm text-muted-foreground">Funds Raised</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="bounties" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Bounties</CardTitle>
                    <CardDescription>Legal cases your organization has created</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {activeBounties.filter((b) => b.role === "creator").length > 0 ? (
                      <div className="space-y-4">
                        {activeBounties
                          .filter((b) => b.role === "creator")
                          .map((bounty) => (
                            <div
                              key={bounty.id}
                              className="flex items-center justify-between border-b pb-4 last:border-0"
                            >
                              <div>
                                <h3 className="font-medium">{bounty.title}</h3>
                                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>Deadline: {formatDate(bounty.deadline)}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge variant={bounty.status === "active" ? "default" : "outline"}>
                                  {bounty.status}
                                </Badge>
                                <div className="w-32 mt-2">
                                  <div className="text-xs text-muted-foreground mb-1 text-right">
                                    {bounty.progress}% Funded
                                  </div>
                                  <Progress value={bounty.progress} className="h-1" />
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">You haven't created any bounties yet</p>
                        <Button variant="outline" className="mt-4" asChild>
                          <a href="/bounties/create">Create a Bounty</a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="impact" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Impact Report</CardTitle>
                    <CardDescription>The difference your organization is making</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-muted/50 p-4 rounded-md text-center">
                          <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <div className="text-2xl font-bold">{ngoProfileData.stats.peopleHelped.toLocaleString()}</div>
                          <p className="text-sm text-muted-foreground">People Directly Helped</p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-md text-center">
                          <Gavel className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <div className="text-2xl font-bold">{ngoProfileData.stats.casesCompleted}</div>
                          <p className="text-sm text-muted-foreground">Legal Cases Completed</p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-md text-center">
                          <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <div className="text-2xl font-bold">12</div>
                          <p className="text-sm text-muted-foreground">Policy Changes Influenced</p>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium mb-2">Geographic Reach</h3>
                        <div className="h-48 bg-muted/30 rounded-md flex items-center justify-center">
                          <MapPin className="h-12 w-12 text-muted-foreground/50" />
                          <span className="sr-only">Map showing geographic impact</span>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground text-center">
                          Active in 15 countries across 4 continents
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Success Stories</h3>
                        <div className="space-y-4">
                          <div className="border rounded-md p-4">
                            <h4 className="font-medium">Indigenous Land Rights Victory</h4>
                            <p className="text-sm mt-1">
                              Successfully secured land rights for the Yanomami community, protecting over 5,000
                              hectares of ancestral land from illegal development.
                            </p>
                          </div>
                          <div className="border rounded-md p-4">
                            <h4 className="font-medium">Asylum Seeker Protection</h4>
                            <p className="text-sm mt-1">
                              Provided legal representation for 120 asylum seekers, with an 85% success rate in securing
                              protected status.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </>
    )
  }

  const renderDonorProfile = () => {
    return (
      <>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={donorProfileData.avatar}
                      alt={`${donorProfileData.firstName} ${donorProfileData.lastName}`}
                    />
                    <AvatarFallback>
                      {donorProfileData.firstName?.charAt(0)}
                      {donorProfileData.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle>
                  {donorProfileData.firstName} {donorProfileData.lastName}
                </CardTitle>
                <CardDescription className="flex items-center justify-center">
                  <Shield className="h-4 w-4 mr-1" />
                  <span>Donor</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{donorProfileData.email}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{donorProfileData.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Joined {formatDate(donorProfileData.joinedDate)}</span>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-1">
                    {donorProfileData.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="md:w-2/3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="donations">My Donations</TabsTrigger>
                <TabsTrigger value="impact">My Impact</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{donorProfileData.bio}</p>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{donorProfileData.stats.bountiesFunded}</div>
                        <p className="text-sm text-muted-foreground">Bounties Funded</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          ${donorProfileData.stats.totalDonated.toLocaleString()}
                        </div>
                        <p className="text-sm text-muted-foreground">Total Donated</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{donorProfileData.stats.impactScore}</div>
                        <p className="text-sm text-muted-foreground">Impact Score</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{donorProfileData.stats.peopleHelped}</div>
                        <p className="text-sm text-muted-foreground">People Helped</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="donations" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Donations</CardTitle>
                    <CardDescription>Your contributions to legal bounties</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {donorProfileData.recentDonations.length > 0 ? (
                      <div className="space-y-4">
                        {donorProfileData.recentDonations.map((donation) => (
                          <div
                            key={donation.id}
                            className="flex items-center justify-between border-b pb-4 last:border-0"
                          >
                            <div>
                              <h3 className="font-medium">{donation.bountyTitle}</h3>
                              <div className="text-sm text-muted-foreground">{donation.ngo}</div>
                              <div className="text-xs text-muted-foreground mt-1">{formatDate(donation.date)}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">${donation.amount}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">You haven't made any donations yet</p>
                        <Button variant="outline" className="mt-4" asChild>
                          <a href="/bounties">Browse Bounties</a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="impact" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Impact</CardTitle>
                    <CardDescription>The difference your donations are making</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-muted/50 p-4 rounded-md text-center">
                          <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <div className="text-2xl font-bold">{donorProfileData.stats.peopleHelped}</div>
                          <p className="text-sm text-muted-foreground">People Directly Helped</p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-md text-center">
                          <Gavel className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <div className="text-2xl font-bold">{donorProfileData.stats.bountiesFunded}</div>
                          <p className="text-sm text-muted-foreground">Legal Cases Supported</p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-md text-center">
                          <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <div className="text-2xl font-bold">3</div>
                          <p className="text-sm text-muted-foreground">Countries Impacted</p>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium mb-2">Impact Breakdown</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span>Human Rights</span>
                              <span>45%</span>
                            </div>
                            <Progress value={45} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span>Environmental Justice</span>
                              <span>30%</span>
                            </div>
                            <Progress value={30} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span>Immigration</span>
                              <span>15%</span>
                            </div>
                            <Progress value={15} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span>Criminal Justice Reform</span>
                              <span>10%</span>
                            </div>
                            <Progress value={10} className="h-2" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Success Stories</h3>
                        <div className="space-y-4">
                          <div className="border rounded-md p-4">
                            <h4 className="font-medium">Land Rights Case</h4>
                            <p className="text-sm mt-1">
                              Your donation helped secure land rights for an indigenous community, protecting over 5,000
                              hectares of ancestral land.
                            </p>
                          </div>
                          <div className="border rounded-md p-4">
                            <h4 className="font-medium">Asylum Seeker Support</h4>
                            <p className="text-sm mt-1">
                              Your contribution provided legal representation for a family of asylum seekers who
                              successfully secured protected status.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>Update your profile information</DialogDescription>
            </DialogHeader>

            {errorMessage && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={donorProfileData.avatar}
                      alt={`${donorProfileData.firstName} ${donorProfileData.lastName}`}
                    />
                    <AvatarFallback>
                      {donorProfileData.firstName?.charAt(0)}
                      {donorProfileData.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button size="icon" variant="outline" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
                    <Upload className="h-4 w-4" />
                    <span className="sr-only">Upload avatar</span>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" value={formData.location} onChange={handleInputChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" name="bio" value={formData.bio} onChange={handleInputChange} rows={4} />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveProfile} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Profile Updated</DialogTitle>
              <DialogDescription>Your profile information has been successfully updated.</DialogDescription>
            </DialogHeader>
            <div className="py-6 flex flex-col items-center justify-center text-center">
              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 mb-4">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-medium">Profile Updated Successfully</h3>
            </div>
            <DialogFooter>
              <Button onClick={() => setShowSuccess(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <div className="container mx-auto py-8">
      {user.role === "lawyer" && renderLawyerProfile()}
      {user.role === "ngo" && renderNgoProfile()}
      {user.role === "donor" && renderDonorProfile()}
    </div>
  )
}

