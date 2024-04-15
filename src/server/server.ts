import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import passport from 'passport'
import session from 'express-session'
import apiAdminRouter from './apiAdminRouter'
import apiRouter from './apiRouter'
import { isAdmin } from '../handlers/admin'

import config from '../auth/authenticate'
config(passport)
// require('../auth/authenticate')(passport)

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

// app.use('/api', protect, router)
// have the middleware check if user is admin

app.use('/apiAdmin', isAdmin, apiAdminRouter)
app.use('/api', apiRouter)

// app.post('/user', createNewUser)
app.get('/google', passport.authenticate('google', {scope: ['profile']}))

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  console.log("I have been logged in correctly")
  res.redirect('/dashboard')
})

export default app