import { Router } from 'express'
import {
  getTournaments,
  getTournamentsYear,
  addTournament,
  getTournament,
  addTournamentYear,
  addDrawPlayers,
  addResults,
  getUsers,
  deleteUser,
  setAdminUser,
  deleteTournament,
  getAllTournamentsYear,
  getPredictions,
  setDrawIsOpen,
  setPredictionIsClosed,
} from '../handlers/admin'
import { getPlayers } from '../handlers/adminPlayers'
import { isAdmin } from '../auth/helpers'

const adminRouter = Router()

// Admin Tournmanet routes
adminRouter.get('/tournaments/', isAdmin, getTournaments)
adminRouter.post('/tournament/', isAdmin, addTournament)
adminRouter.delete('/tournament/:id', isAdmin, deleteTournament)

//Tournmanets Year
adminRouter.get('/tournament/:id', isAdmin, getTournament)
adminRouter.get('/tournaments/year', isAdmin, getTournamentsYear)
adminRouter.get('/tournaments/draws', isAdmin, getAllTournamentsYear)
adminRouter.post('/tournament/add-draw-players/:id', isAdmin, addDrawPlayers)
adminRouter.post('/tournament/add-results/:id', isAdmin, addResults)
adminRouter.post('/tournament/draw-is-open/:id', isAdmin, setDrawIsOpen)
adminRouter.post(
  '/tournament/prediction-is-closed/:id',
  isAdmin,
  setPredictionIsClosed
)
adminRouter.post('/tournament/:id/:year', isAdmin, addTournamentYear)

// Admin User routes
adminRouter.get('/users/', isAdmin, getUsers)
adminRouter.delete('/user/:id', isAdmin, deleteUser)
adminRouter.put('/user/', isAdmin, setAdminUser)

// Admin Player routes
adminRouter.get('/players/', isAdmin, getPlayers)

// Admin Player routes
adminRouter.get('/predictions/', isAdmin, getPredictions)

export default adminRouter
