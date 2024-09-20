// File Name: app/api/fetchAndStoreGames/route.js
import { NextResponse } from "next/server";
import { fetchNBAGames } from "../fetchAndStoreGames/nba/route";
import { fetchMLBGames } from "../fetchAndStoreGames/mlb/route";
import { fetchNFLGames } from "../fetchAndStoreGames/nfl/route";
import { connectToMongoDB } from "@/libs/dbConfig";
import Game from "@/models/Game";

async function fetchGamesData() {
  try {
    console.log("Fetching games data...");
    const [nbaGames = [], mlbGames = [], nflGames = []] = await Promise.all([
      fetchNBAGames(),
      fetchMLBGames(),
      fetchNFLGames(),
    ]);

    const games = [...nbaGames, ...mlbGames, ...nflGames].filter(Boolean);

    if (games.length === 0) {
      console.log("No games fetched from the API");
    } else {
      console.log(`Fetched ${games.length} games from the API.`);
    }

    return games;
  } catch (error) {
    console.error("Error fetching games data from the API:", error);
    throw new Error("Failed to fetch games");
  }
}

export async function GET(req) {
  try {
    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await connectToMongoDB();
    console.log("MongoDB connected successfully.");

    // Fetch games data from multiple sources
    const games = await fetchGamesData();

    if (games.length === 0) {
      console.log("No games to store in the database.");
      return new NextResponse(
        JSON.stringify({ message: "No games to store" }),
        {
          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
            Expires: "0",
            Pragma: "no-cache",
            "Surrogate-Control": "no-store",
          },
        }
      );
    }

    // Store or update games in the database
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
          console.error(`Error saving game with ID ${game.id}:`, dbError);
        }
      })
    );

    console.log("All games stored successfully in MongoDB.");

    return new NextResponse(
      JSON.stringify({ message: "Games stored successfully", games }),
      {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Surrogate-Control": "no-store",
          Expires: "0",
          Pragma: "no-cache",
        },
      }
    );
  } catch (error) {
    console.error("Error during the fetch and store process:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch or store games" }),
      {
        status: 500,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Expires: "0",
          Pragma: "no-cache",
          "Surrogate-Control": "no-store",
        },
      }
    );
  }
}
