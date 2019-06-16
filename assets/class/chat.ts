export default class Chat {
  public displayName: string
  public message: string
  public emotes: { [key: string]: string[] }|undefined
  public userType: string|undefined
  public badges: { [key: string]: string }|undefined
  public status: 'wait'|'reading'|'read'|'not_read'
  public vendor: string

  constructor(data: {
    displayName: string,
    message: string,
    emotes: { [key: string]: string[] }|undefined,
    userType: string|undefined,
    badges: { [key: string]: string }|undefined,
    status: 'wait'|'reading'|'read'|'not_read'
    vendor: string
  }) {
    this.displayName = data.displayName
    this.message = data.message
    this.emotes = data.emotes
    this.userType = data.userType
    this.badges = data.badges
    this.status = data.status
    this.vendor = data.vendor
  }

  changeStatus(status: 'wait'|'reading'|'read'|'not_read'): boolean {
    this.status = status

    return true
  }
}