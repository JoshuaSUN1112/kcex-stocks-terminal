import { NextRequest, NextResponse } from "next/server";
import { metricsRows } from "@/lib/mock-data";
export async function GET(request: NextRequest) {
  const symbols = (request.nextUrl.searchParams.get("symbols") ?? "AAPL,GOOGL,AMZN,MSFT").split(",").map((item) => item.trim()).filter(Boolean);
  return NextResponse.json(metricsRows(symbols.slice(0, 6)));
}
