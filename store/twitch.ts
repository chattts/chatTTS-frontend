import { env } from "process"

export const namespaced = true

export const state = (): {
  AccessToken: string,
  Username: string,
  Image: string,
  Secret: string
} => {
  return {
    AccessToken: "",
    Username: "",
    Image: "",
    Secret: Math.random().toString(36).slice(-5),
  }
}

const scope = encodeURIComponent("chat_login channel_commercial channel_check_subscription")

export const getters = {
// tslint:disable-next-line: no-shadowed-variable
  getAuthorizeURL(state): string {
    return "https://id.twitch.tv/oauth2/authorize?" +
      "response_type=token&client_id=" +
      `${env.twitch_id}&redirect_uri=${env.callback_uri}&` +
      `scope=${scope}&` +
      `state=${state.Secret}`
  },
// tslint:disable-next-line: no-shadowed-variable
  getUser(state) {
    return {
      AccessToken: state.AccessToken,
      Username: state.Username,
      Image: state.Image,
      TAPIC: state.TAPIC,
    }
  },
}

export const mutations = {
// tslint:disable-next-line: no-shadowed-variable
  login(state, payload: {
    AccessToken: string,
    Username: string,
    Image: string
  }) {
    state = payload

    return state
  },
}

export const actions = {
  async login(context, payload: {
    AccessToken: string,
    Secret: string,
  }) {
    if (payload.Secret !== context.Secret) {
      return undefined
    } else {
      (window as any).TAPIC.setup(payload.AccessToken, (username: string|null) => {
        if (username) {
          (window as any).TAPIC.joinChannel(username, (callback) => {
            return context.commit("login", {
              AccessToken: payload.AccessToken,
              Username: username,
              Image: (window as any).TAPIC.getLogo(),
            })
          })
        }
      })
    }
  },
}
