import { config } from 'dotenv'
config()

import prisma from "../src/server/db"

import { TOURNAMENT_NAMES } from '../src/constants'

/**
 * This file is used to run scripts to seed the database.
*/
const LOGOS_GCS_BUCKET_URL = process.env.LOGOS_GCS_BUCKET_URL
/**
 * The first script seeds the Tournament collection with the tournament names and logos to the urls.
*/

const seedTournaments = async () => {
  const TOURNAMENTS = [
    {
      "name": TOURNAMENT_NAMES.AUSTRALIAN_OPEN,
      "logo": `${LOGOS_GCS_BUCKET_URL}/${TOURNAMENT_NAMES.AUSTRALIAN_OPEN}.png`
    },
    {
      "name": TOURNAMENT_NAMES.INDIAN_WELLS,
      "logo": `${LOGOS_GCS_BUCKET_URL}/${TOURNAMENT_NAMES.INDIAN_WELLS}.png`
    },
    {
      "name": TOURNAMENT_NAMES.MIAMI_OPEN,
      "logo": `${LOGOS_GCS_BUCKET_URL}/${TOURNAMENT_NAMES.MIAMI_OPEN}.png`
    },
    {
      "name": TOURNAMENT_NAMES.MONTE_CARLO,
      "logo": `${LOGOS_GCS_BUCKET_URL}/${TOURNAMENT_NAMES.MONTE_CARLO}.png`
    },
    {
      "name": TOURNAMENT_NAMES.MADRID_OPEN,
      "logo": `${LOGOS_GCS_BUCKET_URL}/${TOURNAMENT_NAMES.MADRID_OPEN}.png`
    },
    {
      "name": TOURNAMENT_NAMES.ITALIAN_OPEN,
      "logo": `${LOGOS_GCS_BUCKET_URL}/${TOURNAMENT_NAMES.ITALIAN_OPEN}.png`
    },
    {
      "name": TOURNAMENT_NAMES.ROLAND_GARROS,
      "logo": `${LOGOS_GCS_BUCKET_URL}/${TOURNAMENT_NAMES.ROLAND_GARROS}.png`
    },
    {
      "name": TOURNAMENT_NAMES.WIMBLEDON,
      "logo": `${LOGOS_GCS_BUCKET_URL}/${TOURNAMENT_NAMES.WIMBLEDON}.png`
    },
    {
      "name": TOURNAMENT_NAMES.CANADIAN_OPEN,
      "logo": `${LOGOS_GCS_BUCKET_URL}/${TOURNAMENT_NAMES.CANADIAN_OPEN}.png`
    },
    {
      "name": TOURNAMENT_NAMES.CINCINNATI,
      "logo": `${LOGOS_GCS_BUCKET_URL}/${TOURNAMENT_NAMES.CINCINNATI}.png`
    },
    {
      "name": TOURNAMENT_NAMES.US_OPEN,
      "logo": `${LOGOS_GCS_BUCKET_URL}/${TOURNAMENT_NAMES.US_OPEN}.png`
    },
    {
      "name": TOURNAMENT_NAMES.SHANGHAI_MASTERS,
      "logo": `${LOGOS_GCS_BUCKET_URL}/${TOURNAMENT_NAMES.SHANGHAI_MASTERS}.png`
    },
    {
      "name": TOURNAMENT_NAMES.PARIS_MASTERS,
      "logo": `${LOGOS_GCS_BUCKET_URL}/${TOURNAMENT_NAMES.PARIS_MASTERS}.png`
    },
    {
      "name": TOURNAMENT_NAMES.ATP_FINALS,
      "logo": `${LOGOS_GCS_BUCKET_URL}/${TOURNAMENT_NAMES.ATP_FINALS}.png`
    }
  ]

  const tournaments = TOURNAMENTS.map(({name, logo}) => (
    prisma.tournament.create({
      data: {
        name,
        logo
      }
    })
  ))
  const result = await Promise.all(tournaments)
  console.log('Tournaments seeded: ', result)
}

seedTournaments()