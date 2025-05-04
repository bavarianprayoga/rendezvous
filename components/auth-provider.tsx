"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth"
import { auth } from "@/lib/firebase"
import type { User } from "@/lib/types"
import { mockUsers } from "@/lib/mock-data"

type AuthContextType = {
  user: FirebaseUser | null
  userData: User | null
  loading: boolean
  // Add a login function for the mock auth
  mockLogin?: (email: string, name: string) => void
  mockLogout?: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
})

export const useAuth = () => useContext(AuthContext)

// Mock user type that mimics Firebase User properties we're using
type MockFirebaseUser = {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [userData, setUserData] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // DEVELOPMENT MODE FLAG - Set to true to bypass Firebase auth
  const BYPASS_AUTH = true

  useEffect(() => {
    if (BYPASS_AUTH) {
      // Check if we have a mock user in localStorage
      const storedUser = localStorage.getItem("mockUser")
      if (storedUser) {
        // Parse and use the stored mock user
        const parsedUser = JSON.parse(storedUser) as MockFirebaseUser
        setUser(parsedUser as unknown as FirebaseUser)

        // Find the corresponding user data from our mock data
        const userDataFound =
          mockUsers.find((u) => u.uid === parsedUser.uid) ||
          mockUsers.find((u) => u.email === parsedUser.email) ||
          mockUsers[0] // Default to first user if not found

        setUserData(userDataFound || null)
      } else {
        // Default mock user if none exists in storage
        const defaultMockUser = mockUsers[0]
        const mockFirebaseUser: MockFirebaseUser = {
          uid: defaultMockUser.uid,
          email: defaultMockUser.email,
          displayName: defaultMockUser.displayName,
          photoURL: defaultMockUser.profilePictureUrl,
        }
        setUser(mockFirebaseUser as unknown as FirebaseUser)
        setUserData(defaultMockUser)
        localStorage.setItem("mockUser", JSON.stringify(mockFirebaseUser))
      }
      setLoading(false)

      // Log development mode notice
      console.log(
        "%c⚠️ DEVELOPMENT MODE: Firebase Authentication is bypassed",
        "background: #FFF3CD; color: #856404; padding: 5px; font-weight: bold;",
      )
      return
    }

    // ORIGINAL FIREBASE AUTH CODE (commented out when BYPASS_AUTH is true)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      // In a real app, we would fetch the user data from Firestore here
      // For now, we'll just set it to null
      setUserData(null)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Mock login function for development
  const mockLogin = (email: string, name: string) => {
    if (!BYPASS_AUTH) return

    // Find a matching user in our mock data or create a new one
    const existingUser = mockUsers.find((u) => u.email === email)

    if (existingUser) {
      const mockFirebaseUser: MockFirebaseUser = {
        uid: existingUser.uid,
        email: existingUser.email,
        displayName: existingUser.displayName,
        photoURL: existingUser.profilePictureUrl,
      }
      setUser(mockFirebaseUser as unknown as FirebaseUser)
      setUserData(existingUser)
      localStorage.setItem("mockUser", JSON.stringify(mockFirebaseUser))
    } else {
      // Create a new mock user
      const newUserId = `user-${Date.now()}`
      const username = email.split("@")[0].toLowerCase()

      const newUserData: User = {
        uid: newUserId,
        username: username,
        displayName: name,
        email: email,
        profilePictureUrl: null,
        friendIds: [],
        interests: [],
        createdAt: new Date().toISOString(),
      }

      const mockFirebaseUser: MockFirebaseUser = {
        uid: newUserId,
        email: email,
        displayName: name,
        photoURL: null,
      }

      setUser(mockFirebaseUser as unknown as FirebaseUser)
      setUserData(newUserData)
      localStorage.setItem("mockUser", JSON.stringify(mockFirebaseUser))
    }
  }

  // Mock logout function for development
  const mockLogout = () => {
    if (!BYPASS_AUTH) return

    setUser(null)
    setUserData(null)
    localStorage.removeItem("mockUser")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        ...(BYPASS_AUTH ? { mockLogin, mockLogout } : {}),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
