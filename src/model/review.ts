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

export const readReviewByIpAssetId = async (ipAssetId: string) => {
  const review = await prisma.iPA.findUnique({
    where: { ipAssetId }
  })
  return review
}

export const readAllReviews = async () => {
  const reviews = await prisma.iPA.findMany()
  return reviews
}