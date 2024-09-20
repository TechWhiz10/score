// File: /app/api/articles/route.js

import { connectToMongoDB } from "@/libs/dbConfig";
import Article from "@/models/Article";

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  try {
    await connectToMongoDB();

    // Parse the requested date
    let targetDate = new Date(date);

    // Shift the date by 1 day back (so the 13th shows articles from the 12th)
    targetDate.setDate(targetDate.getDate() + 2);

    // Set the time to the start of the previous day (12:00 AM)
    targetDate.setHours(0, 0, 0, 0);

    // Get the next day (for the range query, exclusive)
    const nextDay = new Date(targetDate);
    nextDay.setDate(targetDate.getDate() + 1);

    // Fetch articles where the `storedDate` is between the target day and the next day
    const articles = await Article.find({
      storedDate: { $gte: targetDate, $lt: nextDay },
    }).exec();

    return new Response(JSON.stringify({ articles }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch articles" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
