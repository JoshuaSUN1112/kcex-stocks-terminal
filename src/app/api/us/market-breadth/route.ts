import { NextResponse } from "next/server";
import { marketBreadth } from "@/lib/mock-data";
export async function GET() { return NextResponse.json(marketBreadth); }
