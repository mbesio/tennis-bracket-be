import passport from 'passport'

import prisma from '../server/db'
const GoogleStrategy = require('passport-google-oauth20').Strategy

const GOOGLE_CLIENT_ID = process.env.GOOGLE_OATH_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_OATH_CLIENT_SECRET
const SERVER_DOMAIN = process.env.SERVER_DOMAIN

export default function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `${SERVER_DOMAIN}/api/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const newUser = {
            id: profile.id,
            displayName: profile.displayName,
            photo: profile.photos[0].value,
            email: profile.emails[0].value,
          }
          const user = await prisma.user.findUnique({
            where: { id: newUser.id },
          })
          if (user) {
            done(null, user)
          } else {
            const user = await prisma.user.create({
              data: newUser,
            })
            done(null, user)
          }
        } catch (error) {
          done(error)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, { id: user.id })
  })

  passport.deserializeUser(async (id, done) => {
    const user = await prisma.user.findUnique({
      where: { id: id.id },
    })
    done(null, { id: user.id })
  })
}
