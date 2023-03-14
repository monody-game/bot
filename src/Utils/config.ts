import { Snowflake } from "discord.js";
import { parse } from "yaml";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { info } from "@moon250/yalogger";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type Config = {
  prod: EnvConfigKey;
  dev: EnvConfigKey;
  monody: {
    url: string;
  };
  colors: {
    monody: number
    success: number
    info: number
    warn: number
    error: number
  }
};

type EnvConfigKey = {
  channels: {
    STATUS: Snowflake;
    LINK_ACCOUNT: Snowflake;
    PLAY: Snowflake;
  };
  api: string;
  ws: string;
};

info("Loading configuration");

const file: Config = parse(
  fs.readFileSync(path.join(__dirname, "../../config.yml"), "utf-8")
);

let config: EnvConfigKey = file.dev;

if (process.env.NODE_ENV === "production") {
  config = file.prod;
}

export default { ...config, ...file };
