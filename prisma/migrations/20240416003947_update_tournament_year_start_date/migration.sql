/*
  Warnings:

  - Added the required column `startDate` to the `TournamentYear` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TournamentYear" ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;
