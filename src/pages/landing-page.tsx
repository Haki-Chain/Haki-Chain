import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, BarChart3, Calendar, MessageSquare, Users, Award, TrendingUp, Check } from 'lucide-react'
import TokenChart from "@/components/TokenChart"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function LandingPage() {
  const navigate = useNavigate()

  const partners = [
    { name: "LegalTech Inc.", logo: "/placeholder.svg?height=80&width=80", description: "Leading legal technology provider" },
    { name: "Blockchain Law Society", logo: "/placeholder.svg?height=80&width=80", description: "Advancing blockchain in legal practice" },
    { name: "Global Legal Forum", logo: "/placeholder.svg?height=80&width=80", description: "International legal community" },
    { name: "Tech4Justice", logo: "/placeholder.svg?height=80&width=80", description: "Technology for access to justice" },
    { name: "Legal Innovators", logo: "/placeholder.svg?height=80&width=80", description: "Pioneering legal innovation" },
  ]

  const testimonials = [
    {
      quote: "Haki Platform has revolutionized how we handle legal cases. The blockchain integration ensures transparency and security like never before.",
      author: "Sarah Johnson",
      title: "Senior Partner, Johnson & Associates",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    {
      quote: "The AI assistant has saved us countless hours of research. It's like having a legal expert available 24/7.",
      author: "Michael Chen",
      title: "Legal Director, TechLaw Solutions",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    {
      quote: "The token marketplace has opened up new revenue streams for our firm. We're now able to monetize our expertise in ways we never thought possible.",
      author: "Priya Patel",
      title: "Managing Partner, Patel Legal Group",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    {
      quote: "As a solo practitioner, Haki Platform has leveled the playing field. I now have access to tools that were previously only available to large firms.",
      author: "David Rodriguez",
      title: "Independent Legal Consultant",
      avatar: "/placeholder.svg?height=40&width=40"
    }
  ]

  const impactStories = [
    {
      title: "Increasing Access to Justice",
      description: "Helped provide legal services to 10,000+ underserved individuals through tokenized pro bono work.",
      icon: <Users className="h-6 w-6 text-primary" />
    },
    {
      title: "Reducing Case Resolution Time",
      description: "Decreased average case resolution time by 40% through AI-assisted research and blockchain verification.",
      icon: <Zap className="h-6 w-6 text-primary" />
    },
    {
      title: "Enhancing Legal Transparency",
      description: "Improved transparency in legal proceedings with immutable blockchain records, increasing client trust by 65%.",
      icon: <Shield className="h-6 w-6 text-primary" />
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <Badge className="mb-2" variant="outline">Blockchain-Powered Legal Platform</Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Revolutionizing Legal Cases with Blockchain Technology
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Haki Platform combines legal expertise with blockchain technology to create a transparent, secure, and efficient system for managing legal cases.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button onClick={() => navigate("/auth/register")} size="lg" className="bg-primary hover:bg-primary/90">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate("/features")}>
                  Learn More
                </Button>
              </div>
            </div>
            <div className="mx-auto lg:ml-auto">
              <img
                alt="Haki Platform Dashboard"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last shadow-lg"
                src="/placeholder.svg?height=550&width=800"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Token Chart Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <Badge variant="outline">HAKI Token</Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Token Performance</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Track the performance of the HAKI token and participate in our legal marketplace.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>HAKI Token Price</CardTitle>
                <CardDescription>Last 12 months performance</CardDescription>
              </CardHeader>
              <CardContent>
                <TokenChart className="h-[300px]" />
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Current Price</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">$2.34</div>
                    <Badge className="bg-green-500">+4.2%</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Market Cap</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$23.4M</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>24h Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1.2M</div>
                </CardContent>
              </Card>
              
              <Button className="w-full" onClick={() => navigate("/marketplace")}>
                Visit Marketplace
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge variant="outline">Features</Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Powerful Features for Legal Professionals</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Our platform offers a comprehensive suite of tools designed specifically for legal professionals.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
            <Card className="bg-background">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Secure Case Management</CardTitle>
                  <CardDescription>
                    Manage your legal cases with blockchain-backed security and immutability. Every document and transaction is securely recorded.
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-background">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>AI-Powered Chat</CardTitle>
                  <CardDescription>
                    Get intelligent insights and recommendations for your legal cases with our advanced AI assistant that understands legal context.
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-background">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Smart Calendar</CardTitle>
                  <CardDescription>
                    Never miss a deadline with our intelligent calendar that integrates with your cases and provides smart reminders.
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-background">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Token Marketplace</CardTitle>
                  <CardDescription>
                    Tokenize legal services and participate in the legal marketplace. Buy, sell, and trade legal services using HAKI tokens.
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-background">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Analytics Dashboard</CardTitle>
                  <CardDescription>
                    Gain insights into your practice with comprehensive analytics. Track case progress, financial performance, and more.
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-background">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Collaboration Tools</CardTitle>
                  <CardDescription>
                    Work seamlessly with your team and clients with our secure collaboration tools. Share documents, messages, and updates.
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <Badge variant="outline">Partners</Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Trusted by Industry Leaders</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                We collaborate with leading organizations in the legal and blockchain industries.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center">
            {partners.map((partner, index) => (
              <div key={index} className="flex flex-col items-center text-center space-y-2">
                <div className="bg-muted/20 rounded-full p-4 w-20 h-20 flex items-center justify-center">
                  <img src={partner.logo || "/placeholder.svg"} alt={partner.name} className="max-w-full max-h-full" />
                </div>
                <h3 className="font-medium text-sm">{partner.name}</h3>
                <p className="text-xs text-muted-foreground">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <Badge variant="outline">Testimonials</Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Users Say</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                Hear from legal professionals who have transformed their practice with Haki Platform.
              </p>
            </div>
          </div>
          
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <Card className="h-full">
                    <CardContent className="p-6 flex flex-col justify-between h-full">
                      <div>
                        <div className="mb-4 flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className="h-5 w-5 fill-primary"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                        <p className="mb-4 italic text-muted-foreground">"{testimonial.quote}"</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                          <AvatarFallback>{testimonial.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{testimonial.author}</p>
                          <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6 space-x-2">
              <CarouselPrevious className="relative" />
              <CarouselNext className="relative" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Impact Stories Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <Badge variant="outline">Impact</Badge>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Making a Difference</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                See how Haki Platform is transforming the legal industry and increasing access to justice.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {impactStories.map((story, index) => (
              <Card key={index} className="bg-background">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="rounded-full bg-primary/10 p-3">
                      {story.icon}
                    </div>
                    <CardTitle>{story.title}</CardTitle>
                    <CardDescription>
                      {story.description}
                    </CardDescription>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Transform Your Legal Practice?</h2>
              <p className="max-w-[600px] md:text-xl/relaxed">
                Join thousands of legal professionals already using Haki Platform.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button onClick={() => navigate("/auth/register")} size="lg" variant="secondary">
                Sign Up Now
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate("/auth/login")} className="bg-transparent border-white hover:bg-white hover:text-primary">
                Login
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container py-12 md:py-16 px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center space-x-2">
                <img src="/logo.svg" alt="Haki Logo" className="h-8 w-8" />
                <span className="font-bold text-xl">Haki Platform</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                Empowering legal professionals with blockchain technology to create a more transparent, efficient, and accessible legal system.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Platform</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">Features</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">Pricing</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">Marketplace</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">Case Management</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">AI Assistant</a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Resources</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">Documentation</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">API</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">Guides</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">Blog</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">Support</a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">Cookie Policy</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">GDPR</a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground">Compliance</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Haki Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

