import prisma from '../server/db'

export const getTournaments = async (req, res) => {
  try {
    const tournaments = await prisma.tournament.findMany()
    res.status(200).json({ data: tournaments })
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the DB' })
  }
}

export const addTournament = async (req, res) => {
  try {
    const { name, logo } = req.body
    const tournament = await prisma.tournament.create({
      data: {
        name,
        logo,
      },
    })
    res.status(201).json({ data: tournament })
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the DB' })
  }
}

export const getTournament = async (req, res) => {
  try {
    const { id } = req.params
    const tournament = await prisma.tournamentYear.findUnique({
      where: {
        id: id,
      },
    })
    res.status(200).json({ data: tournament })
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the DB' })
  }
}

export const deleteTournament = async (req, res) => {
  try {
    const { id } = req.params
    const tournament = await prisma.tournament.delete({
      where: {
        id: id,
      },
    })
    res.status(200).json({ data: tournament })
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the DB' })
  }
}

export const getAllTournamentsYear = async (req, res) => {
  try {
    const tournamentsYear = await prisma.tournamentYear.findMany()
    res.status(200).json({ data: tournamentsYear })
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the DB' })
  }
}

export const getTournamentsYear = async (req, res) => {
  try {
    const tournamentsYear = await prisma.tournamentYear.findMany()
    const tournamentsWithNameAndLogo = await Promise.all(
      tournamentsYear.map(async (tournamentYear) => {
        const tournament = await prisma.tournament.findUnique({
          where: {
            id: tournamentYear.tournamentId,
          },
        })
        return {
          // ...tournamentYear,
          id: tournamentYear.id,
          tournamentId: tournamentYear.tournamentId,
          startDate: tournamentYear.startDate,
          name: tournament.name,
          logo: tournament.logo,
        }
      })
    )
    res.status(200).json({ data: tournamentsWithNameAndLogo })
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the DB' })
  }
}

export const addTournamentYear = async (req, res) => {
  try {
    const { id, year } = req.params
    const { startDate } = req.body

    const tournamentYear = await prisma.tournamentYear.create({
      data: {
        year: parseInt(year),
        tournamentId: id,
        startDate: new Date(startDate).toISOString(),
      },
    })
    res.status(201).json({ data: tournamentYear })
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the DB' })
  }
}

export const addDrawPlayers = async (req, res) => {
  try {
    const { id } = req.params
    const {
      playersFirstQuarter,
      playersSecondQuarter,
      playersThirdQuarter,
      playersFourthQuarter,
    } = req.body

    const getDrawPlayers = await prisma.tournamentYear.findUnique({
      where: {
        id,
      },
    })

    const updateDrawPlayer = await prisma.tournamentYear.update({
      where: {
        id,
      },
      data: {
        // TO DO: isDrawOut needs to be fixed
        // isDrawOut: true,
        playersFirstQuarter: playersFirstQuarter
          ? playersFirstQuarter.map((player) => JSON.stringify(player))
          : getDrawPlayers.playersFirstQuarter,
        playersSecondQuarter: playersSecondQuarter
          ? playersSecondQuarter.map((player) => JSON.stringify(player))
          : getDrawPlayers.playersSecondQuarter,
        playersThirdQuarter: playersThirdQuarter
          ? playersThirdQuarter.map((player) => JSON.stringify(player))
          : getDrawPlayers.playersThirdQuarter,
        playersFourthQuarter: playersFourthQuarter
          ? playersFourthQuarter.map((player) => JSON.stringify(player))
          : getDrawPlayers.playersFourthQuarter,
      },
    })
    res.status(201).json({ data: updateDrawPlayer })
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the DB' })
  }
}

export const addResults = async (req, res) => {
  try {
    const { id } = req.params
    const {
      semifinalistFirstQuarter,
      semifinalistSecondQuarter,
      semifinalistThirdQuarter,
      semifinalistFourthQuarter,
      finalistTopHalf,
      finalistBottomHalf,
      winner,
    } = req.body
    const getResults = await prisma.tournamentYear.findUnique({
      where: {
        id,
      },
    })

    const updateResults = await prisma.tournamentYear.update({
      where: {
        id,
      },
      data: {
        // semifinalistFirstQuarter,
        // semifinalistSecondQuarter,
        // semifinalistThirdQuarter,
        // semifinalistFourthQuarter,
        // finalistTopHalf,
        // finalistBottomHalf,
        // winner,
        semifinalistFirstQuarter: JSON.stringify(semifinalistFirstQuarter),
        semifinalistSecondQuarter: JSON.stringify(semifinalistSecondQuarter),
        semifinalistThirdQuarter: JSON.stringify(semifinalistThirdQuarter),
        semifinalistFourthQuarter: JSON.stringify(semifinalistFourthQuarter),
        finalistTopHalf: JSON.stringify(finalistTopHalf),
        finalistBottomHalf: JSON.stringify(finalistBottomHalf),
        winner: JSON.stringify(winner),
      },
    })
    res.status(201).json({ data: updateResults })
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the DB' })
  }
}

export const setDrawIsOpen = async (req, res) => {
  try {
    const { id } = req.params
    const updateDrawIsOpen = await prisma.tournamentYear.update({
      where: {
        id,
      },
      data: {
        isDrawOut: true,
      },
    })
    res.status(201).json({ data: updateDrawIsOpen })
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the DB' })
  }
}

export const setPredictionIsClosed = async (req, res) => {
  try {
    const { id } = req.params
    const updatePredictionIsClosed = await prisma.tournamentYear.update({
      where: {
        id,
      },
      data: {
        isPredictionClosed: true,
      },
    })
    res.status(201).json({ data: updatePredictionIsClosed })
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the DB' })
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.status(200).json({ data: users })
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the DB' })
  }
}

export const getPredictions = async (req, res) => {
  try {
    const predictions = await prisma.prediction.findMany()
    res.status(200).json({ data: predictions })
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the DB' })
  }
}

export const setAdminUser = async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: req.body.id,
      },
      data: {
        isAdmin: true,
      },
    })
    res.status(201).json({ data: user })
  } catch (error) {
    res.status(500).json({ error: 'Error connecting to the DB' })
  }
}
