'use client'

import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useState, useEffect } from "react"
import Link from "next/link"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-4">
          <span className="font-bold italic sm:inline-block">CodeScanner</span>
          <button
            onClick={toggleSidebar}
            className="p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-50 transform ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="ml-auto flex h-full w-64 flex-col bg-background shadow-lg">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={toggleSidebar}
              className="p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 p-4 space-y-4">
            <div>
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
              >
                <span>Dark Mode</span>
                <span
                  className={`relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-gray-700`}
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
                </span>
              </button>
            </div>
            <Link
              href="/about"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
              onClick={toggleSidebar}
            >
              About CodeScanner
            </Link>
            {/* <Link
              href="/"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
              onClick={toggleSidebar}
            >
              Home
            </Link> */}
          </nav>
        </div>
      </div>
    </>
  )
}