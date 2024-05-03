import prisma from '../server/db'

export const getOpenPredictions = async (req, res) => {
  const openPredictions = await prisma.tournamentYear.findMany({
    where: {
      isDrawOut: true,
      isPredictionClosed: false,
    },
  })
  res.json({ data: openPredictions })
}

export const makePrediction = async (req, res) => {
  const { id } = req.params
  const userId = req.user.id
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
    },
  })

  res.json({ data: prediction })
}

export const getPrediction = async (req, res) => {
  const { id } = req.params
  const userId = req.user.id
  const prediction = await prisma.prediction.findFirst({
    where: {
      userId,
      tournamentYearId: id,
    },
  })
  res.json({ data: prediction })
}

export const getPredictions = async (req, res) => {
  // const deletePred = await prisma.prediction.delete({
  //   where: {
  //     id: '5f549659-c0da-41f7-9ccb-e53cae1a3850'
  //   }
  // })
  // res.json({data: deletePred})

  const userId = req.user.id
  const predictions = await prisma.prediction.findMany({
    where: {
      userId,
    },
  })
  res.json({ data: predictions })
}

export const getCurrentPredictions = async (req, res) => {
  const currentPredictions = await prisma.tournamentYear.findMany({
    where: {
      isDrawOut: true,
      isPredictionClosed: true,
      winner: null,
    },
  })
  res.json({ data: currentPredictions })
}

export const getPastPredictions = async (req, res) => {
  const pastPredictions = await prisma.tournamentYear.findMany({
    where: {
      isDrawOut: true,
      isPredictionClosed: true,
      winner: {
        not: null,
      },
    },
  })
  res.json({ data: pastPredictions })
}

export const getUserTournaments = async (req, res) => {
  const tournamentsYear = await prisma.tournamentYear.findMany()
  const tournaments = await Promise.all(
    tournamentsYear.map(async (tournamentYear) => {
      const tournament = await prisma.tournament.findUnique({
        where: {
          id: tournamentYear.tournamentId,
        },
      })

      const winner = tournamentYear.winner
      const isDrawOut = tournamentYear.isDrawOut
      const isPredictionClosed = tournamentYear.isPredictionClosed

      // logic to determine status
      const status = winner
        ? 'Completed'
        : !isDrawOut
        ? 'Non started, no draw'
        : isPredictionClosed
        ? 'In progress'
        : 'Non started, draw out'

      return {
        // ...tournamentYear,
        id: tournamentYear.id,
        tournamentId: tournamentYear.tournamentId,
        startDate: tournamentYear.startDate,
        name: tournament.name,
        logo: tournament.logo,
        status: status,
      }
    })
  )
  res.json({
    data: tournaments.sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    ),
  })
}

export const getTournamentPlayers = async (req, res) => {
  const { id } = req.params
  const tournamentYear = await prisma.tournamentYear.findUnique({
    where: {
      id: id,
    },
  })
  const players = {
    playersFirstQuarter: tournamentYear.playersFirstQuarter,
    playersSecondQuarter: tournamentYear.playersSecondQuarter,
    playersThirdQuarter: tournamentYear.playersThirdQuarter,
    playersFourthQuarter: tournamentYear.playersFourthQuarter,
  }

  res.json({ data: players })
}

export const getTournamentResults = async (req, res) => {
  const { id } = req.params
  const results = await prisma.tournamentYear.findUnique({
    where: {
      id,
    },
  })
  res.json({ data: results })
}

export const getAdmin = async (req, res) => {
  if (!req.user) {
    res.json({ data: false })
  } else {
    const id = req.user.id
    const me = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    res.json({ data: me.isAdmin })
  }
}

export const getMe = async (req, res) => {
  console.log('req.user in getMe', req.user)
  if (!req.user) {
    res.json({ data: {} })
  } else {
    const id = req.user.id
    const me = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    res.json({ data: me })
  }
}
