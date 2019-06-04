import redis from '../_redis'
import db from '../table'

const SUCCESS = true

class Language {
  public static async find(id: string, vendor: string) {
    const result = await db.OAuth.findOne({
      where: {
        id,
        vendor
      }
    })
  }
}