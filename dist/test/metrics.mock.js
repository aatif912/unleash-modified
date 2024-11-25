"use strict";
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const metrics_1 = __importDefault(require("unleash-client/lib/metrics"));
class FakeMetrics extends metrics_1.default {
    constructor() {
        super(...arguments);
        this.recordedCount = [];
        this.recordedCountVariant = [];
    }
    start() { }
    count(name, enabled) {
        this.recordedCount.push([name, enabled]);
    }
    countVariant(name, variantName) {
        this.recordedCountVariant.push([name, variantName]);
    }
    on() {
        return this;
    }
}
exports.default = FakeMetrics;
//# sourceMappingURL=metrics.mock.js.map