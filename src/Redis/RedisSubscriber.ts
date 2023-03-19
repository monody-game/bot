import {client} from "./Connection.js";

type EventListenerCallback = (channel: string, message: EventPayload) => Promise<void>

type EventPayload = {
  data: {
    recipients?: string[]
    private?: boolean
    volatile?: boolean
    payload: object|string
  }
  event: string
  socket: string
}

export class RedisSubscriber {
  private sub: typeof client

  constructor() {
    this.sub = client.duplicate()
    this.sub.connect()
  }

  async subscribe(callback: EventListenerCallback) {
    await this.sub.pSubscribe("*", async (message: string, channel: string) => {
      return await callback(channel, JSON.parse(message))
    })
  }

  async unsubscribe() {
    await this.sub.pUnsubscribe("*")
    await this.sub.disconnect()
  }
}