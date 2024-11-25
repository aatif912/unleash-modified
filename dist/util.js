"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInstanceId = generateInstanceId;
const node_os_1 = require("node:os");
function generateInstanceId() {
    let info;
    try {
        info = (0, node_os_1.userInfo)();
    }
    catch (e) {
        // unable to read info;
    }
    const prefix = info
        ? info.username
        : `generated-${Math.round(Math.random() * 1000000)}-${process.pid}`;
    return `${prefix}-${(0, node_os_1.hostname)()}`;
}
//# sourceMappingURL=util.js.map