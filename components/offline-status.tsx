"use client"

import { useOffline } from "next/offline"

export function OfflineStatus() {
  const isOffline = useOffline()

  return (
    <span className="sr-only" role="status" aria-live="polite">
      {isOffline ? "Offline. Navigation will resume when the connection returns." : ""}
    </span>
  )
}
