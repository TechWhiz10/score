// File: /app/api/activate-subscription/route.js

import { connectToMongoDB } from "@/libs/dbConfig";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await connectToMongoDB();

    const { plan } = await req.json();
    const { id } = decoded; // Get user ID from the decoded token

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const additionalHours = plan === "weekly" ? 168 : 672;
    const subscriptionEndTime = new Date(
      user.subscriptionEndTime || user.trialEndTime
    );
    subscriptionEndTime.setHours(
      subscriptionEndTime.getHours() + additionalHours
    );

    user.isSubscriptionActivated = true;
    user.subscriptionEndTime = subscriptionEndTime;

    // Update user status based on the plan
    user.userStatus = plan === "weekly" ? "basic" : "premium";

    // Credit referrer if any and user status is 'basic' or 'premium'
    if (
      user.referredBy &&
      (user.userStatus === "basic" || user.userStatus === "premium")
    ) {
      const referrer = await User.findById(user.referredBy);
      if (referrer) {
        referrer.referralCredits = (referrer.referralCredits || 0) + 1; // Increment referral credits by 1
        await referrer.save();
      }
    }

    await user.save();
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
