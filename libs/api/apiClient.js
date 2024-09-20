// File: libs/apiClient.js

import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation"; // Only in Client Components

// Create axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api", // Use environment variable or default to "/api"
});

// Add a request interceptor to attach token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1]; // Get token from cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for client-side use (with toast and router support)
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let message = "";

    if (error.response?.status === 401) {
      // Client-side: Show toast and handle redirection
      toast.error("Please login");
      const router = useRouter(); // Router for redirection
      router.push("/login");
    } else if (error.response?.status === 403) {
      // Client-side: Show unauthorized toast message
      message = "Pick a plan to use this feature";
      toast.error(message);
    } else {
      message =
        error?.response?.data?.error || error.message || error.toString();
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
