import { uploadImageToIPFS } from "@/lib/pinata"
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { readAllReviews } from "@/model/review";

export const GET = async (req: NextRequest) => {
  try {

    const reviews = await readAllReviews()

    return NextResponse.json(reviews, { status: 200 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Failed to upload media to IPFS" }, { status: 500 })
  }
}
