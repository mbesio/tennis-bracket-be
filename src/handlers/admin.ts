import prisma from "../server/db"

export const isAdmin = async (req, res, next) => {
  console.log('Here is where I will check if the user is an admin')
  next()
  // if it is not Admin, then here it should return an let the user know they are trying to perform an unauthorized action
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
  const {id} = req.params
  const {year} = req.body
  const tournamentYear = await prisma.tournamentYear.create({
    data: {
      year,
      tournamentId: id,
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