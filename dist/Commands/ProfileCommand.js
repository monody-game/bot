import { Embeds } from "../Utils/Embeds.js";
import { apiFetch } from "../Utils/Fetch.js";
import { error } from "@moon250/yalogger";
import config from "../Utils/config.js";
import { SlashCommandStringOption, } from "discord.js";
export default {
    name: "profil",
    description: "Affiche votre profil Monody",
    async callback(interaction) {
        await interaction.deferReply();
        const option = interaction.options.get("theme");
        const theme = option && option.value ? option.value : "light";
        let user = {
            id: "",
        };
        try {
            const userRequest = await apiFetch(`/user/discord/${interaction.user.id}`);
            user = userRequest.json.data.user;
            await apiFetch(`/user/discord/${interaction.user.id}/share/${theme}`);
        }
        catch (e) {
            await interaction.editReply({
                embeds: [
                    Embeds.error("Une erreur est survenue ... Avez-vous connecté votre compte Discord à Monody ?"),
                ],
            });
            error(e.toString());
            return;
        }
        await interaction.editReply({
            embeds: [
                Embeds.image(config.api.replace("api", "assets") + `/profiles/${user.id}.png`),
            ],
        });
    },
    options: [
        new SlashCommandStringOption()
            .setName("theme")
            .setDescription("Thème du profil")
            .setRequired(false)
            .addChoices({ name: "Clair", value: "light" }, { name: "Sombre", value: "dark" }),
    ],
};
