import { parse } from "yaml";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { info } from "@moon250/yalogger";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
info("Loading configuration");
const file = parse(fs.readFileSync(path.join(__dirname, "../../config.yml"), "utf-8"));
let config = file.dev;
if (process.env.NODE_ENV === "production") {
    config = file.prod;
}
export default { ...config, ...file };
