import { uploadImageToIPFS } from "@/lib/pinata"
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export const GET = async (req: NextRequest) => {
  try {
    // assuming image of type file is present in request
    
    // TODO Get Reviews here

    return NextResponse.json([
      
    ])

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Failed to upload media to IPFS" }, { status: 500 })
  }
}
