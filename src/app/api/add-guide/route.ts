import { NextRequest, NextResponse } from "next/server";
import { createGuide } from "@/model/guide";

export const POST = async (req: NextRequest) => {
  try {
    const { ipAssetId, title, description, ipfsUrl } = await req.json()
    const guide = await createGuide(ipAssetId, title, description, ipfsUrl)
    return NextResponse.json({ guide }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to add guide' }, { status: 500 })
  }
}