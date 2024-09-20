// File Name: app/api/fetchAndStoreNews/route.js
import fetch from "node-fetch";
import { connectToMongoDB } from "@/libs/dbConfig";
import Article from "@/models/Article";
import { NextResponse } from "next/server";

const fetchAndStoreNews = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    await connectToMongoDB();
    console.log("Connected to MongoDB");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/news`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log("Fetched news data from API");

    const data = await response.json();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const articles = data.articles.map((article) => ({
      ...article,
      storedDate: today,
    }));

    // Check for duplicates before inserting or updating
    await Promise.all(
      articles.map(async (article) => {
        try {
          const existingArticle = await Article.findOne({ url: article.url });

          if (existingArticle) {
            // Update the article if it already exists
            await Article.updateOne({ url: article.url }, article);
            console.log(`Updated article with URL: ${article.url}`);
          } else {
            // Create a new article if it doesn't exist
            await Article.create(article);
            console.log(`Created new article with URL: ${article.url}`);
          }
        } catch (dbError) {
          console.error(
            `Error saving article with URL ${article.url}:`,
            dbError
          );
        }
      })
    );

    console.log("Articles stored successfully in MongoDB");
  } catch (error) {
    console.error("Error fetching or storing articles:", error);
    throw new Error("Failed to fetch or store articles");
  }
};

export async function GET(req) {
  try {
    await fetchAndStoreNews();

    const response = NextResponse.json({ message: "News fetched and stored" });
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Expires", "0");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Surrogate-Control", "no-store");

    return response;
  } catch (error) {
    const response = NextResponse.json(
      { error: "Error fetching news" },
      { status: 500 }
    );
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Expires", "0");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Surrogate-Control", "no-store");

    return response;
  }
}
