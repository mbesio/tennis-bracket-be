import { Router } from 'express'

const router = Router()

// Admin routes
router.post('/tournament/', "TODO")
router.post('/tournament/:id/add-draw-players', "TODO")
router.post('/tournament/:id/semifinalist-first-quarter', "TODO")
router.post('/tournament/:id/semifinalist-second-quarter', "TODO")
router.post('/tournament/:id/semifinalist-third-quarter', "TODO")
router.post('/tournament/:id/semifinalist-fourth-quarter', "TODO")
router.post('/tournament/:id/finalist-top-half', "TODO")
router.post('/tournament/:id/finalist-bottom-half', "TODO")
router.post('/tournament/:id/winner', "TODO")

// User routes
router.post('/prediction/tournament/:id', "TODO")
router.get('/predictions/current', "TODO")
router.get('/predictions/past', "TODO")

export default router