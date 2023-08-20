import { connection } from "./Connection.js";
import { error } from "@moon250/yalogger";

type EventListenerCallback = (
  channel: string,
  message: EventPayload,
) => Promise<void>;

type EventPayload = {
  data: {
    recipients?: string[];
    private?: boolean;
    volatile?: boolean;
    payload: object | string;
    socket: string | null;
    channel: string;
  };
  event: string;
  socket: string | null;
};

export class RedisSubscriber {
  private sub: typeof connection;

  constructor() {
    this.sub = connection.duplicate();
    this.sub.connect();
  }

  async subscribe(callback: EventListenerCallback) {
    await this.sub.pSubscribe("*", async (message: string, channel: string) => {
      try {
        const event = JSON.parse(message);
        return await callback(channel, JSON.parse(message));
      } catch (e) {
        error(e);
      }
    });
  }

  async unsubscribe() {
    await this.sub.pUnsubscribe("*");
    await this.sub.disconnect();
  }
}

export { EventPayload };
