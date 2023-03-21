import { Commands } from "../Commands/CommandList.js";
import config from "../Utils/config.js";
import { Embeds } from "../Utils/Embeds.js";
import { apiFetch } from "../Utils/Fetch.js";
import { WsClient } from "../Utils/WsClient.js";
import { ServiceStatus } from "../Utils/const.js";
import { debug, info, success } from "@moon250/yalogger";
const wsClient = new WsClient();
export default (client) => {
    client.on("ready", async () => {
        if (!client.user || !client.application)
            return;
        info("Registering slash commands ...");
        await client.application.commands.set(Commands);
        await writeStatus(client);
        setInterval(async () => {
            await writeStatus(client);
        }, 60000);
        success("Bot is up !");
    });
};
/**
 * Write the embed with services' status
 */
const writeStatus = async function (client) {
    const snowflake = config.channels.STATUS;
    const apiStatus = await getApiStatus();
    const wsStatus = await getWsStatus();
    // Dropping ws connection in order to not stack connections for further needs
    wsClient.drop();
    const channel = client.channels.cache.get(snowflake);
    const date = new Date();
    const embed = Embeds.base(`\`\`🤖\`\` Bot : 🟢\n
        \`\`⚙️\`\`️ API : ${emojify(apiStatus.status, apiStatus.latency)}\n
        \`\`🔗️\`\`️ WS : ${emojify(wsStatus.status, wsStatus.latency)}`, `État des services (<t:${Math.floor(Date.now() / 1000)}:t>)`);
    const fetched = await channel.messages.fetch({ limit: 1 });
    const message = fetched.first();
    if (!message?.author.bot) {
        await clearChannel(client, snowflake);
        await channel.send({
            embeds: [embed],
        });
        return;
    }
    await message.edit({
        embeds: [embed],
    });
};
const clearChannel = async function (client, snowflake) {
    const channel = client.channels.cache.get(snowflake);
    const fetched = await channel.messages.fetch({ limit: 100 });
    await channel.bulkDelete(fetched);
};
const getApiStatus = async function () {
    debug("Retrieving API status");
    let status = ServiceStatus.Ok;
    let latency = 0;
    try {
        const res = await apiFetch("/ping");
        latency = res.latency;
    }
    catch (e) {
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
const getWsStatus = async function () {
    debug("Retrieving WS status");
    const status = await wsClient.init();
    return {
        latency: await wsClient.ping(),
        status,
    };
};
const emojify = (status, latency) => {
    switch (status) {
        case ServiceStatus.Ok:
            return `🟢 (${latency}ms)`;
        case ServiceStatus.Maintenance:
            return "🟠 (maintenance)";
        case ServiceStatus.Down:
            return "🔴 (down)";
    }
};
