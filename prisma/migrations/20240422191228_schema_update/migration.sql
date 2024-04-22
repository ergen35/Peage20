-- DropForeignKey
ALTER TABLE "PassPoint" DROP CONSTRAINT "PassPoint_passStationId_fkey";

-- DropForeignKey
ALTER TABLE "UsageRecord" DROP CONSTRAINT "UsageRecord_passCardId_fkey";

-- AlterTable
ALTER TABLE "PassPoint" ADD COLUMN     "geoAddress" TEXT;

-- AlterTable
ALTER TABLE "UsageRecord" ALTER COLUMN "passCardId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "accountBalance" SET DEFAULT 0.0,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "lastAccessDate" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PassPoint" ADD CONSTRAINT "PassPoint_passStationId_fkey" FOREIGN KEY ("passStationId") REFERENCES "PassStation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsageRecord" ADD CONSTRAINT "UsageRecord_passCardId_fkey" FOREIGN KEY ("passCardId") REFERENCES "PassCard"("cardID") ON DELETE RESTRICT ON UPDATE CASCADE;
