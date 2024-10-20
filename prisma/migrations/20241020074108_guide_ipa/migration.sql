/*
  Warnings:

  - You are about to drop the column `guideId` on the `IPA` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "IPA" DROP CONSTRAINT "IPA_guideId_fkey";

-- AlterTable
ALTER TABLE "IPA" DROP COLUMN "guideId";

-- CreateTable
CREATE TABLE "GuideIPA" (
    "guideId" TEXT NOT NULL,
    "ipaId" TEXT NOT NULL,

    CONSTRAINT "GuideIPA_pkey" PRIMARY KEY ("guideId","ipaId")
);

-- AddForeignKey
ALTER TABLE "GuideIPA" ADD CONSTRAINT "GuideIPA_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuideIPA" ADD CONSTRAINT "GuideIPA_ipaId_fkey" FOREIGN KEY ("ipaId") REFERENCES "IPA"("ipAssetId") ON DELETE RESTRICT ON UPDATE CASCADE;
