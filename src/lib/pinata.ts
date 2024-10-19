import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: "aqua-blank-cuckoo-456.mypinata.cloud",
});

// export async function uploadFileToIpfs(imageBlob: Blob) {
//   // First pin the image
//   const data = new FormData();
//   data.append("file", imageBlob);
//   const pinFileRes = await fetch(
//     "https://api.pinata.cloud/pinning/pinFileToIPFS",
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.PINATA_JWT}`,
//       },
//       body: data,
//     }
//   );
//   const { IpfsHash: ImageIpfsHash } = await pinFileRes.json();
//   return ImageIpfsHash;
// }

export const uploadImageToIPFS = async (imageBlob: Blob) => {
  const file = new File([imageBlob], "image.png", { type: "image/png" });
  const res = await pinata.upload.file(file);
  return res;
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
