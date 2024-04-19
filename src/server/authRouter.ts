import { Router } from 'express'
import passport from 'passport'
import { OAuth2Client } from "google-auth-library"


const authRouter = Router()

import config from '../auth/authenticate'
config(passport)

const client = new OAuth2Client();


authRouter.post('/google-auth', async (req, res) => {
  console.log("I am in the google auth route")
  const { credential, client_id } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: client_id,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    res.status(200).json({ payload });
  } catch (err) {
  res.status(400).json({ err });
  }
});



// Auth routes
authRouter.get('/google', passport.authenticate('google', {scope: ['profile']}))
authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  console.log("Hi, I am in the callback now")
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