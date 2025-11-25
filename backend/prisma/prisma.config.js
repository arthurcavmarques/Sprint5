"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("prisma/config");
require("dotenv/config");
exports.default = (0, config_1.defineConfig)({
    datasource: {
        url: (0, config_1.env)('DATABASE_URL_UNPOOLED'),
    },
});
//# sourceMappingURL=prisma.config.js.map