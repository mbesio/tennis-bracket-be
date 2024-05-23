import exp from 'constants'

// Tournament Names
export const TOURNAMENT_NAMES = {
  AUSTRALIAN_OPEN: 'australian-open',
  INDIAN_WELLS: 'indian-wells',
  MIAMI_OPEN: 'miami-open',
  MONTE_CARLO: 'monte-carlo',
  MADRID_OPEN: 'madrid-open',
  ITALIAN_OPEN: 'italian-open',
  ROLAND_GARROS: 'roland-garros',
  WIMBLEDON: 'wimbledon',
  CANADIAN_OPEN: 'canadian-open',
  CINCINNATI: 'cincinnati',
  US_OPEN: 'us-open',
  SHANGHAI_MASTERS: 'shanghai-masters',
  PARIS_MASTERS: 'paris-masters',
  ATP_FINALS: 'atp-finals',
}

export const drawIsOutEmailSubject = (tournament) =>
  `Who will win ${tournament}?`

export const drawIsOutEmailText = (year, tournament) =>
  `Hi {username},\n\nThe draw for the ${year} ${tournament} is out. Log on to ${process.env.CLIENT_DOMAIN} and make your prediction.\n\nGood luck!`

export const drawIsOutEmailHTML = (year, tournament) =>
  `<p>Hi {username},</p><p>The draw for the ${year} ${tournament} is out. Log on to <a href="${process.env.CLIENT_DOMAIN}" target="_blank">${process.env.CLIENT_DOMAIN}</a> and make your prediction.</p><p>Good luck!</p>`
