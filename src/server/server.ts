import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import apiRouter from './apiRouter'

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
app.use('/api', apiRouter)

// app.post('/user', createNewUser)
// app.post('/signin', signin)

export default app