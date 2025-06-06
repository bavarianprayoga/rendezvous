'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/Auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export default function RegisterPage() {
  const [name, setName] = useState('') // This will be passed as the 'name' parameter to Appwrite's account.create()
  const [username, setUsername] = useState('') // This can be used for Appwrite's user preferences or if you distinguish it
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  const { signup, isLoading } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }

    try {
      // In your Auth.ts, signup(name, email, password, username) 
      // uses 'username' for the 4th param of account.create, which is 'name' in Appwrite docs.
      // Let's ensure clarity: we'll pass the 'name' state field to the 'name' param of signup,
      // and 'username' state field to the 'username' param of signup.
      // Your store then passes this 'username' to account.create()'s name field.
      // This implies the 'username' field on the form is effectively the Appwrite user's name.
      const result = await signup(name, email, password, username) 

      if (result.success) {
        router.push('/') // Changed from /home to /
      } else {
        setError(result.error?.message || 'Registration failed. Please try again.')
      }
    } catch (err) {
      console.error("Register page error:", err)
      setError('An unexpected error occurred during registration.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Join Rendezvous to start planning hangouts
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="name">Full Name (Optional)</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                This will be your display name
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
              <p className="text-xs text-muted-foreground">
                Minimum 8 characters
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 mt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Sign up'}
            </Button>
            
            <p className="text-sm text-muted-foreground text-center">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
} 