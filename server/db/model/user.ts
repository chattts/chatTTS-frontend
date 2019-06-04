// import redis from '../_redis'
import table from '../table'

const SUCCESS = true

class User {
  static async findById (id: string): Promise<IUser> {
    const payload = {
      where: { id }
    }
    const user = await table.User.findOne(payload)

    return (!!user) && user.toJSON() as IUser
  }

  static async create (nickname: string ): Promise<IUser> {
    const payload = {
      nickname
    }

    const data = await table.User.create(payload)

    return data.toJSON() as IUser
  }

  static async delete (id: string): Promise<boolean> {
    const payload = {
      where: { id }
    }

    await table.User.destroy(payload)

    return SUCCESS
  }

  static async setAdmin (id: string): Promise<boolean> {
    const payload = {
      where: { id }
    }
    const updateData = {
      isAdmin: true
    }

    await table.User.update(updateData, payload)
    return SUCCESS
  }

  static async unSetAdmin (id: string): Promise<boolean> {
    const payload = {
      where: { id }
    }
    const updateData = {
      isAdmin: false
    }

    await table.User.update(updateData, payload)
    return SUCCESS
  }
}

export default User

export interface IUser {
  id: string,
  nickname: string,
  isAdmin: boolean,
  createdAt: number,
  updatedAt: number
}
