import { Router } from 'express'
import { getTournaments, getTournamentsYear, addTournament,
  addTournamentYear, addDrawPlayers, addResults, getUsers
 } from '../handlers/admin'

const adminRouter = Router()

// Admin Tournmanet routes
adminRouter.get('/tournaments/', getTournaments)
adminRouter.get('/tournaments/year', getTournamentsYear)
adminRouter.post('/tournament/', addTournament)
adminRouter.post('/tournament/:id/:year', addTournamentYear)
adminRouter.post('/tournament/:id/:year/add-draw-players', addDrawPlayers)
adminRouter.post('/tournament/:id/:year/add-results', addResults)

// Admin User routes
adminRouter.get('/users/', getUsers)

export default adminRouter