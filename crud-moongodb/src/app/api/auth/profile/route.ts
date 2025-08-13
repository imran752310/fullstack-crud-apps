// import User from "@/lib/models/User";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request:NextRequest) {
    
//     const id = localStorage.getItem('userId')
//     try{
//         const user = await User.findOne({_id : id})
//         if(!user){
//             console.log("User Not Found")
//             return NextResponse.json({message : "user not found" } , {status : 404})
//         }
//         console.log(user)
        
//     }catch (error){
//         return NextResponse.json({mesage : "user not found"} , {status : 404})
//     }    
// }


import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/models/User";
import { connectMongoDB } from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  await connectMongoDB();

  const cookieStore = cookies();
  const userId =  (await cookieStore).get("userId")?.value;

  if (!userId) {
    return NextResponse.json({ message: "Not logged in" }, { status: 401 });
  }

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching user", error }, { status: 500 });
  }
}
