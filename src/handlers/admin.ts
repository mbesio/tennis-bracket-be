import prisma from "../server/db"

export const isAdmin = async (req, res, next) => {
  console.log('Here is where I will check if the user is an admin')
  next()
  // if it is not Admin, then here it should return an let the user know they are trying to perform an unauthorized action
}

export const getTournaments = async (req, res) => {
  const tournaments = await prisma.tournament.findMany()
  res.json({data: tournaments})
}

export const getTournamentsYear = async (req, res) => {
  const tournamentsYear = await prisma.tournamentYear.findMany()
  res.json({data: tournamentsYear})
}

export const addTournament = async (req, res ) => {
  const {name, logo} = req.body
  const tournament = await prisma.tournament.create({
    data: {
      name,
      logo,
     }
  })
  res.json({data: tournament})
}

export const addTournamentYear = async (req, res) => {
  const {id, year} = req.params
  const {startDate} = req.body




  const tournamentYear = await prisma.tournamentYear.create({
    data: {
      year: parseInt(year),
      tournamentId: id,
      startDate: new Date(startDate).toISOString()
      ,
    }
  })
  res.json({data: tournamentYear})
}

export const addDrawPlayers = async (req, res) => {
  const {id, year} = req.params
  const { isDrawOut,
    playersFirstQuarter,
    playersSecondQuarter,
    playersThirdQuarter,
    playersFourthQuarter
  } = req.body
  const updateDrawPlayer = await prisma.tournamentYear.update({
    where: {
      tournamentYearId: {
        year: parseInt(year),
        tournamentId: id
      }
    },
    data: {
      isDrawOut,
      playersFirstQuarter,
      playersSecondQuarter,
      playersThirdQuarter,
      playersFourthQuarter,
    }
  })
  res.json({data: updateDrawPlayer})
}

export const addResults = async (req, res) => {
  const {id, year} = req.params
  const {semifinalistFirstQuarter,
    semifinalistSecondQuarter,
    semifinalistThirdQuarter,
    semifinalistFourthQuarter,
    finalistTopHalf,
    finalistBottomHalf,
    winner
  } = req.body
  const getResults = await prisma.tournamentYear.findUnique({
    where: {
      tournamentYearId: {
        year: parseInt(year),
        tournamentId: id
      }
    }
  })

  const updateResults = await prisma.tournamentYear.update({
    where: {
      tournamentYearId: {
        year: parseInt(year),
        tournamentId: id
      }
    },
    data: {
      semifinalistFirstQuarter: getResults.semifinalistFirstQuarter || semifinalistFirstQuarter,
      semifinalistSecondQuarter: getResults.semifinalistSecondQuarter || semifinalistSecondQuarter,
      semifinalistThirdQuarter: getResults.semifinalistThirdQuarter || semifinalistThirdQuarter,
      semifinalistFourthQuarter: getResults.semifinalistFourthQuarter || semifinalistFourthQuarter,
      finalistTopHalf: getResults.finalistTopHalf || finalistTopHalf,
      finalistBottomHalf: getResults.finalistBottomHalf || finalistBottomHalf,
      winner: getResults.winner || winner
    }
  })
  res.json({data: updateResults})
}

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany()
  res.json({data: users})
}