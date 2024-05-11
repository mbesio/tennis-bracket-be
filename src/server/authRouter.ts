import { Router } from 'express'
import passport from 'passport'

const authRouter = Router()

import config from '../auth/authenticate'
config(passport)

const CLIENT_DOMAIN =
  process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_DOMAIN_PROD
    : process.env.CLIENT_DOMAIN_DEV
const SERVER_DOMAIN =
  process.env.NODE_ENV === 'production'
    ? process.env.SERVER_DOMAIN_PROD
    : process.env.SERVER_DOMAIN_DEV
// Auth routes
authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile'] })
)
authRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: `${CLIENT_DOMAIN}/` }),
  (req, res) => {
    // res.cookie('connect.sid', req.sessionID, { domain: SERVER_DOMAIN })
    res.redirect(`${CLIENT_DOMAIN}/dashboard`)
  }
)
authRouter.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
})

export default authRouter
