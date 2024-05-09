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

const app = express()

const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN

app.use(
  cors({
    origin: CLIENT_DOMAIN,
    credentials: true,
  })
)
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      domain: '.onrender.com',
      secure: true,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
)

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

app.use('/api/admin', apiAdminRouter)
app.use('/api', apiRouter)

// Google Auth
app.use('/api/auth', authRouter)

export default app
