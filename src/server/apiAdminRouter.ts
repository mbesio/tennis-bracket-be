import { Router } from 'express'
import { addTournament,
  addTournamentYear, addDrawPlayers, addResults
 } from '../handlers/admin'

const adminRouter = Router()

// Admin routes
adminRouter.post('/tournament/', addTournament)
adminRouter.post('/tournament/:id/year', addTournamentYear)
adminRouter.post('/tournament/:id/:year/add-draw-players', addDrawPlayers)
adminRouter.post('/tournament/:id/:year/add-results', addResults)

export default adminRouter