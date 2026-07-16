import { NextResponse } from "next/server";
import { sectorHeatmap } from "@/lib/mock-data";
export async function GET() { return NextResponse.json(sectorHeatmap); }
