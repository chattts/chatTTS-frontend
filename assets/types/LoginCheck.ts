export interface Error {
  valid: false,
  status: 'Please log in'|'Token has expired'
}

export interface JWTToken {
  id: string,
  nickname: string,
  isAdmin: boolean,
  auth: { [key: string]: IOAuthUser },
  iat: number,
  exp: number,
  iss: string,
  sub: string
}

export interface IOAuthUser {
  id: string,
  profilePhoto: string,
  username: string,
  displayName: string
}