'use client'

import { useState } from 'react'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthService from '@/lib/auth-service'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        
        try {
            // Utiliser le nom d'utilisateur pour la connexion, pas l'email
            const success = await AuthService.login(username, password)
            
            if (success) {
                router.push('/dashboard')
            } else {
                setError('Échec de connexion. Veuillez réessayer.')
            }
        } catch (err: any) {
            console.error(err)
            if (err.response && err.response.data) {
                // Afficher l'erreur spécifique du backend si disponible
                const errorMessage = err.response.data.detail || 'Nom d\'utilisateur ou mot de passe incorrect.'
                setError(errorMessage)
            } else {
                setError('Nom d\'utilisateur ou mot de passe incorrect.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
            <form
                onSubmit={handleLogin}
                className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
                <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
                    <div className="text-center">
                        <Link href="/" aria-label="go home" className="mx-auto block w-fit">
                            <Logo />
                        </Link>
                        <h1 className="mb-1 mt-4 text-xl font-semibold">Sign In to H.eye</h1>
                        <p className="text-sm">Welcome back! Sign in to continue</p>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="block text-sm">Nom d'utilisateur</Label>
                            <Input
                                type="text"
                                required
                                name="username"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="space-y-0.5">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="pwd" className="text-title text-sm">Password</Label>
                                <Button asChild variant="link" size="sm">
                                    <Link href="#" className="link intent-info variant-ghost text-sm">
                                        Forgot your Password ?
                                    </Link>
                                </Button>
                            </div>
                            <Input
                                type="password"
                                required
                                name="pwd"
                                id="pwd"
                                className="input sz-md variant-mixed"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <Button className="w-full" type="submit" disabled={loading}>
                            {loading ? 'Connexion en cours...' : 'Sign In'}
                        </Button>
                    </div>

                    <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                        <hr className="border-dashed" />
                        <span className="text-muted-foreground text-xs">Or continue With</span>
                        <hr className="border-dashed" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {/* boutons Google/Microsoft identiques */}
                    </div>
                </div>

                <div className="p-3">
                    <p className="text-accent-foreground text-center text-sm">
                        Don't have an account ?
                        <Button asChild variant="link" className="px-2">
                            <Link href="/signup">Create account</Link>
                        </Button>
                    </p>
                </div>
            </form>
        </section>
    )
}
