import { Router } from 'express'
import passport from 'passport'

const authRouter = Router()

import config from '../auth/authenticate'
config(passport)


// Auth routes
authRouter.get('/google', passport.authenticate('google', {scope: ['profile']}))
authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.send("Respond with a user object once the user auths in correctly.")
  console.log("I have been logged in correctly")
  res.redirect('/dashboard')
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