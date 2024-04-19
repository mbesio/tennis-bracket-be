import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import passport from 'passport'
import session from 'express-session'
import apiAdminRouter from './apiAdminRouter'
import apiRouter from './apiRouter'
import authRouter from './authRouter'
import { isAdmin } from '../handlers/admin'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  res.status(200)
  res.json({ message: 'hello' })
})

app.get('/dashboard', (req, res) => {
  res.status(200)
  res.json({ message: 'this is the dashboard' })
})

//TO DO: have the middleware check if user is admin
app.use('/apiAdmin', isAdmin, apiAdminRouter)
//TO DO: add sthg like app.use('/api', protect, router) - to check if the user is logged in
app.use('/api', apiRouter)

// Google Auth
app.use('/auth', authRouter)

export default app