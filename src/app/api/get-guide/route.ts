import { NextRequest, NextResponse } from "next/server";
import { readAllGuides } from "@/model/guide";

export const GET = async (req: NextRequest) => {
  try {
    const guides = await readAllGuides()
    return NextResponse.json(guides, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to get guides" }, { status: 500 })
  }
}