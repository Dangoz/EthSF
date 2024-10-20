-- CreateTable
CREATE TABLE "Guide" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IPA" (
    "ipAssetId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "license" TEXT,
    "ipfsUrl" TEXT,
    "guideId" TEXT NOT NULL,

    CONSTRAINT "IPA_pkey" PRIMARY KEY ("ipAssetId")
);

-- AddForeignKey
ALTER TABLE "IPA" ADD CONSTRAINT "IPA_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
