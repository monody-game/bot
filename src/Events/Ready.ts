import { Client, Snowflake, TextChannel } from "discord.js";
import { Commands } from "../Commands/CommandList.js";
import config from "../config.js";
import { Embeds } from "../Utils/Embeds.js";
import { apiFetch } from "../Utils/Fetch.js";

enum ServiceStatus {
  Ok,
  Maintenance,
  Down,
}

export default (client: Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) return;

    console.log("Registering slash commands ...");
    await client.application.commands.set(Commands);
    console.log("Done.");

    await writeStatus(client);

    console.log("Bot is up !");
  });
};

const writeStatus = async function (client: Client) {
  const snowflake: Snowflake = config.channels.STATUS;

  await clearChannel(client, snowflake);

  const { status, latency } = await getApiStatus();

  const channel = client.channels.cache.get(snowflake) as TextChannel;

  await channel.send({
    embeds: [
      Embeds.base(
        `\`\`🤖\`\` Bot : 🟢\n
        \`\`⚙️\`\`️ API : ${emojify(status)} (${latency}ms)`
      ),
    ],
  });
};

const clearChannel = async function (client: Client, snowflake: Snowflake) {
  const channel = client.channels.cache.get(snowflake) as TextChannel;
  const fetched = await channel.messages.fetch({ limit: 100 });
  await channel.bulkDelete(fetched);
};

const getApiStatus = async function (): Promise<{
  status: ServiceStatus;
  latency: number;
}> {
  console.log("Retrieving API status");
  let status = ServiceStatus.Ok;
  let latency = 0;

  try {
    const res = await apiFetch("/ping");
    latency = res.latency;
  } catch (e) {
    switch (e.code) {
      case "ERR_NON_2XX_3XX_RESPONSE":
        status = ServiceStatus.Maintenance;
        break;
      case "ECONNREFUSED":
      case "ERR_GOT_REQUEST_ERROR":
      case "ETIMEDOUT":
        status = ServiceStatus.Down;
        break;
    }
  }

  return {
    status,
    latency,
  };
};

const emojify = (status: ServiceStatus): string => {
  switch (status) {
    case ServiceStatus.Ok:
      return "🟢";
    case ServiceStatus.Maintenance:
      return "🟠 (maintenance)";
    case ServiceStatus.Down:
      return "🔴 (down)";
  }
};
