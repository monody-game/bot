import { Client } from "discord.js";
import ready from "./Ready";
import interactionCreate from "./InteractionCreate";

export default async (client: Client): Promise<void> => {
  ready(client);
  interactionCreate(client);
};
