// File name: /app/protected-route/route.js

import { connectToMongoDB } from "@/libs/dbConfig";
import User from "@/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export async function GET(req) {
  await connectToMongoDB();

  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json(
      { error: "Authorization header is missing" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return NextResponse.json(
      { error: "Bearer token is missing" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, secret);
    if (!decoded || !decoded.id) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json(
      { error: "Failed to verify token" },
      { status: 401 }
    );
  }
}
