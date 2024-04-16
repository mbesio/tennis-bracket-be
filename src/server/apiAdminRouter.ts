import { Router } from 'express'
import { addTournament,
  addTournamentYear, addDrawPlayers, addResults, getUsers
 } from '../handlers/admin'

const adminRouter = Router()

// Admin Tournmanet routes
adminRouter.post('/tournament/', addTournament)
adminRouter.post('/tournament/:id/:year', addTournamentYear)
adminRouter.post('/tournament/:id/:year/add-draw-players', addDrawPlayers)
adminRouter.post('/tournament/:id/:year/add-results', addResults)

// Admin User routes
adminRouter.post('/users/', getUsers)

export default adminRouter