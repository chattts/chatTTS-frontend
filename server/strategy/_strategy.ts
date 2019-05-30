export default (vendor: string) => { 
  return async (req: any, accessToken: string, refreshToken: string, profile: any, done: Function) => {
    let payload

    console.log(profile)

    if (vendor === 'twitch') {
      const { id, username, displayName } = profile 

      payload = {
        id,
        username,
        displayName,
        profilePhoto: profile._json.logo
      }
    }

    done(null, payload)
  }
}
