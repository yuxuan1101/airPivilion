import passport from 'koa-passport'
import User from '../models/user'
import LocalStrategy from 'passport-local'

passport.serializeUser((userId, done) => {
  console.log('passport.serializeUser')
  console.log(userId)
  done(null, userId)
  console.log(done)
})

passport.deserializeUser(async (id, done) => {
  console.log('deserializeUser')
  try {
    const user = await User.findById(id, '-password')
    done(null, user)
  } catch (err) {
    done(err)
  }
})

passport.use('local', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username, password, done) => {
  try {
    const user = await User.findOne({ username })
    if (!user) { return done(null, null, '此用户不存在') }

    try {
      const isMatch = await user.validatePassword(password)
      if (!isMatch) { return done(null, null, '密码错误') }

      done(null, user)
    } catch (err) {
      done(err)
    }
  } catch (err) {
    return done(err)
  }
}))
