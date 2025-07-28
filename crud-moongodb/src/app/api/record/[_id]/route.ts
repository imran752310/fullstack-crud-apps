import { User } from "@/lib/models/User";
import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(
    req: NextRequest,
    { params } : { params : {_id : string}}) {

    try{
         await connectMongoDB();
    const deletedUser = await User.findByIdAndDelete(params._id);

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
    }catch(error){

    }
    }
