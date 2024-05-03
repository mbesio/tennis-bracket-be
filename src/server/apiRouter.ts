import { Router } from 'express'

import {
  getOpenPredictions,
  makePrediction,
  getPrediction,
  getPredictions,
  getCurrentPredictions,
  getPastPredictions,
  getUserTournaments,
  getTournamentPlayers,
  getTournamentResults,
  getAdmin,
  getMe,
} from '../handlers/user'
import { isAuth } from '../auth/helpers'

const apiRouter = Router()

// User routes
apiRouter.post('/prediction/tournament/:id/', isAuth, makePrediction)
apiRouter.get('/prediction/tournament/:id/', isAuth, getPrediction)
apiRouter.get('/predictions/', isAuth, getPredictions)
apiRouter.get('/result/tournament/:id/', isAuth, getTournamentResults)

apiRouter.get('/tournaments/', isAuth, getUserTournaments)
apiRouter.get('/tournament/players/:id', isAuth, getTournamentPlayers)
apiRouter.get('/predictions/open', isAuth, getOpenPredictions)
apiRouter.get('/predictions/current', isAuth, getCurrentPredictions)
apiRouter.get('/predictions/past', isAuth, getPastPredictions)

apiRouter.get('/auth/admin', getAdmin)
apiRouter.get('/auth/me', getMe)

export default apiRouter
