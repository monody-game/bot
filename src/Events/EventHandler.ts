import { Client } from "discord.js";
import { debug } from "@moon250/yalogger";
import ready from "./Ready.js";
import interactionCreate from "./InteractionCreate.js";
import voiceStateUpdate from "./VoiceStateUpdate.js";
import { handle } from "./Websockets/WsEventHandler.js";

export default async (client: Client): Promise<void> => {
  debug("Listening and handling events ...");
  ready(client);
  interactionCreate(client);
  voiceStateUpdate(client);

  debug("Handling WS events ...");
  await handle(client);
};
