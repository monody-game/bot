import { io } from "socket.io-client";
import config from "./config.js";
import { ServiceStatus } from "./const.js";
export class WsClient {
    connection;
    constructor() {
        this.init();
    }
    init() {
        this.connection = io(config.ws, {
            rejectUnauthorized: false,
            retries: 0,
            secure: true,
            ackTimeout: 1000,
        });
        return new Promise((resolve, reject) => {
            this.connection?.on("connect", () => {
                resolve(ServiceStatus.Ok);
            });
            this.connection?.on("connect_error", () => {
                resolve(ServiceStatus.Down);
            });
        });
    }
    drop() {
        this.connection?.disconnect();
    }
    /**
     * Returns WS connection latency
     */
    ping() {
        const start = Date.now();
        return new Promise((resolve, reject) => {
            this.connection?.emit("ping", () => {
                resolve(Date.now() - start);
            });
        });
    }
}
