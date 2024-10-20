import { uploadImageToIPFS } from "@/lib/pinata"
import { NextRequest, NextResponse } from "next/server";
import { addReview } from "@/model/review";

export const POST = async (req: NextRequest) => {
  try {
    const { title, description, license, ipfsUrl, ipAssetId } = await req.json()
    const review = await addReview({ title, description, license: `${license}`, ipfsUrl, ipAssetId })
    return NextResponse.json({ review }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Failed to upload media to IPFS" }, { status: 500 })
  }
}
