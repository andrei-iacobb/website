"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Smartphone } from "lucide-react"

interface DeviceAuthProps {
  isRecognized: boolean
}

export default function DeviceAuth({ isRecognized }: DeviceAuthProps) {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/device", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          fingerprint: await generateDeviceFingerprint(),
        }),
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
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {isRecognized ? (
              <Smartphone className="w-12 h-12 text-green-500" />
            ) : (
              <Shield className="w-12 h-12 text-purple-500" />
            )}
          </div>
          <CardTitle className="text-2xl">{isRecognized ? "Welcome Back!" : "Device Authentication"}</CardTitle>
          <CardDescription>
            {isRecognized
              ? "This device is recognized. Please authenticate to continue."
              : "Enter the access code to register this device."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Enter access code"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-center text-lg"
              />
            </div>

            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            <Button type="submit" className="w-full" disabled={loading || !password}>
              {loading ? "Authenticating..." : "Authenticate"}
            </Button>
          </form>

          <div className="mt-6 text-xs text-slate-500 text-center">
            <p>This device will be remembered for future visits</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Generate a device fingerprint based on browser characteristics
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

  // Create a hash of the fingerprint
  const encoder = new TextEncoder()
  const data = encoder.encode(JSON.stringify(fingerprint))
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}
