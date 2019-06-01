import axios, { AxiosResponse } from 'axios'
import { Token, Error } from '~/server/api/LoginCheck';

export const namespaced = true

export const state = (): {
  id: number|null,
  username: string|null,
  displayName: string|null,
  profilePhoto: string|null
} => {
  return {
    id: 0,
    username: "",
    displayName: "",
    profilePhoto: ""
  }
}

export const getters = {
  getUser(state) {
    return {
      id: state.id,
      username: state.username,
      displayName: state.displayName,
      profilePhoto: state.profilePhoto
    }
  }
}

export const mutations = {
  login(state, payload: {
    id: number|null,
    username: string|null,
    displayName: string|null,
    profilePhoto: string|null
  } | undefined) {
    if (payload) {
      state = payload
    }
  }
}

export const actions = {
  async login(context) {
    const data: AxiosResponse<Token|Error> = await axios({
      method: 'get',
      url: '/auth/check'
    })

    if ((data.data as Error).valid) {
      /* if ((data.data as Error).status === 'Token has expired') {

      } else {

      }*/

      return undefined
    } else {
      return context.commit("login", {
        id: (data.data as Token).id,
        username: (data.data as Token).username,
        displayname: (data.data as Token).displayName,
        profilePhoto: (data.data as Token).profilePhoto
      })
    }
  }
}