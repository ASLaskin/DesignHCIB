"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export function HeaderComponent() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <span className="font-bold sm:inline-block">
            Code Scanner
          </span>
        <div className="flex items-center">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-gray-700"
              role="switch"
              aria-checked={theme === "dark"}
            >
              <span className="sr-only">Toggle dark mode</span>
              <span
                className={`${
                  theme === "dark" ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              >
                {theme === "dark" ? (
                  <Moon className="h-4 w-4 text-gray-800" />
                ) : (
                  <Sun className="h-4 w-4 text-yellow-500" />
                )}
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}