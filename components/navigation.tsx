"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Sparkles, Scale, Building2, Trophy, LogIn, UserPlus } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/", label: "Home", icon: Sparkles },
  { href: "/compare", label: "Compare", icon: Scale },
  { href: "/casinos", label: "Casinos", icon: Building2 },
  { href: "/top-list", label: "Top List", icon: Trophy },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.webp" alt="Casino AI Logo" width={300} height={48} className="w-[150px] h-14" />
          </Link>

          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                    isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}

            <div className="flex items-center gap-2 ml-4 border-l border-border pl-4">
              <Link href="/signin">
                <Button variant="ghost" size="sm" className="gap-2">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90">
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
