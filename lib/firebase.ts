import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// DEVELOPMENT MODE FLAG - Should match the one in auth-provider.tsx
const BYPASS_AUTH = true

// Mock Firebase configuration for development mode
const mockFirebaseConfig = {
  apiKey: "mock-api-key",
  authDomain: "mock-auth-domain",
  projectId: "mock-project-id",
  storageBucket: "mock-storage-bucket",
  messagingSenderId: "mock-messaging-sender-id",
  appId: "mock-app-id",
}

// Use real Firebase config if available, otherwise use mock config
const firebaseConfig = BYPASS_AUTH
  ? mockFirebaseConfig
  : {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    }

// Initialize Firebase
let app
let auth
let db
let storage

try {
  // Initialize Firebase
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
  auth = getAuth(app)
  db = getFirestore(app)
  storage = getStorage(app)

  if (BYPASS_AUTH) {
    console.log(
      "%c⚠️ DEVELOPMENT MODE: Using mock Firebase configuration",
      "background: #FFF3CD; color: #856404; padding: 5px; font-weight: bold;",
    )
  }
} catch (error) {
  console.error("Firebase initialization error:", error)

  if (BYPASS_AUTH) {
    console.log(
      "%c⚠️ DEVELOPMENT MODE: Firebase initialization failed, but auth bypass is enabled",
      "background: #FFF3CD; color: #856404; padding: 5px; font-weight: bold;",
    )
  } else {
    console.error(
      "Firebase initialization failed and auth bypass is disabled. Please check your environment variables.",
    )
  }

  // Create dummy objects if initialization fails
  app = {} as any
  auth = {} as any
  db = {} as any
  storage = {} as any
}

export { app, auth, db, storage }

/**
 * DEVELOPMENT MODE DOCUMENTATION
 *
 * This file has been modified to support development without Firebase credentials.
 *
 * To restore the original Firebase authentication:
 * 1. Set BYPASS_AUTH to false in this file and all other files where it appears
 * 2. Ensure all Firebase environment variables are properly set
 *
 * Files modified for auth bypass:
 * - lib/firebase.ts
 * - components/auth-provider.tsx
 * - app/auth/login/page.tsx
 * - app/auth/signup/page.tsx
 * - components/main-layout.tsx
 */
