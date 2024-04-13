/*
  Warnings:

  - You are about to drop the column `tournamentId` on the `Prediction` table. All the data in the column will be lost.
  - You are about to drop the column `finalistBottomHalf` on the `Tournament` table. All the data in the column will be lost.
  - You are about to drop the column `finalistTopHalf` on the `Tournament` table. All the data in the column will be lost.
  - You are about to drop the column `isDrawOut` on the `Tournament` table. All the data in the column will be lost.
  - You are about to drop the column `playersFirstQuarter` on the `Tournament` table. All the data in the column will be lost.
  - You are about to drop the column `playersFourthQuarter` on the `Tournament` table. All the data in the column will be lost.
  - You are about to drop the column `playersSecondQuarter` on the `Tournament` table. All the data in the column will be lost.
  - You are about to drop the column `playersThirdQuarter` on the `Tournament` table. All the data in the column will be lost.
  - You are about to drop the column `semifinalistFirstQuarter` on the `Tournament` table. All the data in the column will be lost.
  - You are about to drop the column `semifinalistFourthQuarter` on the `Tournament` table. All the data in the column will be lost.
  - You are about to drop the column `semifinalistSecondQuarter` on the `Tournament` table. All the data in the column will be lost.
  - You are about to drop the column `semifinalistThirdQuarter` on the `Tournament` table. All the data in the column will be lost.
  - You are about to drop the column `winner` on the `Tournament` table. All the data in the column will be lost.
  - Added the required column `tournamentYearId` to the `Prediction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Prediction" DROP CONSTRAINT "Prediction_tournamentId_fkey";

-- AlterTable
ALTER TABLE "Prediction" DROP COLUMN "tournamentId",
ADD COLUMN     "tournamentYearId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tournament" DROP COLUMN "finalistBottomHalf",
DROP COLUMN "finalistTopHalf",
DROP COLUMN "isDrawOut",
DROP COLUMN "playersFirstQuarter",
DROP COLUMN "playersFourthQuarter",
DROP COLUMN "playersSecondQuarter",
DROP COLUMN "playersThirdQuarter",
DROP COLUMN "semifinalistFirstQuarter",
DROP COLUMN "semifinalistFourthQuarter",
DROP COLUMN "semifinalistSecondQuarter",
DROP COLUMN "semifinalistThirdQuarter",
DROP COLUMN "winner";

-- CreateTable
CREATE TABLE "TournamentYear" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "isDrawOut" BOOLEAN NOT NULL,
    "playersFirstQuarter" TEXT[],
    "playersSecondQuarter" TEXT[],
    "playersThirdQuarter" TEXT[],
    "playersFourthQuarter" TEXT[],
    "semifinalistFirstQuarter" TEXT,
    "semifinalistSecondQuarter" TEXT,
    "semifinalistThirdQuarter" TEXT,
    "semifinalistFourthQuarter" TEXT,
    "finalistTopHalf" TEXT,
    "finalistBottomHalf" TEXT,
    "winner" TEXT,
    "tournamentId" TEXT NOT NULL,

    CONSTRAINT "TournamentYear_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TournamentYear" ADD CONSTRAINT "TournamentYear_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_tournamentYearId_fkey" FOREIGN KEY ("tournamentYearId") REFERENCES "TournamentYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
