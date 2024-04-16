import { Router } from 'express'

import {
  getOpenPredictions,
  makePrediction,
  getCurrentPredictions,
  getPastPredictions
} from '../handlers/user'

const apiRouter = Router()

// User routes
// apiRouter.get('/predictions/open', getOpenPredictions)
apiRouter.post('/prediction/tournament/:id/:year', makePrediction)
apiRouter.get('/predictions/current', getCurrentPredictions)
apiRouter.get('/predictions/past', getPastPredictions)

export default apiRouter