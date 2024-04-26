import prisma from "../server/db"

export const getOpenPredictions = async (req, res ) => {
  console.log('req.user in getOpenPredictions', req.user)
  const openPredictions = await prisma.tournamentYear.findMany({
    where: {
      isDrawOut: true,
      isPredictionClosed: false
    }
  })
  res.json({data: openPredictions})
}

 export const makePrediction = async (req, res ) => {
  console.log('hi from makePrediciton')
  console.log('hi from makePrediciton - req.user', req.user)
  const {id} = req.params
  const userId = req.user.id
  console.log('req.user in makePrediction', userId)
  const {
    predictionFirstQuarterSemiFinalist,
    predictionSecondQuarterSemiFinalist,
    predictionThirdQuarterSemiFinalist,
    predictionFourthQuarterSemiFinalist,
    predictionTopHalfFinalist,
    predictionBottomHalfFinalist,
    predictionWinner,
  } = req.body

  const prediction = await prisma.prediction.create({
    data: {
      userId,
      tournamentYearId: id,
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

export const getCurrentPredictions = async (req, res ) => {
  const currentPredictions = await prisma.tournamentYear.findMany({
    where: {
      isDrawOut: true,
      isPredictionClosed: true,
      winner: null,
    }
  })
  res.json({data: currentPredictions})
}

export const getPastPredictions = async (req, res ) => {
  const pastPredictions = await prisma.tournamentYear.findMany({
    where: {
      isDrawOut: true,
      isPredictionClosed: true,
      winner: {
        not: null
      },
    }
  })
  res.json({data: pastPredictions})
}

export const getUserTournaments = async (req, res ) => {
  console.log('hi from getUserTournaments')
  console.log('req.user in getUserTournaments', req.user)

    const tournamentsYear = await prisma.tournamentYear.findMany()
    const tournaments = await Promise.all(tournamentsYear.map(async (tournamentYear) => {
      const tournament = await prisma.tournament.findUnique({
        where: {
          id: tournamentYear.tournamentId
        }
      })

      const winner = tournamentYear.winner
      const isDrawOut = tournamentYear.isDrawOut
      const isPredictionClosed = tournamentYear.isPredictionClosed

      // logic to determine status
      const status = winner ? 'Completed' :
                     !isDrawOut ? 'Non started, no draw' :
                     isPredictionClosed ? 'In progress' : 'Non started, draw out'

      return {
        // ...tournamentYear,
        id: tournamentYear.id,
        tournamentId: tournamentYear.tournamentId,
        startDate: tournamentYear.startDate,
        name: tournament.name,
        logo: tournament.logo,
        status: status,
      }

    }))
    res.json({data: tournaments.sort(
      (a,b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())})

}

export const getTournamentPlayers = async (req, res ) => {
  const {id} = req.params
  const tournamentYear = await prisma.tournamentYear.findUnique({
    where: {
      id: id
    }
  })
  const players = {
    playersFirstQuarter: tournamentYear.playersFirstQuarter,
    playersSecondQuarter: tournamentYear.playersSecondQuarter,
    playersThirdQuarter: tournamentYear.playersThirdQuarter,
    playersFourthQuarter: tournamentYear.playersFourthQuarter
  }

  res.json({data: players})
}