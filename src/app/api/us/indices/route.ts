import { NextResponse } from "next/server";
import { indexQuotes } from "@/lib/mock-data";
export async function GET() { return NextResponse.json(indexQuotes); }
