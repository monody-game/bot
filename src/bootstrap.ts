import dotenv from "dotenv";
import {join} from "path";
import {debug} from "@moon250/yalogger";

debug("Loading .env")

dotenv.config({
  path: join(process.cwd(), ".env")
})