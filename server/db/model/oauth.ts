import redis from '../_redis'
import db from '../table'

const SUCCESS = true

class OAuth {
  static async findByUserId (userId: string): Promise<any> {
    const payload = {
      where: { userId }
    }
    const oauth = await db.OAuth.findAll(payload)

    return (!!oauth) && oauth.map((node) => node.toJSON())

    //help with https://stackoverflow.com/a/42007460/11516704
  }

  static async findByOAuth (OAuthId: number, vendor: string): Promise<any> {
    const payload = {
      where: { OAuthId, vendor }
    }
    const oauth = await db.OAuth.findOne(payload)

    return (!!oauth) && oauth.toJSON()
  }

  static async createUser (user: { userId: string, OAuthId: number, vendor: string }): Promise<boolean> {
    const { userId, OAuthId, vendor } = user
    const payload = { userId, OAuthId, vendor }

    await db.OAuth.create(payload)

    return SUCCESS
  }
}

export default OAuth
