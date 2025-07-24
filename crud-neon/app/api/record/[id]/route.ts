// app/api/record/[id]/route.ts

import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'



export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()
  const updated = await prisma.record.update({ where: { id: params.id }, data })
  return NextResponse.json(updated)
}




export async function DELETE(req: Request, { params }: { params: { id: string } }) {

  const id =  req.json()
  console.log(id)

  const deleteUser = await prisma.record.delete({ where: { id: params.id } })
  return NextResponse.json({ reacord:deleteUser ,message: "datadeleted", },{status: 201})
}
