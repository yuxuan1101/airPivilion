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
    if (!user) { return done(null, {error:true, errMsg: "此用户不存在"}) }

    console.log(user);

    try {
      const isMatch = await user.validatePassword(password)
      if (!isMatch) { return done(null, {error:true, errMsg: "密码错误"}) }

      done(null, user)
    } catch (err) {
      done(err)
    }

  } catch (err) {
    return done(err)
  }
}))
