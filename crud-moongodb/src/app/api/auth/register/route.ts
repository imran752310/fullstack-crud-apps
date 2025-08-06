import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
    await connectMongoDB();
    const body = await request.json();
    const {name, email, password} = body;
    
    // check Email duplication 
    
}