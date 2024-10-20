import { uploadJSONToIPFS } from "@/lib/pinata"
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const json = await req.json()
    const jsonIpfsHash = await uploadJSONToIPFS(json)
    return NextResponse.json({ jsonIpfsHash })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Failed to upload JSON to IPFS" }, { status: 500 })
  }
}
