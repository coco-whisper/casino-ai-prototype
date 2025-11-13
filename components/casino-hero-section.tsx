"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, Sparkles, Bot, User, ArrowRight } from "lucide-react"
import { CasinoBackground3D } from "@/components/casino-background-3d"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"

const SUGGESTED_QUESTIONS = [
  "What's the best casino for crypto payments?",
  "Which casinos offer no deposit bonuses?",
  "Find me casinos with live dealer games",
  "Top casinos for USA players?",
]

export function CasinoHeroSection() {
  const [input, setInput] = useState("")
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/casino-chat" }),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || status === "in_progress") return

    sendMessage({ text: input })
    setInput("")
  }

  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
    sendMessage({ text: question })
  }

  return (
    <div className="relative min-h-screen">
      <CasinoBackground3D />

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 pt-20 pb-16">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Casino Intelligence</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-bold text-balance leading-tight">
                Discover Your Perfect
                <br />
                <span className="text-primary">Casino Match</span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
                Ask our AI anything about online casinos. Get instant recommendations, compare bonuses, and find the
                best sites for your gaming style.
              </p>
            </div>

            <div className="max-w-2xl mx-auto pt-4">
              <form onSubmit={handleSubmit} className="relative">
                <div className="relative group">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything... 'Best crypto casinos?' or 'Highest welcome bonus?'"
                    disabled={status === "in_progress"}
                    className="h-16 pl-6 pr-16 text-lg bg-background/80 backdrop-blur-sm border-2 border-border hover:border-primary/50 focus:border-primary transition-all rounded-2xl shadow-lg"
                  />
                  <Button
                    type="submit"
                    disabled={!input.trim() || status === "in_progress"}
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </form>
            </div>

            {messages.length === 0 && (
              <div className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground font-medium">Popular Questions:</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {SUGGESTED_QUESTIONS.map((question, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="group px-5 py-3 bg-background/60 backdrop-blur-sm hover:bg-primary/10 border border-border hover:border-primary/50 rounded-xl transition-all text-sm font-medium flex items-center gap-2"
                    >
                      {question}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {messages.length > 0 && (
          <div className="container mx-auto px-4 pb-16">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-background/80 backdrop-blur-sm border-border shadow-2xl">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <Bot className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">AI Response</h2>
                      <p className="text-sm text-muted-foreground">Personalized casino insights</p>
                    </div>
                  </div>
                </div>

                <div className="max-h-[600px] overflow-y-auto p-6 space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
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
                        className={`flex-1 p-5 rounded-2xl ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary/50 text-foreground"
                        }`}
                      >
                        {message.parts.map((part, index) => {
                          if (part.type === "text") {
                            return (
                              <div key={index} className="whitespace-pre-wrap text-base leading-relaxed">
                                {part.text}
                              </div>
                            )
                          }
                          return null
                        })}
                      </div>
                    </div>
                  ))}

                  {status === "in_progress" && (
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-foreground" />
                      </div>
                      <div className="flex-1 p-5 bg-secondary/50 rounded-2xl">
                        <div className="flex gap-1.5">
                          <div
                            className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          />
                          <div
                            className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <div
                            className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
