import { Router } from 'express'

const apiRouter = Router()

// User routes
apiRouter.post('/prediction/tournament/:id', () => {})
apiRouter.get('/predictions/current', () => {})
apiRouter.get('/predictions/past', () => {})

export default apiRouter