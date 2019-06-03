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
    } else if (vendor === 'google') {

      const { id, displayName, picture } = profile 

      payload = {
        id,
        username: displayName,
        displayName,
        profilePhoto: picture,
        vendor
      }
    }

    done(null, payload)
  }
}
