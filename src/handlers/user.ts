import prisma from '../server/db'

export const getOpenPredictions = async (req, res) => {
  try {
    const openPredictions = await prisma.tournamentYear.findMany({
      where: {
        isDrawOut: true,
        isPredictionClosed: false,
      },
    })
    res.status(200).json({ data: openPredictions })
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the DB' })
  }
}

export const makePrediction = async (req, res) => {
  try {
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
    res.status(201).json({ data: prediction })
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the DB' })
  }
}

export const getPrediction = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id
    const prediction = await prisma.prediction.findFirst({
      where: {
        userId,
        tournamentYearId: id,
      },
    })
    res.status(200).json({ data: prediction })
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the DB' })
  }
}

export const getPredictions = async (req, res) => {
  try {
    const userId = req.user.id
    const predictions = await prisma.prediction.findMany({
      where: {
        userId,
      },
    })
    res.status(200).json({ data: predictions })
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the DB' })
  }
}

export const getCurrentPredictions = async (req, res) => {
  try {
    const currentPredictions = await prisma.tournamentYear.findMany({
      where: {
        isDrawOut: true,
        isPredictionClosed: true,
        winner: null,
      },
    })
    res.status(200).json({ data: currentPredictions })
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the DB' })
  }
}

export const getPastPredictions = async (req, res) => {
  try {
    const pastPredictions = await prisma.tournamentYear.findMany({
      where: {
        isDrawOut: true,
        isPredictionClosed: true,
        winner: {
          not: null,
        },
      },
    })
    res.status(200).json({ data: pastPredictions })
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the DB' })
  }
}

export const getUserTournaments = async (req, res) => {
  try {
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
    res.status(200).json({
      data: tournaments.sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      ),
    })
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the DB' })
  }
}

export const getTournamentPlayers = async (req, res) => {
  try {
    const { id } = req.params
    const tournamentYear = await prisma.tournamentYear.findUnique({
      where: {
        id: id,
      },
    })
    const tournament = await prisma.tournament.findUnique({
      where: {
        id: tournamentYear.tournamentId,
      },
    })
    const players = {
      name: tournament.name,
      year: tournamentYear.year,
      playersFirstQuarter: tournamentYear.playersFirstQuarter,
      playersSecondQuarter: tournamentYear.playersSecondQuarter,
      playersThirdQuarter: tournamentYear.playersThirdQuarter,
      playersFourthQuarter: tournamentYear.playersFourthQuarter,
    }

    res.status(200).json({ data: players })
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the DB' })
  }
}

export const getTournamentResults = async (req, res) => {
  try {
    const { id } = req.params
    const results = await prisma.tournamentYear.findUnique({
      where: {
        id,
      },
    })

    const tournament = await prisma.tournament.findUnique({
      where: {
        id: results.tournamentId,
      },
    })

    res.status(200).json({ data: { ...results, name: tournament.name } })
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the DB' })
  }
}

export const getAdmin = async (req, res) => {
  try {
    if (!req.user) {
      res.json({ data: false })
    } else {
      const id = req.user.id
      const me = await prisma.user.findUnique({
        where: {
          id,
        },
      })
      res.status(200).json({ data: me.isAdmin })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the DB' })
  }
}

export const getMe = async (req, res) => {
  try {
    if (!req.user) {
      res.json({ data: {} })
    } else {
      const id = req.user.id
      const me = await prisma.user.findUnique({
        where: {
          id,
        },
      })
      res.status(200).json({ data: me })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the DB' })
  }
}
