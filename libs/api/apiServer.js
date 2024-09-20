// File: libs/apiServer.js

import axios from "axios";

// Create a basic axios instance for server-side usage
const apiServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api", // Use environment variable or default to "/api"
});

// Add a request interceptor to attach token if available
apiServer.interceptors.request.use(
  (config) => {
    const token = process.env.SERVER_API_TOKEN || ""; // Use env vars or other secure server token storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Server-side response interceptor (no toast or client-side logic)
apiServer.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error("Server-side API error:", error.message || error.toString());
    return Promise.reject(error);
  }
);

// Function to fetch games from the database
export async function fetchGamesFromDatabase() {
  try {
    const response = await apiServer.get("/getGamesData", {
      headers: {
        'Cache-Control': 'no-store'
      }
    }); // Adjust endpoint as needed
    return response.games; // Assuming the API response structure is { games: [...] }
  } catch (error) {
    console.error("Error fetching games from the database:", error);
    throw error;
  }
}

export async function fetchArticlesFromDatabase() {
  try {
    const response = await apiClient.get(`/api/articles`, {
      headers: {
        'Cache-Control': 'no-store'
      }
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export default apiServer;
