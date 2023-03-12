import {singleton} from "tsyringe";
import {io, Socket} from "socket.io-client";
import config from "../config.js";

@singleton()
export class WsClient {
  public connection: Socket;

  constructor() {
    this.connection = io(config.ws, {
      rejectUnauthorized: false,
      secure: true
    })

    this.connection.on('error', () => {
      console.log('Error connecting to socket')
    })
  }

  /**
   * Returns WS connection latency
   */
  public ping(): Promise<number>
  {
    const start = Date.now();

    return new Promise((resolve, reject) => {
      this.connection.emit('ping', () => {
        resolve(Date.now() - start);
      })
    })
  }
}