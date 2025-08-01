import { User } from "@/lib/models/User";
import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";


// export async function GET(req: NextRequest, {params}: {params : {_id: string}}) {
//   try{
//     await connectMongoDB();
//     const recods = await User.find().sort({ createdAt: -1})
//     return NextResponse.json(recods)
//   }catch(error) {
//     return NextResponse.json({message: "Faild fetch record"}, { status: 500 });
//   }
// }

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectMongoDB();
  const record = await User.findById(params.id);
  return NextResponse.json(record);
}




export async function DELETE(request: NextRequest, URLParam: any) {
  try {
    // const id = URLParam.params.id;

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