import { custom, toHex } from 'viem';
import { useIpAsset } from "@story-protocol/react-sdk";

// example of how you would now use the fully setup react sdk

export default async function TestComponent() {
  const { register } = useIpAsset();


  const handleRegister = async () => {
    const response = await register({
      nftContract: '0x01...',
      tokenId: '1',
      ipMetadata: {
        ipMetadataURI: "test-metadata-uri",
        ipMetadataHash: toHex("test-metadata-hash", { size: 32 }),
        nftMetadataURI: "test-nft-metadata-uri",
        nftMetadataHash: toHex("test-nft-metadata-hash", { size: 32 }),
      },
      txOptions: { waitForTransaction: true },
    });
    console.log(
      `Root IPA created at tx hash ${response.txHash}, IPA ID: ${response.ipId}`
    );
  }

  return (
    <div>

    </div>
  )
}