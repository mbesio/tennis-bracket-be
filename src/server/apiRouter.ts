import { Router } from 'express'

import {
  getOpenPredictions,
  makePrediction,
  getCurrentPredictions,
  getPastPredictions,
  getUserTournaments,
  getTournamentPlayers
} from '../handlers/user'

const apiRouter = Router()

// User routes
apiRouter.post('/prediction/tournament/:id/', makePrediction)

apiRouter.get('/tournaments/', getUserTournaments)
apiRouter.get('/tournament/players/:id', getTournamentPlayers)
apiRouter.get('/predictions/open', getOpenPredictions)
apiRouter.get('/predictions/current', getCurrentPredictions)
apiRouter.get('/predictions/past', getPastPredictions)

export default apiRouter