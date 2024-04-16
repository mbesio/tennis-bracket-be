import prisma from "../server/db"

export const getOpenPredictions = async (req, res ) => {
  const openPredictions = await prisma.tournamentYear.findMany({
    where: {
      isDrawOut: true,
      isPredictionClosed: false
    }
  })
  res.json({data: openPredictions})
}

 export const makePrediction = async (req, res ) => {
  const {id, year} = req.params
  const {
    userId,
    predictionFirstQuarterSemiFinalist,
    predictionSecondQuarterSemiFinalist,
    predictionThirdQuarterSemiFinalist,
    predictionFourthQuarterSemiFinalist,
    predictionTopHalfFinalist,
    predictionBottomHalfFinalist,
    predictionWinner,
  } = req.body

  const tournamentYear = await prisma.tournamentYear.findUnique({
    where: {
      tournamentYearId: {
        tournamentId: id,
        year: year
      }
    }
  })

  // TO DO: validate the prediction

  const prediction = await prisma.prediction.create({
    data: {
      userId,
      tournamentYearId: tournamentYear.tournamentId,
      predictionFirstQuarterSemiFinalist,
      predictionSecondQuarterSemiFinalist,
      predictionThirdQuarterSemiFinalist,
      predictionFourthQuarterSemiFinalist,
      predictionTopHalfFinalist,
      predictionBottomHalfFinalist,
      predictionWinner,
    }
  })

  res.json({data: prediction})
}

// TO DO
export const getCurrentPredictions = async (req, res ) => {
  const {name, logo} = req.body
  const tournament = await prisma.tournament.create({
    data: {
      name,
      logo,
     }
  })
  res.json({data: tournament})
}

// TO DO
export const getPastPredictions = async (req, res ) => {
  const {name, logo} = req.body
  const tournament = await prisma.tournament.create({
    data: {
      name,
      logo,
     }
  })
  res.json({data: tournament})
}