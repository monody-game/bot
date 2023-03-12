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
        body = JSON.stringify(body);
    }
    const res = await got(config.api + endpoint, {
        retry: {
            limit: 0,
        },
        method,
        body,
        agent: {
            https: agent,
        },
    });
    if (res.timings.end) {
        latency = res.timings.end - res.timings.start;
    }
    return {
        ok: res.ok,
        json: JSON.parse(res.body),
        raw: res.body,
        status: res.statusCode,
        latency,
    };
}
//# sourceMappingURL=Fetch.js.map