// File: /app/middleware.js

import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  console.log("Token in middleware:", token); // Debugging line

  // If token is not present, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verify token
    verify(token, process.env.JWT_SECRET);
    // Token is valid, proceed to the requested route
    return NextResponse.next();
  } catch (error) {
    console.error("Token verification failed:", error);
    // Invalid token, redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
