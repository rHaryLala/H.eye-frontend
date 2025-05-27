'use client'

import * as React from 'react'
import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import AuthService from '../lib/auth-service'

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  register: (userData: any) => Promise<boolean>
  refreshToken: () => Promise<boolean>
  getAccessToken: () => string | null
  getUserInfo: () => any | null
}

interface RegisterData {
  email: string
  password: string
  firstname: string
  lastname: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    // Vérifier l'état d'authentification au chargement
    const checkAuthStatus = () => {
      const status = AuthService.isAuthenticated()
      setIsAuthenticated(status)
      setIsLoading(false)
    }

    checkAuthStatus()
    
    // Écouter les événements de stockage (pour la prise en charge de plusieurs onglets)
    const handleStorageChange = () => {
      checkAuthStatus()
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const success = await AuthService.login(username, password)
      setIsAuthenticated(success)
      return success
    } catch (error) {
      console.error('Login error in hook:', error)
      return false
    }
  }

  const logout = () => {
    AuthService.logout()
    setIsAuthenticated(false)
    router.push('/login')
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      return await AuthService.register(userData)
    } catch (error) {
      console.error('Register error in hook:', error)
      return false
    }
  }

  const refreshToken = async (): Promise<boolean> => {
    try {
      const success = await AuthService.refreshToken()
      setIsAuthenticated(success)
      return success
    } catch (error) {
      console.error('Token refresh error in hook:', error)
      setIsAuthenticated(false)
      return false
    }
  }

  const getAccessToken = (): string | null => {
    return AuthService.getAccessToken()
  }

  const getUserInfo = () => {
    console.log('useAuth - getUserInfo appelé');
    const userInfo = AuthService.getUserInfo();
    console.log('useAuth - getUserInfo résultat:', userInfo);
    return userInfo;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login,
        logout,
        register,
        refreshToken,
        getAccessToken,
        getUserInfo
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
