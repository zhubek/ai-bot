import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "ai-bot",
    timestamp: new Date().toISOString(),
  });
}
