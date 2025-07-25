// app/api/record/[id]/route.ts

import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   const updated = await prisma.record.findUnique({ where: { id: params.id } })
//   return NextResponse.json(updated)
// }

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {

  const res = await prisma.record.findUnique({ where: { id: params.id } })
  if (!res) {
    return NextResponse.json({ message: "Record not found" }, { status: 404 });
  }
  // If the record is found, return it
  console.log("Record found:", res);
  return NextResponse.json({data : res})
  
  
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()
  const updated = await prisma.record.update({ where: { id: params.id }, data })
  return NextResponse.json(updated)
}




export async function DELETE(req: Request, { params }: { params: { id: string } }) {

  const id =  req.json()


  const deleteUser = await prisma.record.delete({ where: { id: params.id } })
  return NextResponse.json({ reacord:deleteUser ,message: "datadeleted", },{status: 201})
}
