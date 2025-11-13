"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send, Bot, User } from "lucide-react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function CasinoChat() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/casino-chat" }),
  })
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || status === "in_progress") return

    sendMessage({ text: input })
    setInput("")
  }

  const suggestedQuestions = [
    "What's the best casino for crypto payments?",
    "Which casinos offer no deposit bonuses?",
    "Find me casinos with live dealer games",
    "What are the top rated casinos for USA players?",
  ]

  return (
    <Card className="bg-card border-border overflow-hidden">
      <div className="p-6 border-b border-border bg-card/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Bot className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Casino AI Assistant</h2>
            <p className="text-sm text-muted-foreground">Ask me anything about online casinos</p>
          </div>
        </div>
      </div>

      <div className="h-[500px] overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="space-y-4">
            <p className="text-center text-muted-foreground">
              Welcome! I'm your casino advisor. Ask me about bonuses, payment methods, game types, or casino
              recommendations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
              {suggestedQuestions.map((question, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInput(question)
                  }}
                  className="p-3 text-left text-sm bg-secondary hover:bg-accent rounded-lg transition-colors border border-border"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  message.role === "user" ? "bg-primary" : "bg-secondary"
                }`}
              >
                {message.role === "user" ? (
                  <User className="w-5 h-5 text-primary-foreground" />
                ) : (
                  <Bot className="w-5 h-5 text-foreground" />
                )}
              </div>
              <div
                className={`flex-1 p-4 rounded-lg ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                }`}
              >
                {message.parts.map((part, index) => {
                  if (part.type === "text") {
                    return (
                      <div key={index} className="whitespace-pre-wrap">
                        {part.text}
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            </div>
          ))
        )}

        {status === "in_progress" && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-foreground" />
            </div>
            <div className="flex-1 p-4 bg-secondary rounded-lg">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 border-t border-border bg-card/50">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about casinos, bonuses, games..."
            disabled={status === "in_progress"}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={!input.trim() || status === "in_progress"}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Card>
  )
}
