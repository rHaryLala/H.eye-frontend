'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthService from '@/lib/auth-service'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Vérifier si l'utilisateur est authentifié
    const checkAuth = () => {
      if (!AuthService.isAuthenticated()) {
        // Rediriger vers la page de connexion si non authentifié
        router.push('/login')
      } else {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  // Afficher un indicateur de chargement pendant la vérification
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Rendre les enfants si l'utilisateur est authentifié
  return <>{children}</>
}
