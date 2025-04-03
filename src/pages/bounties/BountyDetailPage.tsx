"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  FileText,
  Gavel,
  MessageSquare,
  Pencil,
  Share2,
  ShieldCheck,
  Users,
} from "lucide-react"

// Mock data for bounty details
const bountyData = {
  id: "1",
  title: "Land Rights Case for Indigenous Community",
  description:
    "We are seeking legal representation for an indigenous community in the Amazon region that is facing imminent displacement due to illegal land grabbing and development activities. The community has ancestral claims to the land and has been living there for generations, but lacks formal documentation. We need legal expertise to file an emergency injunction, gather evidence of their historical occupation, and represent them in court proceedings.",
  longDescription: `The Yanomami indigenous community has lived in the northern Amazon rainforest for over 500 years. In recent months, they have faced increasing pressure from illegal miners and loggers who have begun clearing land within their ancestral territory.

Despite having rights under the country's constitution, the community lacks formal land titles. Local authorities have been slow to respond, and development activities continue to escalate, threatening both the community's way of life and the fragile ecosystem they steward.

This case will involve:
1. Filing emergency injunctions to halt ongoing development
2. Documenting the community's historical presence and land use
3. Navigating complex indigenous rights laws
4. Potentially challenging government inaction
5. Developing a long-term legal strategy for formal recognition of land rights

We are seeking experienced lawyers with background in indigenous rights, environmental law, or human rights law. The case will require field visits to remote locations and collaboration with anthropologists and other experts.`,
  fundingGoal: 15000,
  currentFunding: 8750,
  category: "Land Rights",
  deadline: "2023-12-15",
  status: "active",
  ngo: {
    name: "Amazon Defenders Coalition",
    logo: "/placeholder.svg?height=40&width=40",
    description: "NGO focused on protecting indigenous rights and the Amazon rainforest",
    verified: true,
    casesWon: 12,
    peopleHelped: 3400,
  },
  documents: [
    { name: "Initial Assessment Report", type: "pdf", size: "1.4 MB", url: "#" },
    { name: "Community Documentation Photos", type: "zip", size: "8.2 MB", url: "#" },
    { name: "Legal Framework Analysis", type: "pdf", size: "2.1 MB", url: "#" },
  ],
  updates: [
    {
      id: "1",
      date: "2023-09-28",
      title: "Legal team assembled",
      content:
        "We have assembled a team of experts in indigenous rights law who will be leading this case. Initial consultations with the community leaders have begun.",
      author: "Maria Rodriguez",
    },
    {
      id: "2",
      date: "2023-10-05",
      title: "Field visit completed",
      content:
        "Our legal team has completed the first field visit to document evidence and meet with community members. We've gathered substantial evidence of historical occupation.",
      author: "Carlos Mendoza",
    },
  ],
  milestones: [
    {
      id: "1",
      title: "Initial consultation and case assessment",
      description: "Meet with community leaders, gather evidence, and assess legal options",
      amount: 3000,
      status: "completed",
      completedDate: "2023-09-15",
    },
    {
      id: "2",
      title: "File emergency injunction",
      description: "Prepare and file emergency injunction to halt development activities",
      amount: 5000,
      status: "in-progress",
      dueDate: "2023-10-30",
    },
    {
      id: "3",
      title: "Evidence collection and documentation",
      description: "Comprehensive gathering of historical evidence and documentation of land use",
      amount: 4000,
      status: "pending",
      dueDate: "2023-11-30",
    },
    {
      id: "4",
      title: "Court representation and proceedings",
      description: "Represent the community in court proceedings and negotiations",
      amount: 7000,
      status: "pending",
      dueDate: "2024-01-30",
    },
  ],
  lawyers: [
    {
      id: "1",
      name: "Elena Vasquez",
      avatar: "/placeholder.svg?height=40&width=40",
      specialization: "Indigenous Rights",
      rating: 4.9,
      casesWon: 24,
    },
    {
      id: "2",
      name: "Marco Fuentes",
      avatar: "/placeholder.svg?height=40&width=40",
      specialization: "Environmental Law",
      rating: 4.7,
      casesWon: 18,
    },
  ],
  donors: [
    {
      id: "1",
      name: "Anonymous",
      amount: 5000,
      date: "2023-09-15",
    },
    {
      id: "2",
      name: "Green Earth Foundation",
      amount: 2500,
      date: "2023-09-20",
    },
    {
      id: "3",
      name: "J. Smith",
      amount: 1000,
      date: "2023-09-22",
    },
    {
      id: "4",
      name: "Anonymous",
      amount: 250,
      date: "2023-10-01",
    },
  ],
  discussions: [
    {
      id: "1",
      user: {
        name: "Maria Lopez",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Lawyer",
      },
      date: "2023-10-02",
      message:
        "I have experience with similar cases in the region. Would the community be open to pursuing both legal action and negotiation paths simultaneously?",
      replies: [
        {
          id: "1.1",
          user: {
            name: "Carlos Mendoza",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "NGO Representative",
          },
          date: "2023-10-03",
          message:
            "Yes, the community leaders have expressed they're open to negotiation while pursuing legal remedies. Our primary goal is to halt immediate development while longer-term solutions are worked out.",
        },
      ],
    },
    {
      id: "2",
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Environmental Expert",
      },
      date: "2023-10-04",
      message:
        "I can provide environmental impact assessments that might strengthen the case, particularly regarding the ecological importance of the area and traditional management practices.",
      replies: [],
    },
  ],
}

const BountyDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [donationAmount, setDonationAmount] = useState<string>("50")
  const [donationSuccess, setDonationSuccess] = useState<boolean>(false)
  const [applicationSubmitted, setApplicationSubmitted] = useState<boolean>(false)
  const [discussionMessage, setDiscussionMessage] = useState<string>("")

  // In a real app, fetch the bounty data based on the id
  // const bounty = useBounty(id);
  const bounty = bountyData

  if (!bounty) {
    return <div>Loading...</div>
  }

  const handleDonation = () => {
    // In a real app, process the donation
    console.log(`Processing donation of $${donationAmount}`)
    setDonationSuccess(true)
  }

  const handleApplyAsBountyHunter = () => {
    // In a real app, submit the application
    setApplicationSubmitted(true)
  }

  const handleAddDiscussion = () => {
    if (discussionMessage.trim() === "") return

    // In a real app, submit the discussion message
    console.log("Submitting discussion:", discussionMessage)
    setDiscussionMessage("")
    // Would typically add to discussions array
  }

  const progressPercentage = (bounty.currentFunding / bounty.fundingGoal) * 100

  const canApply = user?.role === "lawyer"
  const isNgo = user?.role === "ngo"

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate("/bounties")} className="mr-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Bounties
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <Badge>{bounty.category}</Badge>
                <Badge variant={bounty.status === "active" ? "default" : "outline"}>
                  {bounty.status === "active" ? "Active" : "Completed"}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold mb-2">{bounty.title}</h1>

              <div className="flex items-center mb-4">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={bounty.ngo.logo} alt={bounty.ngo.name} />
                  <AvatarFallback>{bounty.ngo.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{bounty.ngo.name}</span>
                {bounty.ngo.verified && <ShieldCheck className="h-4 w-4 ml-1 text-primary" />}
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg">{bounty.description}</p>
                  <Separator className="my-4" />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: bounty.longDescription.replace(/\n\n/g, "<p>").replace(/\n/g, "<br>"),
                    }}
                  />
                </div>

                {bounty.lawyers.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Legal Team</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {bounty.lawyers.map((lawyer) => (
                        <Card key={lawyer.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarImage src={lawyer.avatar} alt={lawyer.name} />
                                <AvatarFallback>{lawyer.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{lawyer.name}</div>
                                <div className="text-sm text-muted-foreground">{lawyer.specialization}</div>
                                <div className="flex items-center mt-1">
                                  <span className="text-sm font-medium mr-2">{lawyer.rating} ★</span>
                                  <span className="text-sm text-muted-foreground">{lawyer.casesWon} cases won</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="updates" className="space-y-4">
                {bounty.updates.map((update) => (
                  <Card key={update.id} className="mb-4">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{update.title}</CardTitle>
                        <span className="text-sm text-muted-foreground">
                          {new Date(update.date).toLocaleDateString()}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{update.content}</p>
                      <div className="mt-2 text-sm text-muted-foreground">Posted by {update.author}</div>
                    </CardContent>
                  </Card>
                ))}

                {bounty.updates.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No updates have been posted yet</p>
                  </div>
                )}

                {isNgo && (
                  <Button className="w-full mt-4">
                    <Pencil className="mr-2 h-4 w-4" />
                    Post New Update
                  </Button>
                )}
              </TabsContent>

              <TabsContent value="milestones" className="space-y-4">
                {bounty.milestones.map((milestone, index) => (
                  <Card key={milestone.id} className="mb-4">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <div className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm mr-3">
                            {index + 1}
                          </div>
                          <CardTitle className="text-lg">{milestone.title}</CardTitle>
                        </div>
                        <Badge
                          variant={
                            milestone.status === "completed"
                              ? "default"
                              : milestone.status === "in-progress"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {milestone.status === "completed"
                            ? "Completed"
                            : milestone.status === "in-progress"
                              ? "In Progress"
                              : "Pending"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-2">{milestone.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">${milestone.amount.toLocaleString()}</span>
                        {milestone.status === "completed" ? (
                          <span className="text-sm text-muted-foreground flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                            Completed on {new Date(milestone.completedDate!).toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Due by {new Date(milestone.dueDate!).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {bounty.milestones.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No milestones have been defined yet</p>
                  </div>
                )}

                {isNgo && (
                  <Button className="w-full mt-4">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Milestones
                  </Button>
                )}
              </TabsContent>

              <TabsContent value="discussion" className="space-y-4">
                <div className="space-y-4">
                  {bounty.discussions.map((discussion) => (
                    <div key={discussion.id} className="mb-6">
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarImage src={discussion.user.avatar} alt={discussion.user.name} />
                          <AvatarFallback>{discussion.user.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{discussion.user.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {discussion.user.role}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(discussion.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm mb-2">{discussion.message}</p>

                          {discussion.replies.length > 0 && (
                            <div className="ml-6 mt-3 space-y-3">
                              {discussion.replies.map((reply) => (
                                <div key={reply.id} className="flex gap-4">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={reply.user.avatar} alt={reply.user.name} />
                                    <AvatarFallback>{reply.user.name.substring(0, 2)}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-medium">{reply.user.name}</span>
                                      <Badge variant="outline" className="text-xs">
                                        {reply.user.role}
                                      </Badge>
                                      <span className="text-xs text-muted-foreground">
                                        {new Date(reply.date).toLocaleDateString()}
                                      </span>
                                    </div>
                                    <p className="text-sm">{reply.message}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          <Button variant="ghost" size="sm" className="mt-2">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {bounty.discussions.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No discussions have been started yet</p>
                    </div>
                  )}
                </div>

                {user && (
                  <div className="mt-4">
                    <Label htmlFor="discussion">Add to the discussion</Label>
                    <Textarea
                      id="discussion"
                      placeholder="Share your thoughts, questions, or expertise..."
                      value={discussionMessage}
                      onChange={(e) => setDiscussionMessage(e.target.value)}
                      className="mt-2"
                      rows={4}
                    />
                    <Button className="mt-2" disabled={!discussionMessage.trim()} onClick={handleAddDiscussion}>
                      Post Comment
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <div className="space-y-2">
                  {bounty.documents.map((document, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50"
                    >
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{document.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {document.size} • {document.type.toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" asChild>
                        <a href={document.url} download>
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </a>
                      </Button>
                    </div>
                  ))}

                  {bounty.documents.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No documents have been uploaded yet</p>
                    </div>
                  )}
                </div>

                {isNgo && (
                  <Button className="w-full mt-4">
                    <Pencil className="mr-2 h-4 w-4" />
                    Upload Documents
                  </Button>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Funding Status</CardTitle>
              <CardDescription>Campaign ends on {new Date(bounty.deadline).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="font-medium">${bounty.currentFunding.toLocaleString()}</span>
                  <span className="text-muted-foreground">of ${bounty.fundingGoal.toLocaleString()}</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{bounty.donors.length} donors</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>
                      {Math.ceil((new Date(bounty.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}{" "}
                      days left
                    </span>
                  </div>
                </div>
              </div>

              {user?.role !== "lawyer" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">Donate Now</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Donate to this Bounty</DialogTitle>
                      <DialogDescription>
                        100% of your donation will go towards funding this legal case.
                      </DialogDescription>
                    </DialogHeader>

                    {donationSuccess ? (
                      <div className="py-6">
                        <div className="flex flex-col items-center justify-center text-center">
                          <CheckCircle className="h-10 w-10 text-green-500 mb-2" />
                          <h3 className="text-lg font-medium">Thank you for your donation!</h3>
                          <p className="text-muted-foreground">
                            Your contribution will help make legal justice accessible.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-3 gap-2">
                          {["50", "100", "250", "500", "1000", "Custom"].map((amount) => (
                            <Button
                              key={amount}
                              type="button"
                              variant={amount === donationAmount ? "default" : "outline"}
                              onClick={() => setDonationAmount(amount)}
                            >
                              {amount === "Custom" ? amount : `$${amount}`}
                            </Button>
                          ))}
                        </div>

                        {donationAmount === "Custom" && (
                          <div className="mt-4">
                            <Label htmlFor="custom-amount">Enter amount</Label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                                $
                              </span>
                              <Input
                                id="custom-amount"
                                type="number"
                                className="pl-7"
                                placeholder="Enter custom amount"
                                onChange={(e) => setDonationAmount(e.target.value)}
                              />
                            </div>
                          </div>
                        )}

                        <DialogFooter className="mt-4">
                          <Button type="button" onClick={handleDonation}>
                            Complete Donation
                          </Button>
                        </DialogFooter>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              )}

              {canApply && bounty.status === "active" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="secondary">
                      Apply as Bounty Hunter
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Apply for this Bounty</DialogTitle>
                      <DialogDescription>Submit your application to work on this legal case.</DialogDescription>
                    </DialogHeader>

                    {applicationSubmitted ? (
                      <div className="py-6">
                        <div className="flex flex-col items-center justify-center text-center">
                          <CheckCircle className="h-10 w-10 text-green-500 mb-2" />
                          <h3 className="text-lg font-medium">Application Submitted!</h3>
                          <p className="text-muted-foreground">
                            The NGO will review your application and contact you shortly.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="application-cover">Cover Letter</Label>
                            <Textarea
                              id="application-cover"
                              placeholder="Explain why you're a good fit for this case..."
                              rows={5}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="application-experience">Relevant Experience</Label>
                            <Textarea
                              id="application-experience"
                              placeholder="Describe your experience with similar cases..."
                              rows={3}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="application-availability">Availability</Label>
                            <Input
                              id="application-availability"
                              placeholder="When can you start working on this case?"
                              required
                            />
                          </div>
                        </div>

                        <DialogFooter className="mt-4">
                          <Button type="button" onClick={handleApplyAsBountyHunter}>
                            Submit Application
                          </Button>
                        </DialogFooter>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>About {bounty.ngo.name}</CardTitle>
              <div className="flex items-center">
                {bounty.ngo.verified && (
                  <Badge variant="outline" className="mr-2">
                    <ShieldCheck className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{bounty.ngo.description}</p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <Gavel className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{bounty.ngo.casesWon} cases won</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{bounty.ngo.peopleHelped.toLocaleString()} people helped</span>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                View Profile
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Top Donors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {bounty.donors.slice(0, 3).map((donor, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="font-medium">{donor.name}</span>
                    <div className="text-right">
                      <span className="font-medium">${donor.amount.toLocaleString()}</span>
                      <p className="text-xs text-muted-foreground">{new Date(donor.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              {bounty.donors.length > 3 && (
                <Button variant="link" className="w-full mt-2 text-sm">
                  View all {bounty.donors.length} donors
                </Button>
              )}
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BountyDetailPage

