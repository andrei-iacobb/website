import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

// In a real app, store this securely (env variable, database, etc.)
const ACCESS_CODE = "your-secret-code-here" // Change this!

// Store trusted device fingerprints (in production, use a database)
const trustedDevices = new Set<string>()

export async function POST(request: NextRequest) {
  try {
    const { password, fingerprint } = await request.json()

    if (password !== ACCESS_CODE) {
      return NextResponse.json({ error: "Invalid access code" }, { status: 401 })
    }

    // Add device to trusted list
    trustedDevices.add(fingerprint)

    const cookieStore = await cookies()

    // Set device token (the fingerprint)
    cookieStore.set("trusted-device", fingerprint, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    })

    // Set authentication flag
    cookieStore.set("device-authenticated", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
