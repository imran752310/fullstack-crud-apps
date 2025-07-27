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


// import { User } from "@/lib/models/User";
// import { NextRequest,NextResponse } from "next/server";


// export async function POST(req: NextRequest) {
//     try{

//         const body = await req.json();
//         const { name, email, phone, address, message } = body;
//         const Products = new User({ name, email, phone, address, message });
//       await Products.save();

// return NextResponse.json("data interst")
//     }catch(error){

//     }
// }