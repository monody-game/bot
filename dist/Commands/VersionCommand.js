import { Embeds } from "../Utils/Embeds.js";
import { apiFetch } from "../Utils/Fetch.js";
export const VersionCommand = {
    name: "version",
    description: "Affiche des informations sur la version du bot",
    async callback(interaction) {
        const res = await apiFetch("/ping");
        await interaction.reply({
            embeds: [
                Embeds.base(`\`\`🤖\`\` Bot : ${process.env.APP_VERSION}\n
          \`\`⚙️\`\`️ API : ${res.json.meta.version}`, "Version"),
            ],
        });
    },
};
