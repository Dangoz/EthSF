import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
  pinataGateway: "aqua-blank-cuckoo-456.mypinata.cloud",
});

export const getIPFSUrl = (hash: string) => {
  return `https://aqua-blank-cuckoo-456.mypinata.cloud/ipfs/${hash}`
}

export const uploadImageToIPFS = async (imageBlob: Blob) => {
  const file = new File([imageBlob], "image.png", { type: "image/png" });
  const res = await pinata.upload.file(file);
  return res.cid;
}

export const uploadVideoToIPFS = async (videoBlob: Blob) => {
  const file = new File([videoBlob], "video.mp4", { type: "video/mp4" });
  const res = await pinata.upload.file(file);
  return res;
}

// using pinata sdk, upload json to ipfs
export const uploadJSONToIPFS = async (json: any) => {
  const res = await pinata.upload.json(json);
  return res;
}
