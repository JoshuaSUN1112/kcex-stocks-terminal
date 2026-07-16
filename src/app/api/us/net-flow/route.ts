import { NextResponse } from "next/server";
import { netFlow } from "@/lib/mock-data";
export async function GET() { return NextResponse.json(netFlow); }
