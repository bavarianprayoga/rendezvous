"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Sparkles } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  // Get the auth context which may include mockLogin
  const { mockLogin } = useAuth()

  // DEVELOPMENT MODE FLAG - Should match the one in auth-provider.tsx
  const BYPASS_AUTH = true

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (BYPASS_AUTH && mockLogin) {
        // Use mock signup in development mode
        mockLogin(email, name)

        toast({
          title: "Development mode signup",
          description: "Account created with mock user credentials",
        })

        router.push("/feed")
      } else {
        // Original Firebase authentication code
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        // Update profile with display name
        await updateProfile(user, {
          displayName: name,
        })

        // Create user document in Firestore
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          displayName: name,
          email: email,
          photoURL: null,
          createdAt: new Date().toISOString(),
          interests: [],
          bio: "",
        })

        toast({
          title: "Account created!",
          description: "Welcome to Rendezvous. Let's find your perfect hangout spot.",
        })

        router.push("/feed")
      }
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-rose-500" />
            <span className="text-xl font-bold">Rendezvous</span>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>Join Rendezvous to discover authentic hangout spots</CardDescription>
            {BYPASS_AUTH && (
              <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-700">
                Development mode: Authentication is bypassed. Enter name and email to continue.
              </div>
            )}
          </CardHeader>
          <form onSubmit={handleSignup}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={BYPASS_AUTH ? "Not required in development mode" : "Create a password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={!BYPASS_AUTH}
                  disabled={BYPASS_AUTH}
                  minLength={BYPASS_AUTH ? 0 : 6}
                />
                {!BYPASS_AUTH && (
                  <p className="text-xs text-muted-foreground">Password must be at least 6 characters long</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600" disabled={loading}>
                {loading ? "Creating account..." : "Create account"}
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-rose-500 hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
