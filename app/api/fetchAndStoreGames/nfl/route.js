// File Name: app/api/fetchAndStoreGames/nfl/route.js
import axios from "axios";
import { connectToMongoDB } from "@/libs/dbConfig";
import Game from "@/models/Game";

const GAMES_API_URL = "https://v1.american-football.api-sports.io/games";
const API_HOST = "v1.american-football.api-sports.io";

export async function fetchNFLGames() {
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
          params: { date: todayDateString, league: 1 }, // NFL league filter
        }),
        axios.get(GAMES_API_URL, {
          headers: {
            "x-rapidapi-key": process.env.GAMES_API_KEY,
            "x-rapidapi-host": API_HOST,
          },
          params: { date: yesterdayDateString, league: 1 }, // NFL league filter
        }),
        axios.get(GAMES_API_URL, {
          headers: {
            "x-rapidapi-key": process.env.GAMES_API_KEY,
            "x-rapidapi-host": API_HOST,
          },
          params: { date: tomorrowDateString, league: 1 }, // NFL league filter
        }),
      ]);

    const games = [
      ...todayResponse.data.response,
      ...yesterdayResponse.data.response,
      ...tomorrowResponse.data.response,
    ]
      .map((responseItem) => {
        // Access the necessary data using the correct path
        const { game, league, teams, scores } = responseItem;

        // Log the teams data for debugging
        console.log("Teams data:", teams);

        // Ensure we have the necessary team data
        if (!teams || !teams.home || !teams.away) {
          console.log(`Skipping game ID: ${game.id} due to missing team data.`);
          return null;
        }

        // Ensure the date and time are accessed correctly
        const gameDate = game.date.date;
        const gameTime = game.date.time;

        // Further processing...
        return {
          id: game.id,
          league: league.name,
          status: game.status.long || game.status.short || "Unknown Status",
          teamA: teams.home.name,
          teamB: teams.away.name,
          scoreA: scores.home.total !== null ? scores.home.total : 0,
          scoreB: scores.away.total !== null ? scores.away.total : 0,
          date: gameDate,
          time: gameTime || "N/A",
          venue: game.venue.name,
          city: game.venue.city,
        };
      })
      .filter((game) => game !== null); // Filter out null values

    console.log(`Fetched ${games.length} NFL games.`);

    return games;
  } catch (error) {
    console.error("Error fetching NFL games:", error);
    throw error;
  }
}

export async function GET() {
  try {
    await connectToMongoDB();
    console.log("MongoDB connected");

    const games = await fetchNFLGames();
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

    console.log("NFL games stored successfully in MongoDB");

    return new Response(
      JSON.stringify({ message: "NFL games stored successfully", games }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching or storing NFL games:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching or storing NFL games" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
