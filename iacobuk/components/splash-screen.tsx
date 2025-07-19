"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ExternalLink, Lock } from "lucide-react"

export default function SplashScreen() {
  const [showAuth, setShowAuth] = useState(false)
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleQuickAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const fingerprint = await generateDeviceFingerprint()
      const response = await fetch("/api/auth/device", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, fingerprint }),
      })

      if (response.ok) {
        window.location.reload()
      } else {
        const data = await response.json()
        setError(data.error || "Authentication failed")
      }
    } catch (error) {
      setError("Network error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Welcome to</h1>
          <div className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            iacob.uk
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-slate-300 text-lg">
            Thanks for visiting! You'll find what you're looking for at my main site.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            <a
              href="https://andrei.iacob.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Visit Main Site
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>

          {!showAuth ? (
            <Button
              variant="ghost"
              onClick={() => setShowAuth(true)}
              className="text-slate-400 hover:text-white flex items-center gap-2 mx-auto"
            >
              <Lock className="w-4 h-4" />
              Owner Access
            </Button>
          ) : (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 space-y-4">
              <form onSubmit={handleQuickAuth} className="space-y-4">
                <Input
                  type="password"
                  placeholder="Access code"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  required
                />
                {error && <div className="text-red-400 text-sm">{error}</div>}
                <Button type="submit" disabled={loading || !password} className="w-full">
                  {loading ? "Authenticating..." : "Access"}
                </Button>
              </form>
            </div>
          )}
        </div>

        <div className="pt-8">
          <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

// Same fingerprinting function as in device-auth.tsx
async function generateDeviceFingerprint(): Promise<string> {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  if (ctx) {
    ctx.textBaseline = "top"
    ctx.font = "14px Arial"
    ctx.fillText("Device fingerprint", 2, 2)
  }

  const fingerprint = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenResolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    canvasFingerprint: canvas.toDataURL(),
    hardwareConcurrency: navigator.hardwareConcurrency,
    deviceMemory: (navigator as any).deviceMemory || "unknown",
  }

  const encoder = new TextEncoder()
  const data = encoder.encode(JSON.stringify(fingerprint))
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}
