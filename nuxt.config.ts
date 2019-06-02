import parseArgs from "minimist"
import NuxtConfiguration from "@nuxt/config"

const argv = parseArgs(process.argv.slice(2), {
  alias: {
    H: "hostname",
    p: "port"
  },
  string: ["H"],
  unknown: parameter => false
})

const port =
  argv.port ||
  process.env.PORT ||
  process.env.npm_package_config_nuxt_port ||
  "3000"
const host =
  argv.hostname ||
  process.env.HOST ||
  process.env.npm_package_config_nuxt_host ||
  "localhost"

// tslint:disable-next-line: no-var-requires
const pkg = require("./package")

const config: NuxtConfiguration = {
  env: {
    twitch_id: process.env.twitch_id!,
    callback_uri: process.env.callback_uri!,
  },
  mode: "spa",

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#fff" },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "~/plugins/vue-cookies.ts",
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/dotenv",
    "nuxt-buefy",
    "nuxt-rfg-icon",
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        {
          set: "@fortawesome/free-brands-svg-icons",
          icons: [
            "faTwitch", "faYoutube"
          ]
        }, {
          set: "@fortawesome/free-solid-svg-icons",
          icons: [
            "faSignOutAlt", "faUserCircle",
            "faTools", "faAddressCard",
            "faUsersCog", "faVideo",
            "faCheck", "faTimes"
          ]
        }, {
          set: "@fortawesome/free-regular-svg-icons",
          icons: [
            "faClock"
          ]
        }
      ]
    }]
  ],
  /*
  ** Axios module configuration
  */
  axios: {
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}

export default config
