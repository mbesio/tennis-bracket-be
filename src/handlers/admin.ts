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

export const deleteTournament = async (req, res) => {
  const {id} = req.params
  const tournament = await prisma.tournament.delete({
    where: {
      id: id
    }
  })
  res.json({data: tournament})
}

export const getAllTournamentsYear = async (req, res) => {
  const tournamentsYear = await prisma.tournamentYear.findMany()
  res.json({data: tournamentsYear})
}

export const getTournamentsYear = async (req, res) => {
  const tournamentsYear = await prisma.tournamentYear.findMany()
  const tournamentsWithNameAndLogo = await Promise.all(tournamentsYear.map(async (tournamentYear) => {
    const tournament = await prisma.tournament.findUnique({
      where: {
        id: tournamentYear.tournamentId
      }
    })
    return {
      // ...tournamentYear,
      id: tournamentYear.id,
      tournamentId: tournamentYear.tournamentId,
      startDate: tournamentYear.startDate,
      name: tournament.name,
      logo: tournament.logo
    }

  }))
  res.json({data: tournamentsWithNameAndLogo})
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
  const {id} = req.params
  const {
    playersFirstQuarter,
    playersSecondQuarter,
    playersThirdQuarter,
    playersFourthQuarter
  } = req.body

  const getDrawPlayers = await prisma.tournamentYear.findUnique({
    where: {
      id
    }
  })

  const updateDrawPlayer = await prisma.tournamentYear.update({
    where: {
      id
    },
    data: {
      // TO DO: isDrawOut needs to be fixed
      isDrawOut: true,
      playersFirstQuarter: playersFirstQuarter ?  playersFirstQuarter.map(player => JSON.stringify(player)) : getDrawPlayers.playersFirstQuarter,
      playersSecondQuarter: playersSecondQuarter ? playersSecondQuarter.map(player => JSON.stringify(player)) : getDrawPlayers.playersSecondQuarter,
      playersThirdQuarter: playersThirdQuarter ? playersThirdQuarter.map(player => JSON.stringify(player)) : getDrawPlayers.playersThirdQuarter,
      playersFourthQuarter: playersFourthQuarter ? playersFourthQuarter.map(player => JSON.stringify(player)) : getDrawPlayers.playersFourthQuarter,
    }
  })
  res.json({data: updateDrawPlayer})
}

export const addResults = async (req, res) => {
  const {id} = req.params
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
      id
    }
  })

  const updateResults = await prisma.tournamentYear.update({
    where: {
      id
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