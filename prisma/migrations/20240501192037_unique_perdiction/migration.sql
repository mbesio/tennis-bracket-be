/*
  Warnings:

  - A unique constraint covering the columns `[userId,tournamentYearId]` on the table `Prediction` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Prediction_tournamentYearId_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Prediction_userId_tournamentYearId_key" ON "Prediction"("userId", "tournamentYearId");
