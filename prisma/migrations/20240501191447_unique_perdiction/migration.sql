/*
  Warnings:

  - A unique constraint covering the columns `[tournamentYearId,userId]` on the table `Prediction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Prediction_tournamentYearId_userId_key" ON "Prediction"("tournamentYearId", "userId");
