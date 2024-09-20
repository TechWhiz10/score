// File: /app/api/apiUtils.js

import apiClient from "@/libs/api/apiClient";

export const getUsersCount = async () => {
  try {
    const response = await apiClient.get("/userCount");
    const count = response.count; // Correctly accessing the 'count' field
    return count;
  } catch (error) {
    console.error("Error fetching user count:", error);
    return 0;
  }
};
