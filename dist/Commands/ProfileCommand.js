import { Embeds } from "../Utils/Embeds.js";
import { apiFetch } from "../Utils/Fetch.js";
import { error } from "@moon250/yalogger";
import config from "../Utils/config.js";
export const ProfileCommand = {
    name: "profil",
    description: "Affiche votre profil Monody",
    async callback(interaction) {
        await interaction.deferReply({ ephemeral: true });
        let user = {
            id: ''
        };
        try {
            const userRequest = await apiFetch(`/user/discord/${interaction.user.id}`);
            user = userRequest.json[0];
            await apiFetch(`/user/discord/${interaction.user.id}/share/light`);
        }
        catch (e) {
            error(e.toString());
        }
        await interaction.editReply({
            embeds: [
                Embeds.image(config.api.replace('api', 'assets') + `/profiles/${user.id}.png`)
            ]
        });
    },
};
//# sourceMappingURL=ProfileCommand.js.map