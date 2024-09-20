// File Name: app/dashboard/layout.js
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import config from "@/config";

// Helper function to verify JWT token
async function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

// This is a server-side component to ensure the user is logged in.
// If not, it will redirect to the login page.
// It's applied to all subpages of /dashboard in /app/dashboard/*** pages
export default async function LayoutPrivate({ children }) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.log("No token found, redirecting to login");
    redirect(config.auth.loginUrl); // Redirect to your login page
  }

  const user = await verifyToken(token);

  if (!user) {
    console.log("Token verification failed, redirecting to login");
    redirect(config.auth.loginUrl); // Redirect to your login page
  }

  return <>{children}</>;
}
