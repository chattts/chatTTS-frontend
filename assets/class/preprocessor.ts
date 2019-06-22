class PreProcessor {
  public processMessage(message: string, twitchEmoji: { [key: string]: string[] }|undefined): string {
    message = this.twitchEmojiProcessor(message, twitchEmoji)
    message = this.URLProcesser(message)
    message = this.SpecialCharactorProcesser(message)

    return message
  }

  private twitchEmojiProcessor(message: string, twitchEmoji: { [key: string]: string[] }|undefined): string {
    if(twitchEmoji && Object.keys(twitchEmoji).length) {
      const emojis: string[] = []

      for(const key in twitchEmoji) {
        const data = twitchEmoji[key][0].split('-')
        
        emojis.push(message.substring(parseInt(data[0]), parseInt(data[1])+1))
      }
    
      emojis.forEach((value, index, array) => {
        message = message.split(value).join('')
      })
    }
    return message
  }

  private URLProcesser(message: string): string {
    message = message.replace(/https:\/\/(?:www\.twitch\.tv\/[a-zA-Z0-9_\/]+|clips\.twitch\.tv)\/[a-zA-Z]+/g, 'Clip')
    message = message.replace(/https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*/g, 'URL')

    // https://stackoverflow.com/a/3809435

    return message
  }

  private SpecialCharactorProcesser(message: string): string {
    message = message.replace(/\(\[\{\)\}\)/g, '')
    message = message.replace(/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g, '')

    // https://www.regextester.com/106421

    return message
  }
}

export default new PreProcessor()