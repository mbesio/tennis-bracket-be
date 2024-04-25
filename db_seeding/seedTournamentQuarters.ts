import { config } from 'dotenv'
config()

import prisma from "../src/server/db"

import { TOURNAMENT_NAMES } from '../src/constants'

const AO_playersFirstQuarter = [
  { name: 'N. Djokovic', seed: 1 },
  { name: 'A. Popyrin', seed: null },
  { name: 'Y. Hanfmann', seed: null },
  { name: 'G. Monfils', seed: null },
  { name: 'A. Murray', seed: null },
  { name: 'T. Etcheverry', seed: 30 },
  { name: 'A. Mannarino', seed: 20 },
  { name: 'S. Wawrinka', seed: null },
  { name: 'A. Shevchenko', seed: null },
  { name: 'J. Munar', seed: null },
  { name: "C. O'Connell", seed: null },
  { name: 'C. Garin', seed: null },
  { name: 'R. Bautista Agut', seed: null },
  { name: 'B. Shelton', seed: 16 },
  { name: 'T. Fritz', seed: 12 },
  { name: 'F. Diaz Acosta', seed: null },
  { name: 'R. Carballes Baena', seed: null },
  { name: 'F. Marozsan', seed: null },
  { name: 'F. Cerundolo', seed: 22 },
  { name: 'L. Musetti', seed: 25 },
  { name: 'B. Bonzi', seed: null },
  { name: 'L. Van Assche', seed: null },
  { name: 'A. Vukic', seed: null },
  { name: 'J. Thompson', seed: null },
  { name: 'S. Tsitsipas', seed: 7 }
]
const AO_playersSecondQuarter = [
  { name: 'J. Sinner', seed: 4 },
  { name: 'B. van de Zandschulp', seed: null },
  { name: 'P. Cachin', seed: null },
  { name: 'D. Galan', seed: null },
  { name: 'J. Wolf', seed: null },
  { name: 'S. Baez', seed: 26 },
  { name: 'F. Tiafoe', seed: 17 },
  { name: 'B. Coric', seed: null },
  { name: 'T. Machac', seed: null },
  { name: 'A. Tabilo', seed: null },
  { name: 'D. Altmaier', seed: null },
  { name: 'K. Khachanov', seed: 15 },
  { name: 'A. de Minaur', seed: 10 },
  { name: 'M. Arnaldi', seed: null },
  { name: 'P. Kotov', seed: null },
  { name: 'A. Rinderknech', seed: null },
  { name: 'N. Jarry', seed: 18 },
  { name: 'S. Korda', seed: 29 },
  { name: 'Q. Halys', seed: null },
  { name: 'C. Eubanks', seed: null },
  { name: 'T. Daniel', seed: null },
  { name: 'T. Seyboth Wild', seed: null },
  { name: 'A. Rublev', seed: 5 }
]
const AO_playersThirdQuarter =  [
  { name: 'H. Rune', seed: 8 },
  { name: 'Y. Nishioka', seed: null },
  { name: 'L. Djere', seed: null },
  { name: 'A. Fils', seed: null },
  { name: 'R. Safiullin', seed: null },
  { name: 'T. Griekspoor', seed: null },
  { name: 'U. Humbert', seed: 21 },
  { name: 'Z. Zhang', seed: null },
  { name: 'F. Coria', seed: null },
  { name: 'H. Hurkacz', seed: 9 },
  { name: 'G. Dimitrov', seed: null },
  { name: 'M. Fucsovics', seed: null },
  { name: 'S. Ofner', seed: null },
  { name: 'T. Kokkinakis', seed: null },
  { name: 'M. Marterer', seed: null },
  { name: 'N. Borges', seed: null },
  { name: 'C. Lestienne', seed: null },
  { name: 'A. Davidovich Fokina', seed: 23 },
  { name: 'F. Auger-Aliassime', seed: 27 },
  { name: 'D. Thiem', seed: null },
  { name: 'A. Muller', seed: null },
  { name: 'E. Ruusuvuori', seed: null },
  { name: 'D. Medvedev', seed: 3 }
]
const AO_playersFourthQuarter = [
  { name: 'A. Zverev', seed: 6 },
  { name: 'D. Koepfer', seed: null },
  { name: 'A. Michelsen', seed: null },
  { name: 'B. Zapata Miralles', seed: null },
  { name: 'J. Lehecka', seed: null },
  { name: 'C. Norrie', seed: 19 },
  { name: 'J. Varillas', seed: null },
  { name: 'D. Lajovic', seed: null },
  { name: 'M. Purcell', seed: null },
  { name: 'A. Ramos-Vinolas', seed: null },
  { name: 'C. Ruud', seed: 11 },
  { name: 'T. Paul', seed: 14 },
  { name: 'G. Barrere', seed: null },
  { name: 'M. Giron', seed: null },
  { name: 'J. Draper', seed: null },
  { name: 'M. Kecmanovic', seed: null },
  { name: 'Y. Watanuki', seed: null },
  { name: 'R. Hijikata', seed: null },
  { name: 'J. Struff', seed: 24 },
  { name: 'A. Bublik', seed: 31 },
  { name: 'M. McDonald', seed: null },
  { name: 'D. Evans', seed: null },
  { name: 'L. Sonego', seed: null },
  { name: 'R. Gasquet', seed: null },
  { name: 'C. Alcaraz', seed: 2 }
]


const seedTournamentQuarters = async () => {
  //Update as needed
  const tournamentName = TOURNAMENT_NAMES.MIAMI_OPEN
  //Update as needed
  const Year = 2024

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

  const updateDrawPlayers = await prisma.tournamentYear.update({
    where: {
      id: id
    }, data: {
      isDrawOut: true,
      isPredictionClosed: true,
      //Update as needed
      playersFirstQuarter: AO_playersFirstQuarter.map(player => JSON.stringify(player)),
      //Update as needed
      playersSecondQuarter: AO_playersSecondQuarter.map(player => JSON.stringify(player)),
      //Update as needed
      playersThirdQuarter: AO_playersThirdQuarter.map(player => JSON.stringify(player)),
      //Update as needed
      playersFourthQuarter: AO_playersFourthQuarter.map(player => JSON.stringify(player)),

    }
  })
  console.log('done seed Tournament quarters')
}

seedTournamentQuarters()