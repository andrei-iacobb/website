import { NextResponse } from "next/server"
import { getContributions } from "@/lib/github"

export async function GET() {
  return NextResponse.json(await getContributions())
}
