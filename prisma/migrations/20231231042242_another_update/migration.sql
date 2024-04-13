-- AlterTable
ALTER TABLE "TournamentYear" ALTER COLUMN "isDrawOut" SET DEFAULT false,
ALTER COLUMN "playersFirstQuarter" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "playersSecondQuarter" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "playersThirdQuarter" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "playersFourthQuarter" SET DEFAULT ARRAY[]::TEXT[];
