import { EventPayload } from "../../Redis/RedisSubscriber.js";
import { Embeds } from "../../Utils/Embeds.js";
import {
  ActionRowBuilder,
  ButtonBuilder,
  Client,
  TextChannel,
  ButtonStyle,
} from "discord.js";
import config from "../../Utils/config.js";
import { client as redisClient } from "../../Redis/Connection.js";
import { clearSharedGame } from "./ClearGameInvitationsEvent.js";

type GamePayload = {
  id: string;
  type: number;
  owner: {
    id: string;
    username: string;
    avatar: string;
  };
  users: string[];
  dead_users: string[];
  assigned_roles: { [key: string]: string };
  roles: { [key: string]: number };
  is_started: boolean;
};

export default {
  event: "game.invite",
  async callback(client: Client, payload: EventPayload) {
    await clearSharedGame(client);

    const game = payload.data.payload as GamePayload;
    const channel = client.channels.cache.get(
      config.channels.SHARE_GAME,
    ) as TextChannel;

    const embed = Embeds.base(
      `**${game.owner.username}** vous invite à rejoindre sa partie !`,
    );
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel("Rejoindre")
        .setURL(`${config.base}/game/${game.id}`)
        .setStyle(ButtonStyle.Link),
    );

    const message = await channel.send({
      embeds: [embed],
      components: [row],
    });
    const shared = JSON.parse(
      (await redisClient.get("bot:game:shared")) ?? "{}",
    );

    shared[game.id] = message.id;

    await redisClient.set("bot:game:shared", JSON.stringify(shared));
  },
};
