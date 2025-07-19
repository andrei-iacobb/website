"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function IPDebug() {
  const [ipInfo, setIpInfo] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const checkIP = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/ip")
      const data = await response.json()
      setIpInfo(data)
    } catch (error) {
      console.error("Error fetching IP:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>IP Debug Tool</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={checkIP} disabled={loading} className="w-full">
          {loading ? "Checking..." : "Check My IP"}
        </Button>

        {ipInfo && (
          <div className="space-y-2 text-sm">
            <p>
              <strong>Detected IP:</strong> {ipInfo.ip}
            </p>
            <div className="text-xs text-slate-600">
              <p>
                <strong>Headers:</strong>
              </p>
              <pre className="bg-slate-100 p-2 rounded text-xs overflow-auto">
                {JSON.stringify(ipInfo.headers, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
