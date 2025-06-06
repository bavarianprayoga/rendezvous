'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DiscoverPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home page since it already has the discover functionality
    router.push('/')
  }, [router])

  return null
} 