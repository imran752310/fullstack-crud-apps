// app/api/record/route.ts
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

//define type that which type data get from form
type RecordRequestBody = {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
};



 // 📌 GET: Fetch all records
export async function GET() {
  try {
    const records = await prisma.record.findMany({
      orderBy: { createdAt: 'desc' }, // optional: order latest first
    });

    return NextResponse.json(records, { status: 200 });
  } catch (error) {
    console.error('GET /api/record error:', error);
    return NextResponse.json({ error: 'Failed to fetch records' }, { status: 500 });
  }
}



//Data insertion code
export async function POST(req: NextRequest) {
  try {
    //data fetch from NextRequest
    const body:RecordRequestBody = await req.json();
    //all form field fetch and store in object
    const { name, email, phone, address, message } = body;
    

    //data ineserton query to store data in database
    const record = await prisma.record.create({
      data: {
        name,
        email,
        phone,
        address,
        message,
        createdAt: new Date(), // ✅ Correct
      },
    });

    console.log("✅ Record created:", record);

    return NextResponse.json({ message: "Record added successfully", record }, { status: 201 });

  } catch (error: any) {
    console.error("❌ Error creating record:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}




