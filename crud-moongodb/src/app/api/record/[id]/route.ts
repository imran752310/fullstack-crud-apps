
import { User } from "@/lib/models/User";
import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, URLParam: any) {

    try{

        // const id = URLParam.params.id;

    
    await connectMongoDB();
        

    const data = await User.findByIdAndDelete(URLParam.params.id);


  return NextResponse.json({msg: "Product Deleted Successful"} );
}catch(error) {
  return NextResponse.json(
    { 
        error,
        msg: "Internal Server Error product not fetch" }
    ),{
        status: 400
    }
}
}




// // import { User } from "@/lib/models/User";
// // import { connectMongoDB } from "@/lib/mongodb";
// // import { NextRequest, NextResponse } from "next/server";


// import { connectMongoDB } from "@/lib/mongodb";
// import { User } from "@/lib/models/User";
// import { NextRequest, NextResponse } from "next/server";

// // DELETE /api/record/[id]
// export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     await connectMongoDB();
//     const deletedUser = await User.findByIdAndDelete(params.id);

//     if (!deletedUser) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
//   } catch (error) {
//     console.error("Delete error:", error);
//     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }



// // // export async function DELETE(
// // //     req: NextRequest,  URLParam:any ) {
// // //        const id = URLParam.params.id;
// // //        console.log(id)
// // //     // try{
// // //     //      await connectMongoDB();
// // //     // const deletedUser = await User.findByIdAndDelete(params.id);

// // //     // if (!deletedUser) {
// // //     //   return NextResponse.json({ message: "User not found" }, { status: 404 });
// // //     // }

// // //     // return NextResponse.json({ message: "User deleted successfully" });
// // //     // }catch(error){

// // //     // }
// // //     }


// // // src/app/api/record/[id]/route.ts
// // // import { connectMongoDB } from "@/lib/mongodb";
// // // import Record from "@/models/Record";
// // // import { NextRequest, NextResponse } from "next/server";

// // export async function DELETE(
// //   req: NextRequest,
// //   { params }: { params: { id: string } }
// // ) {
// //   try {
// //     await connectMongoDB();
// //     const deletedRecord = await User.findByIdAndDelete(params.id);

// //     if (!deletedRecord) {
// //       return NextResponse.json({ message: "Record not found" }, { status: 404 });
// //     }

// //     return NextResponse.json({ message: "Record deleted successfully" });
// //   } catch (error) {
// //     console.error("Delete failed:", error);
// //     return NextResponse.json({ message: "Failed to delete record" }, { status: 500 });
// //   }
// // }
