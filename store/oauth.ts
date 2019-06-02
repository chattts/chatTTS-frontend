import axios, { AxiosResponse } from 'axios'
import { Token, Error } from '~/server/api/LoginCheck';

export const namespaced = true

export const state = (): {
  id: number|null,
  username: string|null,
  displayName: string|null,
  profilePhoto: string|null,
  vendor: string|null
} => {
  return {
    id: 0,
    username: "",
    displayName: "",
    profilePhoto: "",
    vendor: ""
  }
}

export const getters = {
  getUser(state) {
    return state
  }
}

export const mutations = {
  login(state, payload: {
    id: number|null,
    username: string|null,
    displayName: string|null,
    profilePhoto: string|null,
    vendor: string|null
  } | undefined) {
    if (payload) {
      state.id = payload.id
      state.username = payload.username
      state.displayName = payload.displayName
      state.profilePhoto = payload.profilePhoto
      state.vendor = payload.vendor
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
        displayName: (data.data as Token).displayName,
        profilePhoto: (data.data as Token).profilePhoto,
        vendor: (data.data as Token).vendor
      })
    }
  }
}