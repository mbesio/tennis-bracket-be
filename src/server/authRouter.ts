import { Router } from 'express'
import passport from 'passport'

const authRouter = Router()

import config from '../auth/authenticate'
config(passport)

const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN
// Auth routes
authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile'] })
)
authRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: `${CLIENT_DOMAIN}/` }),
  (req, res) => {
    res.cookie('connect.sid', req.sessionID, { domain: CLIENT_DOMAIN })
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
