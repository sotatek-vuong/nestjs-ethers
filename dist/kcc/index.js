"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNetwork = exports.getDefaultProvider = exports.KccscanProvider = void 0;
const kccscan_provider_1 = require("./kccscan-provider");
Object.defineProperty(exports, "KccscanProvider", { enumerable: true, get: function () { return kccscan_provider_1.KccscanProvider; } });
const default_provider_1 = require("./default-provider");
Object.defineProperty(exports, "getDefaultProvider", { enumerable: true, get: function () { return default_provider_1.getDefaultProvider; } });
const networks_1 = require("./networks");
Object.defineProperty(exports, "getNetwork", { enumerable: true, get: function () { return networks_1.getNetwork; } });
//# sourceMappingURL=index.js.map