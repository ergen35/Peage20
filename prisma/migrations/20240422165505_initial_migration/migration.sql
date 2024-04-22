-- CreateEnum
CREATE TYPE "PassDirection" AS ENUM ('Going', 'Returning');

-- CreateEnum
CREATE TYPE "OpStatus" AS ENUM ('NoStatus', 'Pending', 'Rejected', 'Accepted');

-- CreateTable
CREATE TABLE "AppSettings" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "AppSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "extraSecret" TEXT NOT NULL,
    "accountBalance" DOUBLE PRECISION NOT NULL,
    "registrationDate" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "accountActived" BOOLEAN NOT NULL DEFAULT false,
    "lastAccessDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppUserSession" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "AppUserSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardRequest" (
    "id" SERIAL NOT NULL,
    "requestMakerId" INTEGER NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL,
    "requestStatus" "OpStatus" NOT NULL DEFAULT 'NoStatus',
    "requestTicket" TEXT NOT NULL,

    CONSTRAINT "CardRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionOperation" (
    "id" SERIAL NOT NULL,
    "transactionId" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "initiatedOn" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "transactionActorId" INTEGER NOT NULL,
    "status" "OpStatus" NOT NULL DEFAULT 'NoStatus',

    CONSTRAINT "TransactionOperation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PassStation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PassStation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PassPoint" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passDirection" "PassDirection" NOT NULL DEFAULT 'Going',
    "passStationId" TEXT NOT NULL,

    CONSTRAINT "PassPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsageRecord" (
    "id" SERIAL NOT NULL,
    "usageDate" TIMESTAMP(3) NOT NULL,
    "paidAmount" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "passPointId" TEXT NOT NULL,
    "passCardId" INTEGER NOT NULL,

    CONSTRAINT "UsageRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PassCard" (
    "id" SERIAL NOT NULL,
    "cardID" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,
    "isActivated" BOOLEAN NOT NULL DEFAULT false,
    "cardOwnerId" INTEGER NOT NULL,

    CONSTRAINT "PassCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PassAgent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "lastAccessDate" TIMESTAMP(3) NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "registeredBy" TEXT NOT NULL,

    CONSTRAINT "PassAgent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "AppUserSession_userId_key" ON "AppUserSession"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AppUserSession_hash_key" ON "AppUserSession"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "CardRequest_requestMakerId_key" ON "CardRequest"("requestMakerId");

-- CreateIndex
CREATE UNIQUE INDEX "CardRequest_requestTicket_key" ON "CardRequest"("requestTicket");

-- CreateIndex
CREATE UNIQUE INDEX "PassCard_cardID_key" ON "PassCard"("cardID");

-- CreateIndex
CREATE UNIQUE INDEX "PassCard_cardOwnerId_key" ON "PassCard"("cardOwnerId");

-- CreateIndex
CREATE UNIQUE INDEX "PassAgent_username_key" ON "PassAgent"("username");

-- CreateIndex
CREATE UNIQUE INDEX "PassAgent_phoneNumber_key" ON "PassAgent"("phoneNumber");

-- AddForeignKey
ALTER TABLE "AppUserSession" ADD CONSTRAINT "AppUserSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardRequest" ADD CONSTRAINT "CardRequest_requestMakerId_fkey" FOREIGN KEY ("requestMakerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionOperation" ADD CONSTRAINT "TransactionOperation_transactionActorId_fkey" FOREIGN KEY ("transactionActorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PassPoint" ADD CONSTRAINT "PassPoint_passStationId_fkey" FOREIGN KEY ("passStationId") REFERENCES "PassStation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsageRecord" ADD CONSTRAINT "UsageRecord_passPointId_fkey" FOREIGN KEY ("passPointId") REFERENCES "PassPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsageRecord" ADD CONSTRAINT "UsageRecord_passCardId_fkey" FOREIGN KEY ("passCardId") REFERENCES "PassCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PassCard" ADD CONSTRAINT "PassCard_cardOwnerId_fkey" FOREIGN KEY ("cardOwnerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
