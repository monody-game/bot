"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yaml_1 = require("yaml");
const file = (0, yaml_1.parse)('../config.yml');
let config = file.dev;
if (process.env.NODE_ENV === "production") {
    config = file.prod;
}
exports.default = config;
//# sourceMappingURL=config.js.map