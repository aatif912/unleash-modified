"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCounter = void 0;
const prom_client_1 = require("prom-client");
/**
 * Creates a wrapped instance of prom-client's Counter, overriding some of its methods for enhanced functionality and type-safety.
 *
 * @param options - The configuration options for the Counter, as defined in prom-client's CounterConfiguration.
 *               See prom-client documentation for detailed options: https://github.com/siimon/prom-client#counter
 * @returns An object containing the wrapped Counter instance and custom methods.
 */
const createCounter = (options) => {
    /**
     * The underlying instance of prom-client's Counter.
     */
    const counter = new prom_client_1.Counter(options);
    /**
     * Applies given labels to the counter. Labels are key-value pairs.
     * This method wraps the original Counter's labels method for additional type-safety, requiring all configured labels to be specified.
     *
     * @param labels - An object where keys are label names and values are the label values.
     * @returns The Counter instance with the applied labels, allowing for method chaining.
     */
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const labels = (labels) => counter.labels(labels);
    /**
     * Increments the counter by a specified value or by 1 if no value is provided.
     * Wraps the original Counter's inc method.
     *
     * @param value - (Optional) The value to increment the counter by. If not provided, defaults to 1.
     */
    const inc = (value) => counter.inc(value);
    /**
     * A convenience method that combines setting labels and incrementing the counter.
     * Useful for incrementing with labels in a single call.
     *
     * @param labels - An object where keys are label names and values are the label values.
     * @param value - (Optional) The value to increment the counter by. If not provided, defaults to 1.
     */
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const increment = (labels, value) => counter.labels(labels).inc(value);
    return {
        counter,
        labels,
        inc,
        increment,
    };
};
exports.createCounter = createCounter;
//# sourceMappingURL=createCounter.js.map