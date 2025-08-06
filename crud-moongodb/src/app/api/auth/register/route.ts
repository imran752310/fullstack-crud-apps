import User from "@/lib/models/User";
import { connectMongoDB } from "@/lib/mongodb";
import bcryptjs from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest, response: NextResponse) {
  await connectMongoDB();
  return NextResponse.json({ message: "Register Route is here" });
}

export async function POST(request: NextRequest, response: NextResponse) {
  await connectMongoDB();
  const body = await request.json();
  const { name, email, password } = body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      console.log("user already exist", user);
      return NextResponse.json(
        { message: "User already Exist" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name: name,
      email: email,
    };
    const JWT_SECRET = "myjwtsecret";
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    const cookieStore = cookies();
    (await cookieStore).set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    (await cookieStore).set("userId", user._id, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      // token,
    });

    const addUser = await newUser.save();
    console.log("new user added ", addUser);

    return NextResponse.json({
      message: "user added successfully",
      user: addUser,
      // token: token,
    });
  } catch (error) {
    NextResponse.json({ message: "Error", error: error }, { status: 400 });
  }
}

// import User from "@/lib/models/User";
// import { connectMongoDB } from "@/lib/mongodb";
// import bcryptjs from "bcryptjs";
// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest, response: NextResponse) {
//     await connectMongoDB();
//     const body = await request.json();
//     const {name, email, password} = body;
    
//     // check Email duplication 
// try {
//     const user = await User.findOne({ email });
//     if (user) {
//       console.log("user already exist", user);
//       return NextResponse.json(
//         { message: "User already Exist" },
//         { status: 400 }
//       );
//     }

//     const salt = await bcryptjs.genSalt(10)
// const hashedPassword = await bcryptjs.hash(password, salt);
// console.log(hashedPassword)
//  const payload = {
//       name: name,
//       email: email,
//     };
//     const JWT_SECRET = "myjwtsecret";
//     const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

//     const cookieStore = cookies();
//     cookieStore.set("token", token, {
//       httpOnly: true,
//       maxAge: 60 * 60 * 24 * 7, // 1 week
//     });

//     cookieStore.set("userId", user._id, {
//       httpOnly: true,
//       maxAge: 60 * 60 * 24 * 7, // 1 week
//     });

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       token,
//     });

//     const addUser = await newUser.save();
//     console.log("new user added ", addUser);

//     return NextResponse.json({
//       message: "user added successfully",
//       user: addUser,
//       token: token,
//     });
//   } catch (error) {
//     NextResponse.json({ message: "Error", error: error }, { status: 400 });
//   }
// }