import { connectToMongoDB } from "@/libs/dbConfig";
import Game from "@/models/Game";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  try {
    await connectToMongoDB();

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const games = await Game.find({ date: targetDate }).exec();
    return new Response(JSON.stringify({ games }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching games:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch games" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
