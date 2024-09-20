// /app/api/userCount/route.js
import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/libs/dbConfig";

export async function GET() {
  try {
    const { db } = await connectToMongoDB();
    if (!db) {
      console.error("Failed to connect to the database");
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }
    const usersCount = await db.collection("users").countDocuments();
    return NextResponse.json({ count: usersCount });
  } catch (error) {
    console.error("Error fetching user count:", error);
    return NextResponse.json(
      { error: "Failed to fetch user count" },
      { status: 500 }
    );
  }
}
