import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { EventPayload, RedisSubscriber } from "../../Redis/RedisSubscriber.js";
import { Client } from "discord.js";

type EventListenerCallback = (client: Client, ...data: EventPayload[]) => void;

type EventListener = {
  event: string;
  callback: EventListenerCallback;
};

type EventListenerList = { [key: string]: EventListenerCallback };

const __dirname = dirname(fileURLToPath(import.meta.url));
const subscriber = new RedisSubscriber();

export async function handle(client: Client) {
  const listenerFiles = readdirSync(join(__dirname)).filter((fileName) =>
    fileName.endsWith("Event.js")
  );
  const listeners: EventListenerList = {};

  for (const fileName of listenerFiles) {
    const imported = await import(join(__dirname, fileName));
    const listener: EventListener = imported.default;
    listeners[listener.event] = listener.callback;
  }

  await subscriber.subscribe(async (channel, message) => {
    await listeners[message.event]?.(client, message);
  });
}
