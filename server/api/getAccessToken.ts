import * as db from '../db'
import axios from 'axios'
import { AxiosRequestConfig } from 'axios'

class getAccessToken {
  public async get(oauthId: string, vendor: string) {
    try {
      const query = await db.OAuth.findByOAuth(oauthId, vendor)

      console.log(query)

      if ((new Date().getTime() / 1000) - 3600 > query.updatedAt) {
        return await this.renew({
          vendor,
          oauthId,
          refreshToken: query.RefreshToken
        })
      } else {
        return query.AccessToken
      }
    } catch(error) {
      throw error
    }
  }

  private async renew(info: {
    vendor: string,
    refreshToken: string,
    oauthId: string
  }): Promise<string> {
    const { vendor, refreshToken, oauthId } = info

    let config: AxiosRequestConfig = {
      method: 'POST',
      data: {
        client_id: process.env.twitch_id!,
        client_secret: process.env.twitch_secret!,
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      }
    }

    if (vendor === 'twitch') {
      config.url = 'https://id.twitch.tv/oauth2/token'
    } else if (vendor === 'google') {
      config.url = 'https://www.googleapis.com/oauth2/v4/token'
    } else {
      throw new Error(`${vendor} is not undeclared vendor`)
    }

    try {
      const data = await axios(config)

      const { access_token } = data.data

      await db.OAuth.updateUser(oauthId, vendor, {
        AccessToken: access_token
      })

      return access_token
    } catch (error) {
      throw error
    }
  }
}

export default new getAccessToken()
