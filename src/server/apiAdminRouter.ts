import { Router } from 'express'
import { getTournaments, getTournamentsYear, addTournament,
  addTournamentYear, addDrawPlayers, addResults, getUsers, setAdminUser, deleteTournament, getAllTournamentsYear, getPredictions
 } from '../handlers/admin'
import { getPlayers } from '../handlers/adminPlayers'

const adminRouter = Router()

// Admin Tournmanet routes
adminRouter.get('/tournaments/', getTournaments)
adminRouter.post('/tournament/', addTournament)
adminRouter.delete('/tournament/:id', deleteTournament)

//Tournmanets Year
adminRouter.get('/tournaments/year', getTournamentsYear)
adminRouter.get('/tournaments/draws', getAllTournamentsYear)
adminRouter.post('/tournament/add-draw-players/:id', addDrawPlayers)
adminRouter.post('/tournament/add-results/:id', addResults)
adminRouter.post('/tournament/:id/:year', addTournamentYear)

// Admin User routes
adminRouter.get('/users/', getUsers)
adminRouter.put('/user/', setAdminUser)

// Admin Player routes
adminRouter.get('/players/', getPlayers)

// Admin Player routes
adminRouter.get('/predictions/', getPredictions)


export default adminRouter