-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarUrl" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tournament" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
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

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prediction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "predictionFirstQuarterSemiFinalist" TEXT NOT NULL,
    "predictionSecondQuarterSemiFinalist" TEXT NOT NULL,
    "predictionThirdQuarterSemiFinalist" TEXT NOT NULL,
    "predictionFourthQuarterSemiFinalist" TEXT NOT NULL,
    "predictionTopHalfFinalist" TEXT NOT NULL,
    "predictionBottomHalfFinalist" TEXT NOT NULL,
    "predictionWinner" TEXT NOT NULL,

    CONSTRAINT "Prediction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tournament_name_key" ON "Tournament"("name");

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
