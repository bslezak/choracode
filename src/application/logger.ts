import log from 'electron-log';

// Configure electron-log
log.transports.console.format = '[{h}:{i}:{s}:{ms}] [{level}] {text}';

// Override console.log to use electron-log's logging mechanism
console.log = log.log;

/**
 * Primary logger abstraction for the application. This allows us to swap out the underlying logging implementation
 */
export interface Logger {
    debug(message: string): void;
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    log(level: string, message: string, meta?: any): void;
}

function determineLevel(level: string): (typeof log.debug | typeof log.info | typeof log.warn | typeof log.error | typeof log.log) {
    switch (level) {
        case 'debug':
            return log.debug;
        case 'info':
            return log.info;
        case 'warn':
            return log.warn;
        case 'error':
            return log.error;
        default:
            return log.info;
    }
}

// Because electron-log's log method is just a shortcut to info(), we need to override it to match the expected signature of our Logger interface.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const newLogFunction = (level: string, message: string, meta?: any) => {
    const logMethod = determineLevel(level);
    logMethod(message, meta);
}

Object.assign(log, { log: newLogFunction });

export function getLogger(): Logger {
    return log as unknown as Logger;
}