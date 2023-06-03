import { Command } from "./Command.js";
import { EmbedBuilder, SlashCommandIntegerOption } from "discord.js";
import { apiFetch } from "../Utils/Fetch.js";
import { APIApplicationCommandOptionChoice } from "discord-api-types/v10";
import { Embeds } from "../Utils/Embeds.js";
import config from "../Utils/config.js";

const response = await apiFetch("/roles/list");
const list: string[] = Object.values(response.json.data.roles);

const roles: APIApplicationCommandOptionChoice<number>[] = list.map(
  (role: string) => {
    return { name: role, value: list.indexOf(role) + 1 };
  }
);

export default {
  name: "role",
  description: "Affiche des informations sur un role",
  async callback(interaction) {
    const id = interaction.options.get("role")?.value;
    const response = await apiFetch(`/roles/get/${id}`);
    const role = response.json.data.role;
    const color =
      role.team.id === 1 ? config.colors.villagers : config.colors.werewolves;

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor(role.team.id === 3 ? config.colors.loners : color)
          .setTitle(role.display_name)
          .setDescription(role.description)
          .setFields(
            { name: "**Camp**", value: role.team.display_name, inline: true },
            {
              name: "**Limite par partie**",
              value: role.limit !== -1 ? `${role.limit}` : "Aucune",
              inline: true,
            }
          )
          .setThumbnail(config.monody.url + role.image + "?w=128")
          .setFooter({ text: Embeds.getFooter(), iconURL: Embeds.iconUrl }),
      ],
    });
  },
  options: [
    new SlashCommandIntegerOption()
      .setName("role")
      .setDescription("Le rôle à afficher")
      .setRequired(true)
      .addChoices(...roles),
  ],
} as Command;
