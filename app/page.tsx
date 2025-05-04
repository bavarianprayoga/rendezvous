import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, MapPin, Users, Calendar, Sparkles } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-rose-500" />
            <span className="text-xl font-bold">Rendezvous</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-sm font-medium hover:underline">
              About
            </Link>
            <Link href="/features" className="text-sm font-medium hover:underline">
              Features
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:underline">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className="py-20 md:py-32 bg-gradient-to-b from-white to-rose-50">
          <div className="container grid gap-8 md:grid-cols-2 items-center">
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Discover authentic places to <span className="text-rose-500">hangout</span> with friends
              </h1>
              <p className="text-lg text-muted-foreground">
                Rendezvous helps you find the perfect spots based on your group size, occasion, and vibe - not just
                business listings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/signup">
                  <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/feed">
                  <Button variant="outline" size="lg">
                    Explore Places
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="People enjoying a cafe"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        <section className="py-20 container">
          <h2 className="text-3xl font-bold text-center mb-12">How Rendezvous Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="h-16 w-16 rounded-full bg-rose-100 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-semibold">Discover Authentic Places</h3>
              <p className="text-muted-foreground">
                Browse our visual feed of real experiences shared by users like you, not just business listings.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="h-16 w-16 rounded-full bg-rose-100 flex items-center justify-center">
                <Users className="h-8 w-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-semibold">Plan with Friends</h3>
              <p className="text-muted-foreground">
                Use our group planning tools to coordinate, vote on venues, and schedule your perfect hangout.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="h-16 w-16 rounded-full bg-rose-100 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-semibold">Connect & Meet</h3>
              <p className="text-muted-foreground">
                Find new friends with similar interests and create memorable experiences together.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-rose-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Hangout Spots</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={`/placeholder.svg?height=400&width=600&text=Venue ${i}`}
                      alt={`Featured venue ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Cozy Spot {i}</h3>
                      <span className="text-sm bg-rose-100 text-rose-700 px-2 py-1 rounded-full">
                        {i === 1 ? "Cafe" : i === 2 ? "Bar" : "Restaurant"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Perfect for {i === 1 ? "small groups" : i === 2 ? "evening hangouts" : "celebrations"}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((j) => (
                          <div key={j} className="h-6 w-6 rounded-full bg-gray-200 border border-white" />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">+42 visited</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/feed">
                <Button variant="outline" size="lg">
                  Explore More Places
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to discover your next favorite hangout spot?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of users finding authentic places and connecting with like-minded people.
            </p>
            <Link href="/auth/signup">
              <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
                Get Started Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <footer className="border-t py-8 bg-gray-50">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-rose-500" />
              <span className="font-semibold">Rendezvous</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Rendezvous. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
                Privacy
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
