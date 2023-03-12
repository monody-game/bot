import { parse } from "yaml";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const file = parse(fs.readFileSync(path.join(__dirname, "../config.yml"), "utf-8"));
let config = file.dev;
if (process.env.NODE_ENV === "production") {
    config = file.prod;
}
export default { ...config, ...file.monody };
//# sourceMappingURL=config.js.map