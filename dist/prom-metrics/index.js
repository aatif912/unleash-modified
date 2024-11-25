"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastMetricsFetch = exports.lastMetricsUpdate = void 0;
const createGauge_1 = require("./createGauge");
const createCounter_1 = require("./createCounter");
__exportStar(require("./createCounter"), exports);
__exportStar(require("./createGauge"), exports);
exports.lastMetricsUpdate = (0, createGauge_1.createGauge)({
    name: 'last_metrics_update_epoch_timestamp_ms',
    help: 'An epoch timestamp (in milliseconds) set to when our unleash-client last got an update from upstream Unleash',
});
exports.lastMetricsFetch = (0, createGauge_1.createGauge)({
    name: 'last_metrics_fetch_epoch_timestamp_ms',
    help: 'An epoch timestamp (in milliseconds) set to when our unleash-client last checked (regardless if there was an update or not)',
});
(0, createCounter_1.createCounter)({
    name: 'unleash_proxy_up',
    help: 'Indication that the service is up.',
}).inc(1);
//# sourceMappingURL=index.js.map