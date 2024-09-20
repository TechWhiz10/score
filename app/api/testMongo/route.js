// File: /app/api/testMongo/route.js
import { connectToMongoDB } from "@/libs/dbConfig";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToMongoDB();
    console.log("MongoDB connected successfully");
    return new NextResponse(JSON.stringify({ message: "MongoDB connected!" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to connect to MongoDB" }),
      { status: 500 }
    );
  }
}
