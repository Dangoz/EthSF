import { PinataSDK } from "pinata-web3";

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT!,
  pinataGateway: "aqua-blank-cuckoo-456.mypinata.cloud",
});

export const getIPFSUrl = (cid: string) => {
  return `https://aqua-blank-cuckoo-456.mypinata.cloud/ipfs/${cid}`;
  // return `https://aqua-blank-cuckoo-456.mypinata.cloud/files/${cid}?X-Algorithm=PINATA1&X-Date=1729396780&X-Expires=30&X-Method=GET&X-Signature=09aa4f6260536f5203a12d050f8749aea474ae114d1b613d3247ba9f6ccd46de`;
}

export const uploadImageToIPFS = async (imageBlob: Blob) => {
  const file = new File([imageBlob], "image.png", { type: "image/png" });
  const res = await pinata.upload.file(file);
  return res.IpfsHash;
}

export const uploadVideoToIPFS = async (videoBlob: Blob) => {
  const file = new File([videoBlob], "video.mp4", { type: "video/mp4" });
  const res = await pinata.upload.file(file);
  return res.IpfsHash;
}

// using pinata sdk, upload json to ipfs
export const uploadJSONToIPFS = async (json: any) => {
  console.log("To Pinta:", json)
  const res = await pinata.upload.json(json);
  return res.IpfsHash;
}
