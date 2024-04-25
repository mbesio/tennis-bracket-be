import { config } from 'dotenv'
config()

import prisma from "../src/server/db"

import { TOURNAMENT_NAMES } from '../src/constants'


const seedTournamentResults = async () => {
  //Update as needed
  const tournamentName = TOURNAMENT_NAMES.AUSTRALIAN_OPEN
  //Update as needed
  const Year = 2024

  const semifinalistFirstQuarter = JSON.stringify({ name: 'N. Djokovic', seed: 1 })
  const semifinalistSecondQuarter = JSON.stringify({ name: 'J. Sinner', seed: 4 })
  const semifinalistThirdQuarter = JSON.stringify({ name: 'D. Medvedev', seed: 3 })
  const semifinalistFourthQuarter = JSON.stringify({ name: 'A. Zverev', seed: 6 })
  const finalistTopHalf = semifinalistSecondQuarter
  const finalistBottomHalf = semifinalistThirdQuarter
  const winner = finalistTopHalf

  const tournament = await prisma.tournament.findUnique({
    where: {
      name: tournamentName
    }
  })
  const tournamentId = tournament.id

  const tournamentYearId = await prisma.tournamentYear.findUnique({
    where: {
      tournamentYearId: {
        year: Year,
        tournamentId: tournamentId
      }
    }
  })
  const id = tournamentYearId.id
  const updateResults = await prisma.tournamentYear.update({
    where: {
      id
    },
    data: {
      semifinalistFirstQuarter,
      semifinalistSecondQuarter,
      semifinalistThirdQuarter,
      semifinalistFourthQuarter,
      finalistTopHalf,
      finalistBottomHalf,
      winner
    }
  })
  console.log('done seeding tournament winners', updateResults)
}

seedTournamentResults()