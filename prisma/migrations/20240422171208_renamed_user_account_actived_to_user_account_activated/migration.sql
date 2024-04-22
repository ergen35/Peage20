/*
  Warnings:

  - You are about to drop the column `accountActived` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "accountActived",
ADD COLUMN     "accountActivated" BOOLEAN NOT NULL DEFAULT false;
