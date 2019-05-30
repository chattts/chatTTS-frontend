import { Response } from 'express'

class sessToken {
  static getToken (req: Response): string {
    return req.cookie['authencation']
  }

  static setToken (res: Response, token: string): void {
    res.cookie('authencation', token, {
      httpOnly: true,
      maxAge: 604800 
    })
  }
}

export default sessToken