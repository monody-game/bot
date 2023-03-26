import config from "./config.js";
import * as https from "node:https";
import got from "got";
const agent = new https.Agent({
    rejectUnauthorized: false,
});
export async function apiFetch(endpoint, method = "GET", params = {}) {
    let body = undefined;
    let latency = 0;
    if (method !== "GET") {
        body = params;
    }
    const res = await got(config.api + endpoint, {
        retry: {
            limit: 0,
        },
        method,
        json: body,
        agent: {
            https: agent,
        },
        headers: {
            "X-NETWORK-KEY": process.env.APP_PRIVATE_NETWORK_KEY,
        },
    });
    if (res.timings.end) {
        latency = res.timings.end - res.timings.start;
    }
    if (res.statusCode !== 204) {
        return {
            ok: res.ok,
            json: JSON.parse(res.body),
            raw: res.body,
            status: res.statusCode,
            latency,
        };
    }
    else {
        return {
            ok: res.ok,
            json: {},
            raw: "",
            status: res.statusCode,
            latency,
        };
    }
}
