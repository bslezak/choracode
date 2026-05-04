import log from "electron-log";

// Configure electron-log
log.transports.console.format = "[{h}:{i}:{s}:{ms}] [{level}] {text}";

// Add a hook to extract log level from message data if it follows the pattern
log.hooks.push((message) => {
  const [level, template, params] = message.data;

  if (
    level &&
    (level === "info" ||
      level === "error" ||
      level === "warn" ||
      level === "debug") &&
    template &&
    typeof template === "string"
  ) {
    // Extract level and pass the rest as message data
    message.data = [template, ...(params != null ? [params] : [])];
    message.level = level;
  }

  return message;
});

// Because electron-log doesn't support structured logging out of the box, we can add a hook to format messages that
// follow a specific pattern (e.g., "Message {key} with value {value}")
log.hooks.push((message) => {
  const [template, params] = message.data;

  // Only process if it's (string, object)
  if (typeof template === "string" && params && typeof params === "object") {
    const formatted = template.replace(/\{(\w+)\}/g, (_, key) => {
      return key in params ? String(params[key]) : `{${key}}`;
    });

    // Replace message data with formatted string and original params
    message.data = [formatted, params];
  }

  return message;
});

// Override console.log to use electron-log's logging mechanism
console.log = log.log;

/**
 * Primary logger abstraction for the application. This allows us to swap out the underlying logging implementation
 */
export interface Logger {
  debug(message: string, meta?: object): void;
  info(message: string, meta?: object): void;
  warn(message: string, meta?: object): void;
  error(message: string, meta?: object): void;

  log(
    level: "debug" | "info" | "warn" | "error",
    message: string,
    meta?: object,
  ): void;
}

export function getLogger(): Logger {
  return log as unknown as Logger;
}
