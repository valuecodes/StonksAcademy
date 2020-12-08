const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/userModel')
const { getToken, isAuth } = require('../utils');

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
        profileFields: ['id', 'emails', 'name'],
        prompt: 'select_account',
      },
      async (accessToken, refreshToken, profile, done) => {
        
        const newUser = {
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
        }
        
        try {
          let user = await User.findOne({ googleId: newUser.googleId })
          if(user){
            done(null, user)
          } else {
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  // passport.serializeUser((user, done) => {
  //   done(null, user.id)
  // })

  // passport.deserializeUser((id, done) => {
  //   User.findById(id, (err, user) => done(err, user))
  // })
}