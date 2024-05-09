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
const SERVER_DOMAIN = process.env.SERVER_DOMAIN

app.use(
  cors({
    origin: [CLIENT_DOMAIN, SERVER_DOMAIN],
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
    // THIS BREAKS LOCALHOST
    cookie: {
      sameSite: 'none',
      secure: true,
    },
  })
)

app.use(passport.initialize())
app.use(passport.session())

// Google Auth
app.use('/api/auth', authRouter)
app.use('/api/admin', apiAdminRouter)
app.use('/api', apiRouter)

app.get('*', (req, res) => {
  res.redirect(CLIENT_DOMAIN)
})
export default app
