export interface IGetYoutubeLiveChatId {
  error: false,
  data: IGetYoutubeLiveChatIdData[]
}

export interface IGetYoutubeLiveChatIdData {
  title: string,
  description: string,
  thumbnails: { [key: string]: Thumbnail },
  liveChatId: string
}

export interface Thumbnail {
  url: string,
  width: number,
  height: number
}
