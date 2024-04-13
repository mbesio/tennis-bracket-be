import { Router } from 'express'
import { addTournament,
  addTournamentYear, addDrawPlayers
 } from '../handlers/admin'

const adminRouter = Router()

// Admin routes
adminRouter.post('/tournament/', addTournament)
adminRouter.post('/tournament/:id/year', addTournamentYear)
adminRouter.post('/tournament/:id/:year/add-draw-players', addDrawPlayers)
adminRouter.post('/tournament/:id/:year/semifinalist-first-quarter', () => {})
adminRouter.post('/tournament/:id/:year/semifinalist-second-quarter', () => {})
adminRouter.post('/tournament/:id/:year/semifinalist-third-quarter', () => {})
adminRouter.post('/tournament/:id/:year/semifinalist-fourth-quarter', () => {})
adminRouter.post('/tournament/:id/:year/finalist-top-half', () => {})
adminRouter.post('/tournament/:id/:year/finalist-bottom-half', () => {})
adminRouter.post('/tournament/:id/:year/winner', () => {})

// User routes
adminRouter.post('/prediction/tournament/:id', () => {})
adminRouter.get('/predictions/current', () => {})
adminRouter.get('/predictions/past', () => {})

export default adminRouter