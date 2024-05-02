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

const apiRouter = Router()

// User routes
apiRouter.post('/prediction/tournament/:id/', makePrediction)
apiRouter.get('/prediction/tournament/:id/', getPrediction)
apiRouter.get('/predictions/', getPredictions)
apiRouter.get('/result/tournament/:id/', getTournamentResults)

apiRouter.get('/tournaments/', getUserTournaments)
apiRouter.get('/tournament/players/:id', getTournamentPlayers)
apiRouter.get('/predictions/open', getOpenPredictions)
apiRouter.get('/predictions/current', getCurrentPredictions)
apiRouter.get('/predictions/past', getPastPredictions)

apiRouter.get('/auth/admin', getAdmin)
apiRouter.get('/auth/me', getMe)

export default apiRouter
