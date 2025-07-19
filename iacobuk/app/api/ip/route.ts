import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // Get client IP from various headers
  const forwardedFor = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")
  const cfConnectingIP = request.headers.get("cf-connecting-ip")

  let clientIP = "unknown"

  if (forwardedFor) {
    clientIP = forwardedFor.split(",")[0].trim()
  } else if (realIP) {
    clientIP = realIP
  } else if (cfConnectingIP) {
    clientIP = cfConnectingIP
  }

  return NextResponse.json({
    ip: clientIP,
    headers: {
      "x-forwarded-for": forwardedFor,
      "x-real-ip": realIP,
      "cf-connecting-ip": cfConnectingIP,
    },
  })
}
