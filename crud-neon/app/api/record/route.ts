// app/api/record/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const records = await prisma.record.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(records)
}

export async function POST(req: Request) {
  const data = await req.json()
  const newRecord = await prisma.record.create({ data })
  return NextResponse.json(newRecord)
}
