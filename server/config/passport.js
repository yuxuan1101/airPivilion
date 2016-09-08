import passport from 'koa-passport'
import User from '../models/user'
import { Strategy } from 'passport-local'

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id, '-password')
    done(null, user)
  } catch (err) {
    done(err)
  }
})

passport.use('local', new Strategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username, password, done) => {
  try {
    const user = await User.findOne({ username })
    if (!user) { return done(null, false) }

    console.log(user);

    try {
      const isMatch = await user.validatePassword(password)
      console.log(isMatch);
      console.log(username);
      console.log(password);
      if (!isMatch) { return done(null, false) }

      done(null, user)
    } catch (err) {
      done(err)
    }

  } catch (err) {
    return done(err)
  }
}))
