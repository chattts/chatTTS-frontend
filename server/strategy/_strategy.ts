export default (vendor: string) => { 
  return async (req: any, accessToken: string, refreshToken: string, profile: any, done: Function) => {
    let payload

    if (vendor === 'twitch') {
      const { id, username, displayName } = profile 

      payload = {
        id,
        username,
        displayName,
        profilePhoto: profile._json.logo,
        vendor
      }
    }

    done(null, payload)
  }
}
