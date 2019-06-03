import { Router } from 'express'
import passport from 'passport'
import { LoginCheck, sessToken } from '../api'
import { Error, Token } from '../api/LoginCheck';

import * as auth from '../strategy'

const router = Router()

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
configurePassport(auth.google)

router.get('/check', async (req, res) => {
  try {
    const token = await LoginCheck(sessToken.getToken(req))

    if ((token as Error).status) {
      res.status(400)
        .json(token)
        .end()

      return
    } else {
      res.status(200)
        .json(token as Token)
        .end()

      return
    }
  } catch(error) {
    throw error
  }
})

router.get('/logout', async (req, res) => {
  try {
    const token = await LoginCheck(sessToken.getToken(req))

    if ((token as Error).status === "Please log in") {
      res.status(400)
        .json(token)
        .end()
    } else {
      res.clearCookie('authorization')
      res.clearCookie('isLogin')

      res.redirect(302, '/')
    }
  } catch (error) {
    throw error
  }
})
export default router