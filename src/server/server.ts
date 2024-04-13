import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import apiAdminRouter from './apiAdminRouter'
import apiRouter from './apiRouter'
import { isAdmin } from '../handlers/admin'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.status(200)
  res.json({ message: 'hello' })
})

// app.use('/api', protect, router)
// have the middleware check if user is admin

app.use('/apiAdmin', isAdmin, apiAdminRouter)
app.use('/api', apiRouter)

// app.post('/user', createNewUser)
// app.post('/signin', signin)

export default app