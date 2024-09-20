// File Name: app/api/fetchAndStoreGames/nba/route.js
import axios from "axios";
import { connectToMongoDB } from "@/libs/dbConfig";
import Game from "@/models/Game";

const GAMES_API_URL = "https://v2.nba.api-sports.io/games";
const API_HOST = "v2.nba.api-sports.io";

export async function fetchNBAGames() {
  try {
    const today = new Date();
    const yesterday = new Date(today);
    const tomorrow = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayDateString = today.toISOString().split("T")[0];
    const yesterdayDateString = yesterday.toISOString().split("T")[0];
    const tomorrowDateString = tomorrow.toISOString().split("T")[0];

    const [todayResponse, yesterdayResponse, tomorrowResponse] =
      await Promise.all([
        axios.get(GAMES_API_URL, {
          headers: {
            "x-rapidapi-key": process.env.GAMES_API_KEY,
            "x-rapidapi-host": API_HOST,
          },
          params: { date: todayDateString },
        }),
        axios.get(GAMES_API_URL, {
          headers: {
            "x-rapidapi-key": process.env.GAMES_API_KEY,
            "x-rapidapi-host": API_HOST,
          },
          params: { date: yesterdayDateString },
        }),
        axios.get(GAMES_API_URL, {
          headers: {
            "x-rapidapi-key": process.env.GAMES_API_KEY,
            "x-rapidapi-host": API_HOST,
          },
          params: { date: tomorrowDateString },
        }),
      ]);

    const games = [
      ...todayResponse.data.response,
      ...yesterdayResponse.data.response,
      ...tomorrowResponse.data.response,
    ]
      .map((gameData) => {
        const { id, status, teams, scores, date } = gameData;

        return {
          id,
          league: "NBA",
          status: status.long || status.short || "Unknown Status",
          teamA: teams.home.name,
          teamB: teams.away.name,
          scoreA: scores.home.points || "N/A",
          scoreB: scores.away.points || "N/A",
          date: new Date(date.start),
          time: date.start.split("T")[1].split(".")[0], // Extract time from start
          confidence: 0,
          prediction: "",
          odds: "",
        };
      })
      .filter((game) => game !== null); // Filter out null values

    console.log(`Fetched ${games.length} NBA games.`);
    return games;
  } catch (error) {
    console.error("Error fetching NBA games:", error);
    throw error;
  }
}

export async function GET() {
  try {
    await connectToMongoDB();
    const games = await fetchNBAGames();
    console.log(`Storing ${games.length} NBA games in MongoDB.`);

    await Promise.all(
      games.map(async (game) => {
        const existingGame = await Game.findOne({ id: game.id });
        if (existingGame) {
          await Game.updateOne({ id: game.id }, game);
          console.log(`Updated game with ID: ${game.id}`);
        } else {
          await Game.create(game);
          console.log(`Created new game with ID: ${game.id}`);
        }
      })
    );

    console.log("NBA games stored successfully in MongoDB");

    return new Response(
      JSON.stringify({ message: "NBA games stored successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching or storing NBA games:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching or storing NBA games" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
