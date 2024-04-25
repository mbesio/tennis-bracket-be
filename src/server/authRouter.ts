import { Router } from 'express'
import passport from 'passport'
import {CLIENT_DOMAIN} from '../routes/routes'

const authRouter = Router()

import config from '../auth/authenticate'
config(passport)


// Auth routes
authRouter.get('/google', passport.authenticate('google', {scope: ['profile']}))
authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: `${CLIENT_DOMAIN}/` }), (req, res) => {
  console.log('req.user in the callback', req.user)
  res.redirect(`${CLIENT_DOMAIN}/dashboard`)
})
authRouter.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if(err) {
      return next(err)
    }
    res.redirect('/')
  })
})

export default authRouter