import { Snowflake } from "discord.js";
import { parse } from "yaml";

type Config = {
    prod: ConfigKey
    dev: ConfigKey
}

type ConfigKey = {
    channels: {
        STATUS: Snowflake
        LINK_ACCOUNT: Snowflake
        PLAY: Snowflake
    }
}

const file: Config = parse('../config.yml')
let config = file.dev

if(process.env.NODE_ENV === "production") {
    config = file.prod
}

export default config