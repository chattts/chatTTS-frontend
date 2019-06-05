import * as db from '../db'
import * as api from '../api'
import { Error, Token } from '~/api/LoginCheck';

export default (vendor: string) => {
  return async (req: any, accessToken: string, refreshToken: string, profile: any, done: Function) => {
    function getProfilePhoto(profile: any, vendor: string): string {
      if (vendor === 'google') {
        return profile.picture
      } else if (vendor === 'twitch') {
        return profile._json.logo
      } else return ''
    }

    function getNickname(profile: any, vendor: string): string {
      if (vendor === 'google') {
        return profile.displayName
      } else if (vendor === 'twitch') {
        return profile.displayName
      } else return ''
    }

    let payload

    const query = await db.OAuth.findByOAuth(profile.id, vendor)

    if (query) {
      await db.OAuth.updateUser(profile.id, vendor, {
        AccessToken: accessToken,
        RefreshToken: refreshToken,
        profilePhoto: getProfilePhoto(profile, vendor)
      })

      const [oauth, user] = await Promise.all([
        db.OAuth.findByUserId(query.userId),
        db.User.findById(query.userId)
      ])

      payload = {
        id: user.id,
        nickname: user.nickname,
        isAdmin: user.isAdmin,
        auth: {}
      }

      oauth.forEach((value, index, array) => {
        payload['auth'][value.vendor] = {
          id: value.OAuthId,
          profilePhoto: value.profilePhoto,
          accessToken: value.AccessToken
        }
      })
    } else {
      const token = api.sessToken.getToken(req)

      const parsedToken = await api.LoginCheck(token)

      if (!token && !(parsedToken as Error).valid) {

        const query = await db.User.create(getNickname(profile, vendor))

        await db.OAuth.createUser({
          userId: query.id,
          OAuthId: profile.id,
          AccessToken: accessToken,
          RefreshToken: refreshToken,
          profilePhoto: getProfilePhoto(profile, vendor),
          vendor
        })

        payload = {
          id: query.id,
          nickname: query.nickname,
          isAdmin: query.isAdmin,
          auth: {}
        }

        payload['auth'][vendor] = {
          id: profile.id,
          profilePhoto: getProfilePhoto(profile, vendor),
          accessToken: accessToken
        }
      } else {
        await db.OAuth.createUser({
          userId: (parsedToken as Token).id,
          OAuthId: profile.id,
          AccessToken: accessToken,
          RefreshToken: refreshToken,
          profilePhoto: getProfilePhoto(profile, vendor),
          vendor
        })

        payload = {
          id: (parsedToken as Token).id,
          nickname: (parsedToken as Token).nickname,
          isAdmin: (parsedToken as Token).isAdmin,
          auth: {}
        }

        for(const key in (parsedToken as Token).auth) {
          payload['auth'][key] = {
            id: (parsedToken as Token).auth[key].id,
            profilePhoto: (parsedToken as Token).auth[key].profilePhoto,
            accessToken: (parsedToken as Token).auth[key].accessToken
          }
        }

        payload['auth'][vendor] = {
          id: profile.id,
          profilePhoto: getProfilePhoto(profile, vendor),
          accessToken: accessToken
        }
      }
    }

    done(null, payload)
  }
}
