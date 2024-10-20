/*
  Warnings:

  - The primary key for the `Guide` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Guide` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Guide` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Guide` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Guide` table. All the data in the column will be lost.
  - Added the required column `ipAssetId` to the `Guide` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Guide` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GuideIPA" DROP CONSTRAINT "GuideIPA_guideId_fkey";

-- AlterTable
ALTER TABLE "Guide" DROP CONSTRAINT "Guide_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "updatedAt",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "ipAssetId" TEXT NOT NULL,
ADD COLUMN     "ipfsUrl" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD CONSTRAINT "Guide_pkey" PRIMARY KEY ("ipAssetId");

-- AddForeignKey
ALTER TABLE "GuideIPA" ADD CONSTRAINT "GuideIPA_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide"("ipAssetId") ON DELETE RESTRICT ON UPDATE CASCADE;
