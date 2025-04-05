"use client"

import { Link } from "react-router-dom"
import {
  ArrowRight,
  Shield,
  Users,
  Scale,
  Coins,
  Bot,
  MessageSquare,
  TrendingUp,
  ChevronRight,
  ExternalLink,
  Check,
  FileText,
  Award,
  Gavel,
  Menu,
  Sun,
  Moon,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useTheme } from "@/components/theme-provider"

// Mock data for token performance
const tokenData = [
  { date: "Jan", price: 0.05, volume: 12000 },
  { date: "Feb", price: 0.07, volume: 15000 },
  { date: "Mar", price: 0.06, volume: 18000 },
  { date: "Apr", price: 0.09, volume: 22000 },
  { date: "May", price: 0.11, volume: 25000 },
  { date: "Jun", price: 0.14, volume: 30000 },
  { date: "Jul", price: 0.12, volume: 28000 },
  { date: "Aug", price: 0.15, volume: 32000 },
  { date: "Sep", price: 0.18, volume: 35000 },
  { date: "Oct", price: 0.22, volume: 40000 },
  { date: "Nov", price: 0.25, volume: 45000 },
  { date: "Dec", price: 0.3, volume: 50000 },
]

// Mock data for featured bounties
const featuredBounties = [
  {
    id: 1,
    title: "Environmental Justice Case",
    category: "Environmental",
    amount: "$5,500",
    organization: "EcoJustice Foundation",
    deadline: "14 days",
    applications: 3,
    description:
      "Seeking legal representation for a community affected by industrial pollution. Environmental law expertise required.",
  },
  {
    id: 2,
    title: "Asylum Seeker Representation",
    category: "Human Rights",
    amount: "$3,800",
    organization: "Refugee Aid Network",
    deadline: "21 days",
    applications: 5,
    description:
      "Legal assistance needed for a family seeking asylum. Immigration law expertise and court representation required.",
  },
  {
    id: 3,
    title: "Housing Discrimination Case",
    category: "Civil Rights",
    amount: "$4,200",
    organization: "Equal Housing Initiative",
    deadline: "30 days",
    applications: 2,
    description:
      "Representation needed for tenants facing discrimination. Housing law and civil rights experience required.",
  },
]

// Mock data for partners
const partners = [
  {
    name: "Global Justice Foundation",
    logo: "/placeholder.svg?height=60&width=180",
    description: "Supporting legal initiatives worldwide",
    url: "https://example.com/global-justice",
  },
  {
    name: "LegalTech Alliance",
    logo: "/placeholder.svg?height=60&width=180",
    description: "Advancing technology in legal services",
    url: "https://example.com/legaltech-alliance",
  },
  {
    name: "Blockchain Law Consortium",
    logo: "/placeholder.svg?height=60&width=180",
    description: "Promoting blockchain adoption in legal systems",
    url: "https://example.com/blockchain-law",
  },
  {
    name: "Human Rights Watch",
    logo: "/placeholder.svg?height=60&width=180",
    description: "Defending human rights globally",
    url: "https://example.com/human-rights",
  },
  {
    name: "Legal Aid Society",
    logo: "/placeholder.svg?height=60&width=180",
    description: "Providing legal assistance to underserved communities",
    url: "https://example.com/legal-aid",
  },
  {
    name: "Environmental Justice Network",
    logo: "/placeholder.svg?height=60&width=180",
    description: "Fighting for environmental rights",
    url: "https://example.com/environmental-justice",
  },
]

// Navigation sections for smooth scrolling
const navSections = [
  { id: "bounties", label: "Bounties" },
  { id: "how-it-works", label: "How It Works" },
  { id: "token", label: "Token" },
  { id: "for-users", label: "For Users" },
  { id: "ai-assistant", label: "AI Assistant" },
  { id: "partners", label: "Partners" },
]

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const sectionRefs = useRef({})
  const { theme, setTheme } = useTheme()

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      // Determine which section is currently in view
      const scrollPosition = window.scrollY + 100

      for (const section of navSections) {
        const element = document.getElementById(section.id)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="flex flex-col">
      {/* Navigation */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="bg-primary p-1.5 rounded-md">
                  <Scale className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl">HAKI Platform</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-sm font-medium hover:text-primary transition-colors ${
                    activeSection === section.id ? "text-primary" : ""
                  }`}
                >
                  {section.label}
                </button>
              ))}
              <Link to="/contact" className="text-sm font-medium hover:text-primary">
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle Button */}
              <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <Link to="/login" className="hidden md:block">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/register" className="hidden md:block">
                <Button size="sm">Register</Button>
              </Link>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <nav className="flex flex-col space-y-4 mt-8">
                    {navSections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => {
                          scrollToSection(section.id)
                          document
                            .querySelector('[data-state="open"]')
                            ?.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
                        }}
                        className="text-sm font-medium hover:text-primary text-left"
                      >
                        {section.label}
                      </button>
                    ))}
                    <Link to="/contact" className="text-sm font-medium hover:text-primary">
                      Contact
                    </Link>
                    <div className="pt-4 space-y-2">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm">Theme:</span>
                        <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
                          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </Button>
                      </div>
                      <Link to="/login" className="w-full">
                        <Button variant="outline" className="w-full">
                          Sign In
                        </Button>
                      </Link>
                      <Link to="/register" className="w-full">
                        <Button className="w-full">Register</Button>
                      </Link>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Connecting Legal Needs with Legal Expertise</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            HAKI Platform bridges the gap between NGOs, donors, and legal professionals to fund and execute legal
            bounties for those who need it most.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => scrollToSection("bounties")}>
              <Button size="lg" className="w-full sm:w-auto">
                Explore Bounties
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </button>
            <Link to="/register">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Create Account
                <Users className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Bounties Section */}
      <section id="bounties" className="py-16 bg-secondary/50 scroll-mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Legal Bounties</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse some of our current legal cases seeking professional assistance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {featuredBounties.map((bounty) => (
              <Card key={bounty.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge className="mb-2">{bounty.category}</Badge>
                    <span className="font-bold text-primary">{bounty.amount}</span>
                  </div>
                  <CardTitle>{bounty.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{bounty.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarFallback>{bounty.organization.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{bounty.organization}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Deadline: {bounty.deadline}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{bounty.applications} applications</span>
                    <Button size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/browse-bounties">
              <Button size="lg">
                View All Bounties
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 scroll-mt-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How HAKI Platform Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Create Bounties</CardTitle>
                <CardDescription>
                  NGOs create legal bounties with details about the case, funding goal, and requirements.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Coins className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Fund Cases</CardTitle>
                <CardDescription>
                  Donors browse and contribute to causes they care about with transparent tracking.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Scale className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Claim Bounties</CardTitle>
                <CardDescription>
                  Legal professionals apply for cases matching their expertise and work through milestones.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Award className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Deliver Justice</CardTitle>
                <CardDescription>
                  Successful case completion benefits communities and builds professional reputation.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Token Performance Section */}
      <section id="token" className="py-16 bg-secondary/50 scroll-mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">HAKI Token Performance</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our utility token powers the HAKI Platform ecosystem, providing incentives and governance for all
              participants.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>HAKI Token Price</CardTitle>
                  <CardDescription>Current price: $0.30 USD</CardDescription>
                </div>
                <Link to="/token-marketplace">
                  <Button>
                    Buy & Sell Tokens
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="price">
                <TabsList className="mb-4">
                  <TabsTrigger value="price">Price History</TabsTrigger>
                  <TabsTrigger value="volume">Trading Volume</TabsTrigger>
                </TabsList>
                <TabsContent value="price" className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={tokenData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, "dataMax + 0.05"]} />
                      <Tooltip
                        formatter={(value) => [`$${value}`, "Price"]}
                        labelFormatter={(label) => `${label} 2023`}
                      />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="volume" className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={tokenData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, "dataMax + 5000"]} />
                      <Tooltip
                        formatter={(value) => [`${value.toLocaleString()} HAKI`, "Volume"]}
                        labelFormatter={(label) => `${label} 2023`}
                      />
                      <Line
                        type="monotone"
                        dataKey="volume"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Market Cap</p>
                    <p className="text-2xl font-bold">$15M</p>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Coins className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Circulating Supply</p>
                    <p className="text-2xl font-bold">50M HAKI</p>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">24h Volume</p>
                    <p className="text-2xl font-bold">$1.2M</p>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <ArrowRight className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* For NGOs and Lawyers Section */}
      <section id="for-users" className="py-16 scroll-mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* For NGOs */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary text-primary-foreground">
                <CardTitle className="flex items-center">
                  <FileText className="h-6 w-6 mr-2" />
                  For NGOs & Donors
                </CardTitle>
                <CardDescription className="text-primary-foreground/90">
                  Create and fund legal bounties for important causes
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Create Detailed Bounties</h4>
                      <p className="text-sm text-muted-foreground">
                        Specify case details, requirements, and milestones
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Secure Escrow System</h4>
                      <p className="text-sm text-muted-foreground">
                        Funds are held securely until milestones are completed
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Transparent Tracking</h4>
                      <p className="text-sm text-muted-foreground">
                        Monitor case progress and fund allocation in real-time
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Verified Legal Professionals</h4>
                      <p className="text-sm text-muted-foreground">Connect with qualified and vetted legal experts</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link to="/register">
                    <Button className="w-full">
                      Register as an NGO
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* For Lawyers */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary text-primary-foreground">
                <CardTitle className="flex items-center">
                  <Gavel className="h-6 w-6 mr-2" />
                  For Legal Professionals
                </CardTitle>
                <CardDescription className="text-primary-foreground/90">
                  Find and claim bounties that match your expertise
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Discover Relevant Cases</h4>
                      <p className="text-sm text-muted-foreground">
                        Browse bounties filtered by expertise and location
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Milestone-Based Payments</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive compensation as you complete case milestones
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Build Your Reputation</h4>
                      <p className="text-sm text-muted-foreground">Gain recognition and reviews for successful cases</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-3 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Expand Your Practice</h4>
                      <p className="text-sm text-muted-foreground">
                        Access new clients and cases beyond your local network
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link to="/lawyer-registration">
                    <Button className="w-full">
                      Register as a Legal Professional
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section id="ai-assistant" className="py-16 bg-secondary/50 scroll-mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">AI-Powered Legal Assistance</h2>
              <p className="text-lg mb-6">
                Our AI assistant helps you navigate the platform, understand legal concepts, and get answers to your
                questions instantly.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <MessageSquare className="h-5 w-5 mr-2 text-primary mt-0.5" />
                  <span>Get guidance on creating effective legal bounties</span>
                </li>
                <li className="flex items-start">
                  <MessageSquare className="h-5 w-5 mr-2 text-primary mt-0.5" />
                  <span>Understand complex legal terminology and processes</span>
                </li>
                <li className="flex items-start">
                  <MessageSquare className="h-5 w-5 mr-2 text-primary mt-0.5" />
                  <span>Learn about blockchain integration and smart contracts</span>
                </li>
                <li className="flex items-start">
                  <MessageSquare className="h-5 w-5 mr-2 text-primary mt-0.5" />
                  <span>Receive personalized recommendations for bounties</span>
                </li>
              </ul>
              <Link to="/ai-assistant">
                <Button size="lg">
                  <Bot className="mr-2 h-5 w-5" />
                  Chat with AI Assistant
                </Button>
              </Link>
            </div>
            <div className="bg-muted rounded-lg p-6 border">
              <div className="space-y-4">
                <div className="flex">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>
                      <Bot size={20} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-background rounded-lg p-3 max-w-[80%]">
                    <p>Hello! I'm HAKI's AI assistant. How can I help you today?</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%] mr-3">
                    <p>How do I apply for a legal bounty?</p>
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>
                      <Bot size={20} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-background rounded-lg p-3 max-w-[80%]">
                    <p>
                      To apply for a legal bounty, first register as a legal professional and complete your profile with
                      your credentials and expertise. Then browse available bounties in the marketplace and click
                      "Apply" on cases that match your skills. You'll need to submit a proposal outlining your approach,
                      timeline, and why you're qualified. The NGO or donor will review applications and select the best
                      fit for their case. Once selected, you can begin working on the case milestones.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card>
              <CardContent className="pt-6">
                <p className="text-4xl font-bold">250+</p>
                <p className="text-muted-foreground">Legal Bounties Created</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-4xl font-bold">$1.2M</p>
                <p className="text-muted-foreground">Funds Raised</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-4xl font-bold">500+</p>
                <p className="text-muted-foreground">Legal Professionals</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-4xl font-bold">85%</p>
                <p className="text-muted-foreground">Success Rate</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-16 bg-secondary/50 scroll-mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Partners</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We collaborate with leading organizations to expand access to justice globally
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={partner.logo || "/placeholder.svg"}
                      alt={`${partner.name} logo`}
                      className="h-16 mb-4 object-contain"
                    />
                    <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
                    <p className="text-muted-foreground mb-4">{partner.description}</p>
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary flex items-center hover:underline"
                    >
                      Visit Website <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real impact from our platform's legal bounties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Environmental Victory</CardTitle>
                <CardDescription>Clean Water Initiative</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  A community affected by industrial water contamination secured a $1.2M settlement with the help of an
                  environmental lawyer who claimed their bounty.
                </p>
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback>CW</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Sarah Johnson</p>
                    <p className="text-xs text-muted-foreground">Environmental Attorney</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Asylum Granted</CardTitle>
                <CardDescription>Refugee Aid Network</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  A family of four was granted asylum after their case was funded through our platform and claimed by an
                  immigration attorney with specialized expertise.
                </p>
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback>RA</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Michael Chen</p>
                    <p className="text-xs text-muted-foreground">Immigration Lawyer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Housing Justice</CardTitle>
                <CardDescription>Equal Housing Initiative</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  A group of tenants facing illegal eviction won their case through a housing rights attorney who
                  claimed their bounty and secured their right to remain in their homes.
                </p>
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback>EH</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">David Rodriguez</p>
                    <p className="text-xs text-muted-foreground">Housing Rights Attorney</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join HAKI Platform today and be part of a movement that's transforming access to justice through blockchain
            technology.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Create an Account
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Browse Bounties
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}