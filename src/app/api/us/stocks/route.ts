import { NextRequest, NextResponse } from "next/server";
import { filterStocks } from "@/lib/mock-data";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = Number(searchParams.get("limit") ?? 300);
  const sortBy = searchParams.get("sortBy");
  const order = searchParams.get("order") === "asc" ? "asc" : "desc";
  let rows = filterStocks({
    q: searchParams.get("q") ?? undefined,
    sector: searchParams.get("sector") ?? undefined,
    index: searchParams.get("index") ?? undefined,
    marketCap: searchParams.get("marketCap") ?? undefined,
    performance: searchParams.get("performance") ?? undefined,
    volume: searchParams.get("volume") ?? undefined,
  });
  if (sortBy) {
    rows = [...rows].sort((a, b) => {
      const av = a[sortBy as keyof typeof a];
      const bv = b[sortBy as keyof typeof b];
      if (typeof av === "number" && typeof bv === "number") return order === "asc" ? av - bv : bv - av;
      return order === "asc" ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
  }
  return NextResponse.json({ rows: rows.slice(0, limit), total: rows.length });
}
