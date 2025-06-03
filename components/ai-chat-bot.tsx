"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { MessageCircle, X, Send, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useChatStore } from "@/lib/store/chat-store"

type AIChatBotProps = {
  initialMessage?: string
  botName?: string
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  theme?: "light" | "dark" | "auto"
  iconColor?: string
  chatBubbleColor?: string
}

export default function AIChatBot({
  initialMessage = "Hello! I'm your AI assistant. How can I help you today?",
  botName = "AI Assistant",
  position = "bottom-right",
  theme = "auto",
  iconColor = "",
  chatBubbleColor = "",
}: AIChatBotProps) {
  const { messages, isChatOpen, isTyping, addMessage, setTyping, toggleChat } = useChatStore()
  const [chatInput, setChatInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Set initial message if there are no messages
  useEffect(() => {
    if (messages.length === 0) {
      addMessage({
        text: initialMessage,
        sender: "bot",
      })
    }
  }, [initialMessage, messages.length, addMessage])

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isTyping])

  // Position classes based on the position prop
  const getPositionClasses = () => {
    switch (position) {
      case "bottom-left":
        return "bottom-4 left-4"
      case "top-right":
        return "top-4 right-4"
      case "top-left":
        return "top-4 left-4"
      case "bottom-right":
      default:
        return "bottom-4 right-4"
    }
  }

  // Generate AI response based on user input
  const generateAIResponse = (userMessage: string): Promise<string> => {
    return new Promise((resolve) => {
      // Simulate AI thinking time
      const thinkingTime = Math.floor(Math.random() * 1000) + 500 // 500-1500ms

      setTimeout(() => {
        // Common responses for different types of queries
        const responses = {
          greeting: [
            "Hello! How can I assist you today?",
            "Hi there! What can I help you with?",
            "Greetings! How may I be of service?",
          ],
          farewell: [
            "Goodbye! Feel free to chat again if you need help.",
            "Have a great day! Let me know if you need anything else.",
            "Until next time! I'm here whenever you need assistance.",
          ],
          thanks: [
            "You're welcome! Is there anything else you'd like to know?",
            "Happy to help! Let me know if you have other questions.",
            "My pleasure! I'm here if you need more assistance.",
          ],
          help: [
            "I can answer questions, provide information, or assist with various tasks. What do you need help with?",
            "I'm here to help! Just let me know what you're looking for.",
            "I can assist with information, explanations, or guidance. What's on your mind?",
          ],
          camera: [
            "If you're having camera issues, make sure you've granted camera permissions in your browser settings. Also, ensure you're using HTTPS as most browsers require it for camera access.",
            "For camera problems, try refreshing the page and clicking 'Allow' when prompted for camera access. If that doesn't work, check your browser settings.",
            "Camera not working? Make sure no other applications are using your camera, and that you've granted permission to this website.",
          ],
          attendance: [
            "The attendance system tracks check-in/check-out times automatically using facial recognition. Is there something specific about it you'd like to know?",
            "Our attendance system uses biometric verification to ensure accurate tracking. What aspect are you interested in?",
            "The attendance records show who's present, checked-in, or absent. You can filter and search through the records as needed.",
          ],
          default: [
            "That's an interesting question. Let me help you with that.",
            "I understand what you're asking. Here's what I know about that.",
            "Great question! I'd be happy to provide information on that topic.",
            "I can certainly help with that inquiry.",
            "Let me address your question as best I can.",
          ],
        }

        // Determine response category based on user message
        const lowerCaseMessage = userMessage.toLowerCase()
        let category: keyof typeof responses = "default"

        if (/^(hi|hello|hey|greetings)/i.test(lowerCaseMessage)) {
          category = "greeting"
        } else if (/^(bye|goodbye|see you|farewell)/i.test(lowerCaseMessage)) {
          category = "farewell"
        } else if (/thank|thanks/i.test(lowerCaseMessage)) {
          category = "thanks"
        } else if (/help|assist|support/i.test(lowerCaseMessage)) {
          category = "help"
        } else if (/camera|video|webcam/i.test(lowerCaseMessage)) {
          category = "camera"
        } else if (/attendance|check.?in|present|absent/i.test(lowerCaseMessage)) {
          category = "attendance"
        }

        // Select a random response from the appropriate category
        const categoryResponses = responses[category]
        const randomResponse = categoryResponses[Math.floor(Math.random() * categoryResponses.length)]

        resolve(randomResponse)
      }, thinkingTime)
    })
  }

  const sendMessage = async () => {
    if (!chatInput.trim()) return

    // Add user message
    addMessage({
      text: chatInput,
      sender: "user",
    })

    setChatInput("")
    setTyping(true)

    try {
      // Get AI response
      const response = await generateAIResponse(chatInput)

      // Add bot message
      addMessage({
        text: response,
        sender: "bot",
      })
    } catch (error) {
      console.error("Error generating AI response:", error)

      // Add error message
      addMessage({
        text: "I'm sorry, I encountered an error. Please try again.",
        sender: "bot",
      })
    } finally {
      setTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className={`fixed ${getPositionClasses()} z-50`}>
      {/* Chat Popup */}
      {isChatOpen && (
        <div className="mb-4 w-80 h-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl flex flex-col animate-in slide-in-from-bottom-2">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-white dark:text-black" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{botName}</h3>
                <p className="text-xs text-green-500">Online</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={toggleChat} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === "user"
                      ? chatBubbleColor || "bg-gray-900 dark:bg-white text-white dark:text-black"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Invisible element for auto-scrolling */}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border-gray-300 dark:border-gray-600"
              />
              <Button
                onClick={sendMessage}
                disabled={!chatInput.trim()}
                className="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      <Button
        onClick={toggleChat}
        className={`w-12 h-12 rounded-full ${
          iconColor || "bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black"
        } shadow-lg`}
      >
        {isChatOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </Button>
    </div>
  )
}
