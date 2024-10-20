import prisma from "./prisma";

export const createGuide = async ({ name }: { name: string }) => {
  const guide = await prisma.guide.create({
    data: { name }
  })
  return guide
}

export const readAllGuides = async () => {
  const guides = await prisma.guide.findMany()
  return guides
}