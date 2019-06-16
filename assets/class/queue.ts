import Chat from "./chat";

export default class ChatQueue {
  private timer: NodeJS.Timer|null
  private queue: Chat[] = []

  constructor() {
    this.timer = null
  }

  public add(data: Chat): void {
    this.queue.push(data)
  }

  public remove(index: number): void {
    this.queue.splice(index, 1);
  }

  public clear(): void {
    this.queue = []
  }

  public run(logic: (data: Chat) => void): void {
    this.timer = setInterval(() => logic(this.queue[0]), 100)
  }

  public stop(): void {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}