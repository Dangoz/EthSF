import { uploadImageToIPFS } from "@/lib/pinata"
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export const POST = async (req: NextRequest) => {
  try {
    // assuming image of type file is present in request
    const formData = await req.formData()
    const image = formData.get('image') as File
    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    const imageIpfsHash = await uploadImageToIPFS(image)
    return NextResponse.json({ imageIpfsHash })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Failed to upload media to IPFS" }, { status: 500 })
  }
}
