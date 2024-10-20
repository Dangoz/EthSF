import { IpMetadata, StoryClient } from "@story-protocol/core-sdk";
import { uploadJSONToIPFS, getIPFSUrl } from "../pinata";
import CryptoJS from "crypto-js";

export async function generateIpMetadata(
  client: StoryClient,
  mediaUrl: string,
  title: string,
  description: string
) {
  const ipMetadata: IpMetadata = client.ipAsset.generateIpMetadata({
    title,
    description,
    attributes: [
      {
        key: "",
        value: "",
      },
    ],
  });

  const nftMetadata = {
    name: title,
    description,
    image: mediaUrl,
  };

  const ipIpfsHash = await uploadJSONToIPFS(ipMetadata);
  const ipHash = CryptoJS.SHA256(JSON.stringify(ipMetadata)).toString();
  const nftIpfsHash = await uploadJSONToIPFS(nftMetadata);
  const nftHash = CryptoJS.SHA256(JSON.stringify(nftMetadata)).toString();

  return {
    ipMetadataURI: getIPFSUrl(ipIpfsHash),
    ipMetadataHash: `0x${ipHash}` as `0x${string}`,
    nftMetadataURI: getIPFSUrl(nftIpfsHash),
    nftMetadataHash: `0x${nftHash}` as `0x${string}`,
  };
}
