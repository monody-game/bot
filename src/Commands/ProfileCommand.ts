import { Command } from "./Command.js";
import { Embeds } from "../Utils/Embeds.js";
import { apiFetch } from "../Utils/Fetch.js";
import { error, log } from "@moon250/yalogger";
import config from "../Utils/config.js";
import {
  SlashCommandIntegerOption,
  SlashCommandStringOption,
} from "discord.js";

type User = {
  id: "";
};

export default {
  name: "profil",
  description: "Affiche votre profil Monody",
  async callback(interaction) {
    await interaction.deferReply();

    const option = interaction.options.get("theme");
    const theme = option && option.value ? option.value : "light";

    let user: User = {
      id: "",
    };

    try {
      const userRequest = await apiFetch(
        `/user/discord/${interaction.user.id}`
      );
      user = userRequest.json.data.user;
      await apiFetch(`/user/discord/${interaction.user.id}/share/${theme}`);
    } catch (e) {
      await interaction.editReply({
        embeds: [
          Embeds.error(
            "Une erreur est survenue ... Avez-vous connecté votre compte Discord à Monody ?"
          ),
        ],
      });

      error(e.toString());
      return;
    }

    await interaction.editReply({
      embeds: [
        Embeds.image(
          config.api.replace("api", "assets") + `/profiles/${user.id}.png`
        ),
      ],
    });
  },
  options: [
    new SlashCommandStringOption()
      .setName("theme")
      .setDescription("Thème du profil")
      .setRequired(false)
      .addChoices(
        { name: "Clair", value: "light" },
        { name: "Sombre", value: "dark" }
      ),
  ],
} as Command;
