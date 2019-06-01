import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import compression from "compression"
import express from "express"
import expressSession from "express-session"
import log4js from "log4js"
import { Builder, Nuxt } from "nuxt"
import passport from "passport"

import 'express-async-errors'

import config from "../nuxt.config"
import * as routes from "./routes"

// Initialize Logger
const logger = log4js.getLogger()

// Configure Nuxt client
config.dev = !(process.env.NODE_ENV === "production")

// Configure Logger
if (config.dev) {
  logger.level = "DEBUG"
} else {
  logger.level = "INFO"
}

const nuxt = new Nuxt(config)
nuxt.error = (err: Error) => {
  logger.error(`${err.message} error has occurred.`)
  logger.debug(err.stack)
}

// Build Nuxt in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Configure Express server
const app: express.Express = express()

app.use(compression())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressSession({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

// Add server routing
app.use('/auth', routes.auth)

app.use(nuxt.render)

// Run the server
const host: string = process.env.HOST || "0.0.0.0"
const port: number = Number(process.env.PORT) || 3000

app.listen(port, host, () => {
  logger.info(`HTTP server listen on http://${host}:${port}`)
})

export default app
