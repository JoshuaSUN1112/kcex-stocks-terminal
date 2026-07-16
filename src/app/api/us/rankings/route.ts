import { NextRequest, NextResponse } from "next/server";
import { rankings } from "@/lib/mock-data";
export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type") ?? "gainers";
  const data = rankings[type as keyof typeof rankings] ?? rankings.gainers;
  return NextResponse.json(data);
}
