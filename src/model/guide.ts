import prisma from "./prisma";

export const createGuide = async (
  ipAssetId: string,
  title: string,
  description: string,
  ipfsUrl: string
) => {
  const newGuide = await prisma.guide.create({
    data: {
      ipAssetId,
      title,
      description,
      ipfsUrl
    }
  })
  return newGuide
}

export const readAllGuides = async () => {
  const guides = await prisma.guide.findMany()
  return guides
}