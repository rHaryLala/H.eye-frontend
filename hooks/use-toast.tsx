import { useCallback } from "react"

type ToastOptions = {
  title: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToast() {
  // Remplace ceci par ta logique de notification réelle si tu utilises une librairie
  const toast = useCallback((options: ToastOptions) => {
    alert(`${options.title}\n${options.description ?? ""}`)
    // Ici tu peux intégrer une vraie notification (ex: react-hot-toast, sonner, radix, etc.)
  }, [])

  return { toast }
}