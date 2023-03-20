import {Client, ChannelType, PermissionsBitField} from "discord.js";
import { error, log } from "@moon250/yalogger";
import config from "../../Utils/config.js";
import { EventPayload } from "../../Redis/RedisSubscriber.js";

type Payload = {
  owner: {
    username: string
    discord_id: string
  }
  game_id: string
  size: number
}

export default {
  event: "game.vocal.create",
  async callback(client: Client, event: EventPayload) {
    const guild = client.guilds.cache.get(config.guild)
    const payload = event.data.payload as Payload

    if(!guild) {
      error(`Guild ${config.guild} not found`)
      return;
    }

    await guild.channels.create({
      name: `Partie de ${payload.owner.username}`,
      type: ChannelType.GuildVoice,
      parent: config.channels.GAME_CATEGORY,
      userLimit: payload.size,
      permissionOverwrites: [
        {
          id: guild.id,
          deny: [PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.ViewChannel]
        },
        {
          id: payload.owner.discord_id,
          allow: [PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.ViewChannel]
        }
      ]
    })
  },
};
