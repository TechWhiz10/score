// File: /app/api/test/route.js
import { NextResponse } from "next/server";

export async function GET() {
  console.log("Test route hit!");

  // You can return a basic response to check if the route is working
  return new NextResponse(
    JSON.stringify({
      message: "Test route is working!",
      success: true,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    }
  );
}
