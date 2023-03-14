import { Command } from "./Command.js";
import { PingCommand } from "./PingCommand.js";
import { ProfileCommand } from "./ProfileCommand.js";

export const Commands: Command[] = [PingCommand, ProfileCommand];
