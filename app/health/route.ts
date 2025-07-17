import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check if the application is healthy
    const timestamp = new Date().toISOString()
    const uptime = process.uptime()
    
    // You can add additional health checks here:
    // - Database connectivity
    // - External service availability
    // - Memory usage checks
    
    return NextResponse.json({
      status: 'healthy',
      timestamp,
      uptime: `${Math.floor(uptime)} seconds`,
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || 'unknown'
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, {
      status: 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json'
      }
    })
  }
} 