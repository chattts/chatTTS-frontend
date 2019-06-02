export default class Chat {
  public displayName: string|null
  public username: string
  public message: string
  public emotes: string[]|null
  public userType: string|null
  public badges: { [key: string]: number }|null
  public status: 'wait'|'read'|'not_read'

  constructor(data: {
    username: string,
    displayName: string|null,
    message: string,
    emotes: string[]|null,
    userType: string|null,
    badges: { [key: string]: number }|null,
    status: 'wait'|'read'|'not_read'
  }) {
    this.displayName = data.displayName
    this.username = data.username
    this.message = data.message
    this.emotes = data.emotes
    this.userType = data.userType
    this.badges = data.badges
    this.status = data.status
  }

  changeStatus(status: 'wait'|'read'|'not_read'): boolean {
    this.status = status

    return true
  }
}