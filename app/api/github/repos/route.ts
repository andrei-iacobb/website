import { NextResponse } from "next/server"
import { getRepositories } from "@/lib/github"

export async function GET() {
  const repositories = await getRepositories()
  return NextResponse.json(
    repositories.map(({ name, pushed_at }) => ({ name, pushed_at })),
  )
}
