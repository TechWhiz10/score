// File: app/api/news/route.js

import { NextResponse } from "next/server";
import axios from "axios";

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = "https://newsapi.org/v2/top-headlines";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

let cachedNews = {
  data: null,
  lastFetched: 0,
};

async function fetchNewsData() {
  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        apiKey: NEWS_API_KEY,
        country: "us",
        category: "sports",
      },
    });

    cachedNews.data = response.data.articles.map((article) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      source: article.source.name,
      publishedAt: article.publishedAt,
    }));

    cachedNews.lastFetched = Date.now();
    console.log("Fetched and cached news data:", cachedNews.data.length);

    return cachedNews.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error("Failed to fetch news");
  }
}

export async function GET() {
  const now = Date.now();
  const cacheExpired = now - cachedNews.lastFetched > CACHE_DURATION;

  if (cacheExpired || !cachedNews.data) {
    try {
      const data = await fetchNewsData();
      return NextResponse.json({ articles: data });
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch news" },
        { status: 500 }
      );
    }
  } else {
    console.log("Serving cached news data");
    return NextResponse.json({ articles: cachedNews.data });
  }
}
