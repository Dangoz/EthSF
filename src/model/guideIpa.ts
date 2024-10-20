import prisma from "./prisma";

export const createGuideIpa = async ({ guideId, ipaId }: { guideId: string, ipaId: string }) => {
  const guideIpa = await prisma.guideIPA.create({
    data: { guideId, ipaId }
  })
  return guideIpa
}