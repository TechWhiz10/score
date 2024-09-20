// File: /app/api/user/data/route.js

import { connectToMongoDB } from "@/libs/dbConfig";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req) {
  // Attempt to get token from Authorization header
  const authHeader = req.headers.get("authorization");
  let token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  // If token not found in Authorization header, check cookies
  if (!token) {
    const cookies = req.headers.get("cookie");
    if (cookies) {
      const tokenCookie = cookies
        .split("; ")
        .find((row) => row.startsWith("token="));
      if (tokenCookie) {
        token = tokenCookie.split("=")[1];
      }
    }
  }

  console.log("Authorization Header:", authHeader);
  console.log("Data Token:", token);

  if (!token) {
    console.error("No token found");
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectToMongoDB();
    console.log("Verifying Token", decoded);
    const user = await User.findById(decoded.id);

    if (!user) {
      console.error("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        email: user.email,
        trialEndTime: user.trialEndTime,
        isSubscriptionActivated: user.isSubscriptionActivated,
        subscriptionEndTime: user.subscriptionEndTime,
        userStatus: user.userStatus,
        referralCode: user.referralCode,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
