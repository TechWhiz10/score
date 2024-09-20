// File Name: app/api/fetchAndStoreGames/mlb/route.js
import axios from "axios";
import { connectToMongoDB } from "@/libs/dbConfig";
import Game from "@/models/Game";

const GAMES_API_URL = "https://v1.baseball.api-sports.io/games";
const API_HOST = "v1.baseball.api-sports.io";

// List of official MLB team IDs
const MLB_TEAM_IDS = [
  2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 16, 17, 18, 19, 20, 22, 24, 25, 26, 27,
  28, 30, 31, 32, 33, 34, 35, 36, 37,
];

export async function fetchMLBGames() {
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
        const { id, status, teams, scores, date, time } = gameData;
        // Ensure scores are numbers, default to 0 if unavailable
        const scoreA =
          scores.home.total !== null && !isNaN(scores.home.total)
            ? scores.home.total
            : 0;
        const scoreB =
          scores.away.total !== null && !isNaN(scores.away.total)
            ? scores.away.total
            : 0;

        // Check if the game involves only MLB teams
        if (
          MLB_TEAM_IDS.includes(teams.home.id) &&
          MLB_TEAM_IDS.includes(teams.away.id)
        ) {
          return {
            id,
            league: "MLB",
            status: status.long || status.short || "Unknown Status",
            teamA: teams.home.name,
            teamB: teams.away.name,
            scoreA,
            scoreB,
            date: new Date(date),
            time: time || "N/A",
            confidence: 0,
            prediction: "",
            odds: "",
          };
        }

        return null; // Exclude non-MLB games
      })
      .filter((game) => game !== null); // Filter out null values

    console.log(`Fetched ${games.length} MLB games.`);
    return games;
  } catch (error) {
    console.error("Error fetching MLB games:", error);
    throw error;
  }
}

export async function GET() {
  try {
    await connectToMongoDB();
    console.log("MongoDB connected");

    const games = await fetchMLBGames();
    console.log("Games fetched:", games);

    await Promise.all(
      games.map(async (game) => {
        try {
          const existingGame = await Game.findOne({ id: game.id });
          if (existingGame) {
            await Game.updateOne({ id: game.id }, game);
            console.log(`Updated game with ID: ${game.id}`);
          } else {
            await Game.create(game);
            console.log(`Created new game with ID: ${game.id}`);
          }
        } catch (dbError) {
          console.error(`Error saving game with ID: ${game.id}`, dbError);
        }
      })
    );

    console.log("MLB games stored successfully in MongoDB");

    return new Response(
      JSON.stringify({ message: "MLB games stored successfully", games }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching or storing MLB games:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching or storing MLB games" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
