import { NextResponse } from "next/server";

// Simple in-memory counter (resets on cold start)
// In production, connect to Upstash Redis
let totalVisits = 42300;
let todayVisits = 0;
let lastDate = new Date().toDateString();

export async function GET() {
  const today = new Date().toDateString();
  if (today !== lastDate) {
    lastDate = today;
    todayVisits = 0;
  }

  todayVisits++;
  totalVisits++;

  return NextResponse.json({
    today: todayVisits,
    total: totalVisits,
  });
}
