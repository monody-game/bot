import config from "../config.js";
import * as https from "node:https";
import got from "got";

type HttpMethod = "GET" | "HEAD" | "POST" | "PUT" | "PATCH" | "DELETE";
type FetchResponse = {
  ok: boolean;
  json: object;
  raw: string;
  status: number;
};

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export async function apiFetch(
  endpoint: string,
  method: HttpMethod = "GET",
  params: object | undefined = {}
): Promise<FetchResponse> {
  let body = undefined;

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

  return {
    ok: res.ok,
    json: JSON.parse(res.body),
    raw: res.body,
    status: res.statusCode,
  };
}
