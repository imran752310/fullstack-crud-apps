import { User } from "@/lib/models/User";
import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectMongoDB();
  const record = await User.findById(params.id);
  return NextResponse.json(record);
}




export async function DELETE(request: NextRequest, URLParam: any) {
  try {


    await connectMongoDB();

    const data = await User.findByIdAndDelete(URLParam.params.id);

    return NextResponse.json({ msg: "Product Deleted Successful" });
  } catch (error) {
    return (
      NextResponse.json({
        error,
        msg: "Internal Server Error product not fetch",
      }),
      {
        status: 400,
      }
    );
  }
}