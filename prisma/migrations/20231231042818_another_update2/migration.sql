/*
  Warnings:

  - A unique constraint covering the columns `[tournamentId,year]` on the table `TournamentYear` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TournamentYear_tournamentId_year_key" ON "TournamentYear"("tournamentId", "year");
