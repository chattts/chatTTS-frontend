import { Router } from 'express'
import passport from 'passport'

const router = Router()

import * as auth from '../strategy'

passport.serializeUser((user, done) => {
  done(null, {})
})

passport.deserializeUser((user, done) => {
  done(null, {})
})

// passport auth configure
const configurePassport = (configure: { vendor: string, Strategy: any, strategyConfig: any }) => {
  const { vendor, Strategy, strategyConfig } = configure
  const option = {
    failureRedirect: '/auth/fail'
  }

  router.get(`/${vendor}`, passport.authenticate(vendor))
  router.get(`/${vendor}/callback`, passport.authenticate(vendor, option), auth._generateToken)

  passport.use(new Strategy(strategyConfig, auth._strategy(vendor)))
}

configurePassport(auth.twitch)

export default router