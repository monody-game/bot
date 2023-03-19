var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { singleton } from "tsyringe";
import { io } from "socket.io-client";
import config from "./config.js";
import { ServiceStatus } from "./const.js";
let WsClient = class WsClient {
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
};
WsClient = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], WsClient);
export { WsClient };
//# sourceMappingURL=WsClient.js.map