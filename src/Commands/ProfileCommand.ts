import { Command } from "./Command.js";
import { Embeds } from "../Utils/Embeds.js";
import { apiFetch } from "../Utils/Fetch.js";
import { error, log } from "@moon250/yalogger";
import config from "../Utils/config.js";

type User = {
  id: "";
};

export const ProfileCommand: Command = {
  name: "profil",
  description: "Affiche votre profil Monody",
  async callback(interaction) {
    await interaction.deferReply();

    let user: User = {
      id: "",
    };

    try {
      const userRequest = await apiFetch(
        `/user/discord/${interaction.user.id}`
      );
      user = userRequest.json[0];
      await apiFetch(`/user/discord/${interaction.user.id}/share/light`);
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
};
