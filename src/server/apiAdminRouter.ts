import { Router } from 'express'
import { getTournaments, getTournamentsYear, addTournament,
  addTournamentYear, addDrawPlayers, addResults, getUsers, deleteTournament
 } from '../handlers/admin'
import { getPlayers } from '../handlers/adminPlayers'

const adminRouter = Router()

// Admin Tournmanet routes
adminRouter.get('/tournaments/', getTournaments)
adminRouter.post('/tournament/', addTournament)
adminRouter.delete('/tournament/:id', deleteTournament)

//Tournmanets Year
adminRouter.get('/tournaments/year', getTournamentsYear)
adminRouter.post('/tournament/add-draw-players/:id', addDrawPlayers)
adminRouter.post('/tournament/:id/:year/add-results', addResults)
adminRouter.post('/tournament/:id/:year', addTournamentYear)

// Admin User routes
adminRouter.get('/users/', getUsers)

// Admin Player routes
adminRouter.get('/players/', getPlayers)

export default adminRouter