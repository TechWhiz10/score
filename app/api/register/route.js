// File: /app/api/register/route.js

import { connectToMongoDB } from "@/libs/dbConfig";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToMongoDB();
    const { email, password, referralCode } = await req.json();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Find the referrer if referral code is provided
    let referredBy = null;
    if (referralCode) {
      const referrer = await User.findOne({ referralCode });
      if (referrer) {
        referredBy = referrer._id;
      }
    }

    // Create a new user
    const newUser = new User({
      email,
      password, // The password will be hashed by the pre-save hook in the User model
      referredBy,
    });

    // Save the new user
    const savedUser = await newUser.save();
    console.log("Saved user with hashed password:", savedUser.password);

    // Generate a token
    const token = jwt.sign(
      { id: savedUser._id, email: savedUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Set the token as an HTTP-only cookie
    const response = NextResponse.json(
      { message: "User created successfully", token },
      { status: 201 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
