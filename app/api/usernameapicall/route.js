// File: /app/api/register/route.js

import { connectToMongoDB } from "@/libs/dbConfig";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToMongoDB();
    const { email, password } = await req.json();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Create a new user
    const newUser = new User({
      email,
      password, // The password will be hashed by the pre-save hook in the User model
    });

    // Save the new user
    const savedUser = await newUser.save();
    console.log("Saved user with hashed password:", savedUser.password);

    return NextResponse.json(
      {
        message: "User created in apiusername call successfully",
        user: savedUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during user registration:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
