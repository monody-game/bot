import ready from "./Ready.js";
import interactionCreate from "./InteractionCreate.js";
import { debug } from "@moon250/yalogger";
export default async (client) => {
    debug("Listening and handling events ...");
    ready(client);
    interactionCreate(client);
};
//# sourceMappingURL=EventHandler.js.map