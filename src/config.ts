import { Snowflake } from "discord.js";
import { parse } from "yaml";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type Config = {
  prod: EnvConfigKey;
  dev: EnvConfigKey;
  monody: {
    color: number;
    url: string;
  };
};

type EnvConfigKey = {
  channels: {
    STATUS: Snowflake;
    LINK_ACCOUNT: Snowflake;
    PLAY: Snowflake;
  };
  api: string;
};

const file: Config = parse(
  fs.readFileSync(path.join(__dirname, "../config.yml"), "utf-8")
);
let config = file.dev;

if (process.env.NODE_ENV === "production") {
  config = file.prod;
}

export default { ...config, ...file.monody };
