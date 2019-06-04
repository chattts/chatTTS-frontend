import table from '../table'

const SUCCESS = true

class User {
  static async findById (id: string): Promise<any> {
    const payload = {
      where: { id }
    }
    const user = await table.User.findOne(payload)

    return (!!user) && user.toJSON()
  }

  static async findByNick (nickname: string): Promise<any> {
    const payload = {
      where: { nickname }
    }
    const user = await table.User.findOne(payload)

    return (!!user) && user.toJSON()
  }

  static async register (user: { email: string, nickname: string }): Promise<boolean> {
    const { email, nickname } = user

    const payload = {
      email,
      nickname
    }

    await table.User.create(payload)

    return SUCCESS
  }

  static async unregister (id: string): Promise<boolean> {
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
