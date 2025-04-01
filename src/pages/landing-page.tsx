"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui"
import { ArrowRight, CheckCircle, Shield, Briefcase, BarChart, ArrowDown } from "lucide-react"
import { motion } from "framer-motion"

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("clients")
  const [scrolled, setScrolled] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (user) {
      navigate("/dashboard")
    }
  }, [user, navigate])

  // Handle scroll events for animations
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted">
        <div className="container flex flex-col items-center justify-center gap-6 py-24 text-center md:py-32">
          <motion.h1
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Legal Solutions for the Digital Age
          </motion.h1>

          <motion.p
            className="max-w-[700px] text-lg text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Connect with verified legal professionals, manage bounties, and resolve disputes efficiently on our
            blockchain-powered platform.
          </motion.p>

          <motion.div
            className="flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/auth/register?role=client">
              <Button size="lg" className="gap-2">
                Get Started as Client
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/auth/register?role=lawyer">
              <Button size="lg" variant="outline" className="gap-2">
                Join as Lawyer
                <Briefcase className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a
            href="#features"
            className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="mb-2 text-sm">Learn More</span>
            <ArrowDown className="h-5 w-5 animate-bounce" />
          </a>
        </motion.div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute -top-[10%] -right-[10%] h-[500px] w-[500px] rounded-full bg-primary/5"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute -bottom-[10%] -left-[10%] h-[600px] w-[600px] rounded-full bg-primary/5"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-16 md:py-24">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUpVariants}
          custom={0}
        >
          Platform Features
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-3">
          <motion.div
            className="flex flex-col items-center text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
            custom={1}
          >
            <div className="mb-4 rounded-full bg-primary/10 p-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Secure & Transparent</h3>
            <p className="text-muted-foreground">
              Blockchain-powered transactions ensure security and transparency for all parties.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
            custom={2}
          >
            <div className="mb-4 rounded-full bg-primary/10 p-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Verified Professionals</h3>
            <p className="text-muted-foreground">
              All lawyers on our platform undergo a thorough verification process.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
            custom={3}
          >
            <div className="mb-4 rounded-full bg-primary/10 p-4">
              <BarChart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Detailed Analytics</h3>
            <p className="text-muted-foreground">
              Track your cases, bounties, and performance with comprehensive analytics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-muted py-16 md:py-24">
        <div className="container">
          <motion.h2
            className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
            custom={0}
          >
            How It Works
          </motion.h2>

          <motion.div
            className="mb-8 flex justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
            custom={1}
          >
            <div className="inline-flex rounded-lg border bg-card p-1">
              <button
                onClick={() => setActiveTab("clients")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === "clients" ? "bg-primary text-primary-foreground" : "bg-transparent"
                }`}
              >
                For Clients
              </button>
              <button
                onClick={() => setActiveTab("lawyers")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === "lawyers" ? "bg-primary text-primary-foreground" : "bg-transparent"
                }`}
              >
                For Lawyers
              </button>
            </div>
          </motion.div>

          {activeTab === "clients" ? (
            <div className="grid gap-8 md:grid-cols-4">
              {[1, 2, 3, 4].map((step, i) => (
                <motion.div
                  key={`client-step-${step}`}
                  className="relative flex flex-col items-center text-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeInUpVariants}
                  custom={i + 2}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                    {step}
                  </div>
                  <h3 className="mb-2 text-lg font-bold">
                    {step === 1 && "Sign Up"}
                    {step === 2 && "Post a Bounty"}
                    {step === 3 && "Select a Lawyer"}
                    {step === 4 && "Get Results"}
                  </h3>
                  <p className="text-muted-foreground">
                    {step === 1 && "Create your account and complete your profile"}
                    {step === 2 && "Describe your legal needs and set a budget"}
                    {step === 3 && "Review proposals and choose the best match"}
                    {step === 4 && "Receive legal assistance and release payment when satisfied"}
                  </p>
                  {/* Connector lines */}
                  {step < 4 && (
                    <div className="absolute right-0 top-6 hidden h-0.5 w-full -translate-y-1/2 bg-border md:block md:w-1/2"></div>
                  )}
                  {step > 1 && (
                    <div className="absolute left-0 top-6 hidden h-0.5 w-1/2 -translate-y-1/2 bg-border md:block"></div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-4">
              {[1, 2, 3, 4].map((step, i) => (
                <motion.div
                  key={`lawyer-step-${step}`}
                  className="relative flex flex-col items-center text-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeInUpVariants}
                  custom={i + 2}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                    {step}
                  </div>
                  <h3 className="mb-2 text-lg font-bold">
                    {step === 1 && "Sign Up & Verify"}
                    {step === 2 && "Browse Bounties"}
                    {step === 3 && "Submit Proposals"}
                    {step === 4 && "Deliver & Earn"}
                  </h3>
                  <p className="text-muted-foreground">
                    {step === 1 && "Create your account and complete the verification process"}
                    {step === 2 && "Find legal cases that match your expertise"}
                    {step === 3 && "Send your offers to clients with your approach and pricing"}
                    {step === 4 && "Provide legal services and receive secure payment"}
                  </p>
                  {/* Connector lines */}
                  {step < 4 && (
                    <div className="absolute right-0 top-6 hidden h-0.5 w-full -translate-y-1/2 bg-border md:block md:w-1/2"></div>
                  )}
                  {step > 1 && (
                    <div className="absolute left-0 top-6 hidden h-0.5 w-1/2 -translate-y-1/2 bg-border md:block"></div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16 md:py-24">
        <motion.div
          className="rounded-lg bg-primary p-8 text-center text-primary-foreground md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight">Ready to Get Started?</h2>
          <p className="mb-8 text-lg">Join our platform today and experience the future of legal services.</p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <Link to="/auth/register">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Create an Account
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-primary-foreground/20 hover:bg-primary-foreground/10"
              >
                Log In
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

