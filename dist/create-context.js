"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = createContext;
function tryParseDate(dateString) {
    if (!dateString) {
        return undefined;
    }
    const parsedDate = new Date(dateString);
    if (!Number.isNaN(parsedDate.getTime())) {
        return parsedDate;
    }
    else {
        return undefined;
    }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createContext(value) {
    const { appName, environment, userId, sessionId, remoteAddress, properties, currentTime, ...rest } = value;
    // move non root context fields to properties
    const context = {
        appName,
        environment,
        userId,
        sessionId,
        remoteAddress,
        currentTime: tryParseDate(currentTime),
        properties: Object.assign({}, rest, properties),
    };
    // Clean undefined properties on the context
    const cleanContext = Object.keys(context)
        .filter((k) => context[k])
        .reduce((a, k) => ({ ...a, [k]: context[k] }), {});
    return cleanContext;
}
//# sourceMappingURL=create-context.js.map