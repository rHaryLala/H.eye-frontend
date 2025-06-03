import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Message = {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

type ChatState = {
  messages: Message[]
  isChatOpen: boolean
  isTyping: boolean
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void
  setTyping: (isTyping: boolean) => void
  toggleChat: () => void
  clearMessages: () => void
}

// Create a store with persistence
export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [
        {
          id: 1,
          text: "Hello! I'm your AI assistant. How can I help you today?",
          sender: "bot",
          timestamp: new Date(),
        },
      ],
      isChatOpen: false,
      isTyping: false,
      addMessage: (message) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              id: state.messages.length + 1,
              ...message,
              timestamp: new Date(),
            },
          ],
        })),
      setTyping: (isTyping) => set({ isTyping }),
      toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
      clearMessages: () =>
        set({
          messages: [
            {
              id: 1,
              text: "Hello! I'm your AI assistant. How can I help you today?",
              sender: "bot",
              timestamp: new Date(),
            },
          ],
        }),
    }),
    {
      name: "chat-storage", // unique name for localStorage
      partialize: (state) => ({ messages: state.messages }), // only persist messages
    },
  ),
)
