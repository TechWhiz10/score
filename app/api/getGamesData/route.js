// File Name: app/api/getGamesData/route.js
import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/libs/dbConfig";
import Game from "@/models/Game";

export async function GET() {
  try {
    // Ensure MongoDB connection
    await connectToMongoDB();

    // Fetch the latest games data from the database
    const games = await Game.find({}).sort({ date: -1 }); // Sort by date descending
    return NextResponse.json({ games });
  } catch (error) {
    console.error("Error fetching games from database:", error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    );
  }
}
