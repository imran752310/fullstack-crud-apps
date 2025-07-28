import { User } from "@/lib/models/User";
import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
     await connectMongoDB(); // Always connect to DB first
  

    const body = await req.json();
    const { name, email, phone, address, message } = body;

    const newUser = new User({ name, email, phone, address, message, createdAt: new Date() });
    await newUser.save();

    return NextResponse.json({ message: "Data inserted successfully", data: newUser }, { status: 201 });
  } catch (error) {
    console.error("POST /api/record error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}


// export async function GET() {
//   try {
//     await connectMongoDB();
//     const records = await User.find().sort({ createdAt: -1 });
//     return NextResponse.json(records);
//   } catch (error) {
//     return NextResponse.json({ message: "Failed to fetch records" }, { status: 500 });
//   }
// }


export async function GET(req: NextRequest, {params}: {params : {_id: string}}) {
  try{
    await connectMongoDB();
    const recods = await User.find().sort({ createdAt: -1})
    return NextResponse.json(recods)
  }catch(error) {
    return NextResponse.json({message: "Faild fetch record"}, { status: 500 });
  }
}