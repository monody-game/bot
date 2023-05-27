import { Command } from "./Command.js";
import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const listenerFiles = readdirSync(join(__dirname)).filter(
  (fileName) => fileName.endsWith("Command.js") && fileName !== "Command.js"
);
const Commands: Command[] = [];

for (const fileName of listenerFiles) {
  const imported = await import(join(__dirname, fileName));
  const command: Command = imported.default;
  Commands.push(command);
}

export { Commands };
