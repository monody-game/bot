import { Client } from "discord.js";
import ready from "./Ready.js";
import interactionCreate from "./InteractionCreate.js";
import { debug } from "@moon250/yalogger";
import { handle } from "./Websockets/WsEventHandler.js";

export default async (client: Client): Promise<void> => {
  debug("Listening and handling events ...");
  ready(client);
  interactionCreate(client);

  debug("Handling WS events ...");
  await handle();
};
