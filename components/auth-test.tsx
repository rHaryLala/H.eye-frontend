'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AuthTest() {
  const { isAuthenticated, isLoading, login, logout, register } = useAuth()
  const [authStatus, setAuthStatus] = useState<string>('')
  const [testEmail, setTestEmail] = useState<string>('test@example.com')
  const [testPassword, setTestPassword] = useState<string>('password123')
  const [testFirstname, setTestFirstname] = useState<string>('Test')
  const [testLastname, setTestLastname] = useState<string>('User')
  const [result, setResult] = useState<string>('')
  const [tokenInfo, setTokenInfo] = useState<string>('')

  useEffect(() => {
    setAuthStatus(isAuthenticated ? 'Authentifié' : 'Non authentifié')
    
    // Afficher les informations du token si l'utilisateur est authentifié
    if (isAuthenticated) {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      setTokenInfo(`
        Access Token: ${accessToken ? accessToken.substring(0, 20) + '...' : 'Non disponible'}
        Refresh Token: ${refreshToken ? refreshToken.substring(0, 20) + '...' : 'Non disponible'}
      `)
    } else {
      setTokenInfo('')
    }
  }, [isAuthenticated])

  const handleLogin = async () => {
    setResult('Tentative de connexion...')
    try {
      const success = await login(testEmail, testPassword)
      setResult(success ? 'Connexion réussie!' : 'Échec de la connexion')
    } catch (error) {
      setResult(`Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
    }
  }

  const handleLogout = () => {
    logout()
    setResult('Déconnexion réussie!')
  }

  const handleRegister = async () => {
    setResult('Tentative d\'inscription...')
    try {
      const success = await register({
        email: testEmail,
        pwd: testPassword,
        firstname: testFirstname,
        lastname: testLastname
      })
      setResult(success ? 'Inscription réussie!' : 'Échec de l\'inscription')
    } catch (error) {
      setResult(`Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
    }
  }

  const handleTestBackend = async () => {
    setResult('Test de la connexion au backend...')
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: 'hary',  // Utilisez le nom d'utilisateur que vous avez créé avec createsuperuser
          password: testPassword
        })
      })
      
      const data = await response.json()
      setResult(`Réponse du backend: ${JSON.stringify(data)}`)
    } catch (error) {
      setResult(`Erreur de connexion au backend: ${error instanceof Error ? error.message : 'Erreur inconnue'}`)
    }
  }

  if (isLoading) {
    return <div>Chargement...</div>
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Test d'authentification</CardTitle>
        <CardDescription>Testez les fonctionnalités d'authentification de votre application</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Statut d'authentification</Label>
          <div className={`p-2 rounded ${isAuthenticated ? 'bg-green-100' : 'bg-red-100'}`}>
            {authStatus}
          </div>
        </div>
        
        {tokenInfo && (
          <div className="space-y-2">
            <Label>Informations du token</Label>
            <pre className="p-2 bg-gray-100 rounded text-xs overflow-auto">
              {tokenInfo}
            </pre>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            value={testEmail} 
            onChange={(e) => setTestEmail(e.target.value)} 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input 
            id="password" 
            type="password" 
            value={testPassword} 
            onChange={(e) => setTestPassword(e.target.value)} 
          />
        </div>
        
        {!isAuthenticated && (
          <>
            <div className="space-y-2">
              <Label htmlFor="firstname">Prénom (pour l'inscription)</Label>
              <Input 
                id="firstname" 
                value={testFirstname} 
                onChange={(e) => setTestFirstname(e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastname">Nom (pour l'inscription)</Label>
              <Input 
                id="lastname" 
                value={testLastname} 
                onChange={(e) => setTestLastname(e.target.value)} 
              />
            </div>
          </>
        )}
        
        {result && (
          <div className="p-2 bg-blue-100 rounded">
            <p className="text-sm">{result}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="flex space-x-2 w-full">
          {!isAuthenticated ? (
            <>
              <Button onClick={handleLogin} className="flex-1">Connexion</Button>
              <Button onClick={handleRegister} className="flex-1">Inscription</Button>
            </>
          ) : (
            <Button onClick={handleLogout} className="flex-1">Déconnexion</Button>
          )}
        </div>
        <Button onClick={handleTestBackend} variant="outline" className="w-full">
          Test direct du backend
        </Button>
      </CardFooter>
    </Card>
  )
}
