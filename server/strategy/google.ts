import * as GoogleStrategy from 'passport-google-oauth2'

export let vendor = 'google'

export let Strategy = GoogleStrategy.Strategy

export let strategyConfig: GoogleStrategy.StrategyOptions = {
  clientID: process.env.youtube_id!,
  clientSecret: process.env.youtube_secret!,
  callbackURL: process.env.youtube_callback_uri!,
  scope: process.env.youtube_scope!.split(','),
  passReqToCallback: true
}
