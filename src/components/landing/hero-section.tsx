import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to Our Amazing Platform</h1>
        <p className="text-xl text-gray-700 mb-8">Discover the power of our innovative solutions.</p>
        <Button>Get Started</Button>
      </div>
    </section>
  )
}

