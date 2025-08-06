import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "@/lib/models/User";

export async function GET(request: Request) {
  return new Response("Hello, Next.js!");
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    }

    const validatePass = bcryptjs.compare(password, user.password);
    if (!validatePass) {
      return NextResponse.json(
        { message: "Password Does not match" },
        { status: 404 }
      );
    }

    const tokenData = {
      userId: user._id,
      email: email,
    };
    const JWT_SECRET = "mysecret";
    const token = jwt.sign(tokenData, JWT_SECRET, {
      expiresIn: "1d",
    });

    const cookieStore = cookies();
    (await cookieStore).set("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    (await cookieStore).set("userId", user._id, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return NextResponse.json({
      message: "user Logged in",
      user: user,
      token: token,
    });
  } catch (error) {}
}