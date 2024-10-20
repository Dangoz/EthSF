import prisma from "./prisma";

export const addReview = async ({
  title,
  description,
  license,
  ipfsUrl,
  ipAssetId
}: {
  title: string, description: string, license: string, ipfsUrl: string, ipAssetId: string
}) => {
  const review = await prisma.iPA.create({
    data: {
      ipAssetId,
      title,
      description,
      license,
      ipfsUrl,
    }
  })
  return review
}