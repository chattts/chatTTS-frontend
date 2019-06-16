export interface ISuccess {
  error: false,
  data: {
    vendor: string,
    displayName: string,
    message: string,
    emotes: { [key: string]: string[] }|undefined,
    userType: string|undefined,
    badges: { [key: string]: string }|undefined
  }
}

export interface IError {
  error: true,
  data: string
}