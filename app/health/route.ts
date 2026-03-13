import { NextResponse } from 'next/server'

const CACHE_HEADERS = {
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Content-Type': 'application/json',
}

export async function GET() {
  try {
    return NextResponse.json(
      { status: 'healthy' },
      { status: 200, headers: CACHE_HEADERS },
    )
  } catch {
    return NextResponse.json(
      { status: 'unhealthy' },
      { status: 503, headers: CACHE_HEADERS },
    )
  }
} 