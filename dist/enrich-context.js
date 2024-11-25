"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrichContext = enrichContext;
function enrichContext(contextEnrichers, context) {
    return contextEnrichers.reduce((previous, current) => previous.then(current), Promise.resolve(context));
}
//# sourceMappingURL=enrich-context.js.map