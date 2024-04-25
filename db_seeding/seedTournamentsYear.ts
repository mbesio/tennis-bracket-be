import { config } from 'dotenv'
config()

import prisma from "../src/server/db"

import { TOURNAMENT_NAMES } from '../src/constants'

/**
 * This file is used to run scripts to seed the database.
*/
const LOGOS_GCS_BUCKET_URL = process.env.LOGOS_GCS_BUCKET_URL
/**
 * The first script seeds the TournamentYear collection. It requires the tournamentId, year, and startDate. The tournamentId can be fetched from the Tournament collection. The year is passed manually to create all of the tournaments for the year.
*/

const seedTournamentsYear = async (year) => {

  const tournamentIds = await prisma.tournament.findMany({
    // where: {
    //   id: {
    //     not: "4edbeb00-8b5a-42a7-a1e2-e692523341df",
    //   }
    // }
  })
  // UPDATE THESE BASED ON THE YEAR YOU WANT TO SEED
  const START_DATES = [
    {
      name: TOURNAMENT_NAMES.AUSTRALIAN_OPEN,
      startDate: `${year}-01-14T00:00:00.000Z`
    },
    {
      name: TOURNAMENT_NAMES.INDIAN_WELLS,
      startDate: `${year}-03-06T00:00:00.000Z`
    },
    {
      name: TOURNAMENT_NAMES.MIAMI_OPEN,
      startDate: `${year}-03-20T00:00:00.000Z`
    },
    {
      name: TOURNAMENT_NAMES.MONTE_CARLO,
      startDate: `${year}-04-07T00:00:00.000Z`
    },
    {
      name: TOURNAMENT_NAMES.MADRID_OPEN,
      startDate: `${year}-04-24T00:00:00.000Z`
    },
    {
      name: TOURNAMENT_NAMES.ITALIAN_OPEN,
      startDate: `${year}-05-08T00:00:00.000Z`
    },
    {
      name: TOURNAMENT_NAMES.ROLAND_GARROS,
      startDate: `${year}-05-26T00:00:00.000Z`
    },
    {
      name: TOURNAMENT_NAMES.WIMBLEDON,
      startDate: `${year}-07-01T00:00:00.000Z`
    },
    {
      name: TOURNAMENT_NAMES.CANADIAN_OPEN,
      startDate: `${year}-08-05T00:00:00.000Z`
    },
    {
      name: TOURNAMENT_NAMES.CINCINNATI,
      startDate: `${year}-08-11T00:00:00.000Z`
    },
    {
      name: TOURNAMENT_NAMES.US_OPEN,
      startDate: `${year}-08-26T00:00:00.000Z`
    },
    {
      name: TOURNAMENT_NAMES.SHANGHAI_MASTERS,
      startDate: `${year}-10-02T00:00:00.000Z`
    },
    {
      name: TOURNAMENT_NAMES.PARIS_MASTERS,
      startDate: `${year}-10-28T00:00:00.000Z`
    },
    {
      name: TOURNAMENT_NAMES.ATP_FINALS,
      startDate: `${year}-11-10T00:00:00.000Z`
    }
  ]

  const params = tournamentIds.map(({name, id}) => {
    const startDate = START_DATES.find(({name: tournamentName}) => tournamentName === name).startDate
    return {
      id,
      startDate,
    }
  })

  const tournamentsYear = params.map(({id, startDate}) => (
    prisma.tournamentYear.create({
      data: {
        year,
        tournamentId: id,
        startDate
      }
    })
  ))
  const result = await Promise.all(tournamentsYear)
  console.log('TournamentsYear seeded: ', result)
}

// Change the input with the year you want to seed the tournaments
seedTournamentsYear(2024)