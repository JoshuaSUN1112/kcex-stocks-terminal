import { NextRequest, NextResponse } from "next/server";
import { compareSeries } from "@/lib/mock-data";
export async function GET(request: NextRequest) {
  const symbols = (request.nextUrl.searchParams.get("symbols") ?? "AAPL,MSFT,NVDA,AMZN").split(",").map((item) => item.trim()).filter(Boolean);
  return NextResponse.json(compareSeries(symbols.slice(0, 6)));
}
