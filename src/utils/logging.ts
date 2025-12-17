/**
 * Logging utilities for F5XC API MCP Server
 *
 * Uses stderr for logging to avoid interfering with STDIO transport.
 * Provides structured logging with levels and context.
 */

/**
 * Log levels
 */
export enum LogLevel {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

/**
 * Log level priority for filtering
 */
const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  [LogLevel.DEBUG]: 0,
  [LogLevel.INFO]: 1,
  [LogLevel.WARN]: 2,
  [LogLevel.ERROR]: 3,
};

/**
 * Logger configuration
 */
export interface LoggerConfig {
  /** Minimum log level to output */
  level: LogLevel;
  /** Include timestamp in log output */
  timestamps: boolean;
  /** Enable JSON format for structured logging */
  json: boolean;
}

/**
 * Default logger configuration
 */
const DEFAULT_CONFIG: LoggerConfig = {
  level: LogLevel.INFO,
  timestamps: true,
  json: false,
};

/**
 * Log entry structure
 */
interface LogEntry {
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  timestamp?: string;
}

/**
 * Logger class for structured logging to stderr
 */
class Logger {
  private config: LoggerConfig;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };

    // Check for environment variable overrides
    const envLevel = process.env["LOG_LEVEL"]?.toLowerCase();
    if (envLevel && Object.values(LogLevel).includes(envLevel as LogLevel)) {
      this.config.level = envLevel as LogLevel;
    }

    if (process.env["LOG_JSON"] === "true") {
      this.config.json = true;
    }
  }

  /**
   * Check if a log level should be output
   */
  private shouldLog(level: LogLevel): boolean {
    return (
      LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[this.config.level]
    );
  }

  /**
   * Format and output a log entry
   */
  private log(entry: LogEntry): void {
    if (!this.shouldLog(entry.level)) {
      return;
    }

    if (this.config.timestamps) {
      entry.timestamp = new Date().toISOString();
    }

    if (this.config.json) {
      // Structured JSON output
      process.stderr.write(JSON.stringify(entry) + "\n");
    } else {
      // Human-readable output
      const parts: string[] = [];

      if (entry.timestamp) {
        parts.push(`[${entry.timestamp}]`);
      }

      parts.push(`[${entry.level.toUpperCase()}]`);
      parts.push(entry.message);

      if (entry.context && Object.keys(entry.context).length > 0) {
        parts.push(JSON.stringify(entry.context));
      }

      process.stderr.write(parts.join(" ") + "\n");
    }
  }

  /**
   * Log a debug message
   */
  debug(message: string, context?: Record<string, unknown>): void {
    this.log({ level: LogLevel.DEBUG, message, context });
  }

  /**
   * Log an info message
   */
  info(message: string, context?: Record<string, unknown>): void {
    this.log({ level: LogLevel.INFO, message, context });
  }

  /**
   * Log a warning message
   */
  warn(message: string, context?: Record<string, unknown>): void {
    this.log({ level: LogLevel.WARN, message, context });
  }

  /**
   * Log an error message
   */
  error(message: string, context?: Record<string, unknown>): void {
    this.log({ level: LogLevel.ERROR, message, context });
  }

  /**
   * Set the minimum log level
   */
  setLevel(level: LogLevel): void {
    this.config.level = level;
  }

  /**
   * Get current configuration
   */
  getConfig(): Readonly<LoggerConfig> {
    return Object.freeze({ ...this.config });
  }
}

/**
 * Singleton logger instance
 */
export const logger = new Logger();

/**
 * Create a child logger with additional context
 */
export function createLogger(config?: Partial<LoggerConfig>): Logger {
  return new Logger(config);
}
