// File: /app/api/user/route.js

import { getServerSession } from "next-auth/next";
import { connectToMongoDB } from "@/libs/dbConfig";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await getServerSession(req, { authOptions });

  if (session) {
    await connectToMongoDB();
    const { id } = session.user;
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    try {
      const user = await User.findById(id);
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      user.email = email;
      await user.save();
      return NextResponse.json({ data: user }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
}
