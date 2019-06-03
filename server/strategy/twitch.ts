import * as TwitchStrategy from 'passport-twitch'

export let vendor = 'twitch'

export let Strategy = TwitchStrategy.Strategy

export let strategyConfig = {
  clientID: process.env.twitch_id!,
  clientSecret: process.env.twitch_secret!,
  callbackURL: process.env.twitch_callback_uri!,
  scope: process.env.twitch_scope!,
  passReqToCallback: true
}
