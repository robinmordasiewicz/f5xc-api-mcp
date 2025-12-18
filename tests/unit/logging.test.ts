/**
 * Unit Tests for Logging Utilities
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  LogLevel,
  logger,
  createLogger,
  type LoggerConfig,
} from "../../src/utils/logging.js";

describe("logging", () => {
  const originalEnv = process.env;
  let stderrWriteSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
    delete process.env.LOG_LEVEL;
    delete process.env.LOG_JSON;
    stderrWriteSpy = vi.spyOn(process.stderr, "write").mockImplementation(() => true);
  });

  afterEach(() => {
    process.env = originalEnv;
    stderrWriteSpy.mockRestore();
  });

  describe("LogLevel enum", () => {
    it("should have correct values", () => {
      expect(LogLevel.DEBUG).toBe("debug");
      expect(LogLevel.INFO).toBe("info");
      expect(LogLevel.WARN).toBe("warn");
      expect(LogLevel.ERROR).toBe("error");
    });
  });

  describe("logger singleton", () => {
    it("should be defined", () => {
      expect(logger).toBeDefined();
    });

    it("should have all log methods", () => {
      expect(typeof logger.debug).toBe("function");
      expect(typeof logger.info).toBe("function");
      expect(typeof logger.warn).toBe("function");
      expect(typeof logger.error).toBe("function");
    });

    it("should have setLevel method", () => {
      expect(typeof logger.setLevel).toBe("function");
    });

    it("should have getConfig method", () => {
      expect(typeof logger.getConfig).toBe("function");
    });
  });

  describe("createLogger", () => {
    it("should create a new logger instance", () => {
      const customLogger = createLogger();
      expect(customLogger).toBeDefined();
      expect(typeof customLogger.debug).toBe("function");
    });

    it("should create logger with custom config", () => {
      const customLogger = createLogger({ level: LogLevel.DEBUG });
      const config = customLogger.getConfig();
      expect(config.level).toBe(LogLevel.DEBUG);
    });

    it("should create logger with JSON output", () => {
      const customLogger = createLogger({ json: true });
      const config = customLogger.getConfig();
      expect(config.json).toBe(true);
    });

    it("should create logger with timestamps disabled", () => {
      const customLogger = createLogger({ timestamps: false });
      const config = customLogger.getConfig();
      expect(config.timestamps).toBe(false);
    });
  });

  describe("log level filtering", () => {
    it("should log INFO messages at INFO level", () => {
      const customLogger = createLogger({ level: LogLevel.INFO });
      customLogger.info("Test info message");
      expect(stderrWriteSpy).toHaveBeenCalled();
    });

    it("should log WARN messages at INFO level", () => {
      const customLogger = createLogger({ level: LogLevel.INFO });
      customLogger.warn("Test warn message");
      expect(stderrWriteSpy).toHaveBeenCalled();
    });

    it("should log ERROR messages at INFO level", () => {
      const customLogger = createLogger({ level: LogLevel.INFO });
      customLogger.error("Test error message");
      expect(stderrWriteSpy).toHaveBeenCalled();
    });

    it("should NOT log DEBUG messages at INFO level", () => {
      const customLogger = createLogger({ level: LogLevel.INFO });
      customLogger.debug("Test debug message");
      expect(stderrWriteSpy).not.toHaveBeenCalled();
    });

    it("should log DEBUG messages at DEBUG level", () => {
      const customLogger = createLogger({ level: LogLevel.DEBUG });
      customLogger.debug("Test debug message");
      expect(stderrWriteSpy).toHaveBeenCalled();
    });

    it("should NOT log INFO messages at WARN level", () => {
      const customLogger = createLogger({ level: LogLevel.WARN });
      customLogger.info("Test info message");
      expect(stderrWriteSpy).not.toHaveBeenCalled();
    });

    it("should NOT log WARN messages at ERROR level", () => {
      const customLogger = createLogger({ level: LogLevel.ERROR });
      customLogger.warn("Test warn message");
      expect(stderrWriteSpy).not.toHaveBeenCalled();
    });

    it("should log ERROR messages at ERROR level", () => {
      const customLogger = createLogger({ level: LogLevel.ERROR });
      customLogger.error("Test error message");
      expect(stderrWriteSpy).toHaveBeenCalled();
    });
  });

  describe("log message formatting", () => {
    it("should include timestamp when enabled", () => {
      const customLogger = createLogger({ level: LogLevel.INFO, timestamps: true });
      customLogger.info("Test message");

      const output = stderrWriteSpy.mock.calls[0][0] as string;
      expect(output).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });

    it("should include log level in output", () => {
      const customLogger = createLogger({ level: LogLevel.INFO, timestamps: false });
      customLogger.info("Test message");

      const output = stderrWriteSpy.mock.calls[0][0] as string;
      expect(output).toContain("[INFO]");
    });

    it("should include message in output", () => {
      const customLogger = createLogger({ level: LogLevel.INFO, timestamps: false });
      customLogger.info("Test message content");

      const output = stderrWriteSpy.mock.calls[0][0] as string;
      expect(output).toContain("Test message content");
    });

    it("should include context as JSON when provided", () => {
      const customLogger = createLogger({ level: LogLevel.INFO, timestamps: false });
      customLogger.info("Test message", { key: "value", number: 42 });

      const output = stderrWriteSpy.mock.calls[0][0] as string;
      expect(output).toContain('"key":"value"');
      expect(output).toContain('"number":42');
    });

    it("should not include context when empty", () => {
      const customLogger = createLogger({ level: LogLevel.INFO, timestamps: false });
      customLogger.info("Test message", {});

      const output = stderrWriteSpy.mock.calls[0][0] as string;
      expect(output).not.toContain("{}");
    });

    it("should end output with newline", () => {
      const customLogger = createLogger({ level: LogLevel.INFO });
      customLogger.info("Test message");

      const output = stderrWriteSpy.mock.calls[0][0] as string;
      expect(output).toMatch(/\n$/);
    });
  });

  describe("JSON output format", () => {
    it("should output valid JSON when json mode enabled", () => {
      const customLogger = createLogger({ level: LogLevel.INFO, json: true });
      customLogger.info("Test message", { key: "value" });

      const output = stderrWriteSpy.mock.calls[0][0] as string;
      const parsed = JSON.parse(output.trim());

      expect(parsed.level).toBe("info");
      expect(parsed.message).toBe("Test message");
      expect(parsed.context).toEqual({ key: "value" });
    });

    it("should include timestamp in JSON output when enabled", () => {
      const customLogger = createLogger({ level: LogLevel.INFO, json: true, timestamps: true });
      customLogger.info("Test message");

      const output = stderrWriteSpy.mock.calls[0][0] as string;
      const parsed = JSON.parse(output.trim());

      expect(parsed.timestamp).toBeDefined();
      expect(parsed.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });
  });

  describe("setLevel", () => {
    it("should change the log level", () => {
      const customLogger = createLogger({ level: LogLevel.INFO });

      customLogger.debug("Should not appear");
      expect(stderrWriteSpy).not.toHaveBeenCalled();

      customLogger.setLevel(LogLevel.DEBUG);
      customLogger.debug("Should appear now");
      expect(stderrWriteSpy).toHaveBeenCalled();
    });
  });

  describe("getConfig", () => {
    it("should return current configuration", () => {
      const customLogger = createLogger({
        level: LogLevel.WARN,
        timestamps: false,
        json: true,
      });

      const config = customLogger.getConfig();

      expect(config.level).toBe(LogLevel.WARN);
      expect(config.timestamps).toBe(false);
      expect(config.json).toBe(true);
    });

    it("should return frozen config object", () => {
      const customLogger = createLogger();
      const config = customLogger.getConfig();

      expect(Object.isFrozen(config)).toBe(true);
    });
  });

  describe("environment variable overrides", () => {
    it("should use LOG_LEVEL environment variable", () => {
      process.env.LOG_LEVEL = "debug";
      const customLogger = createLogger();
      const config = customLogger.getConfig();

      expect(config.level).toBe(LogLevel.DEBUG);
    });

    it("should use LOG_JSON environment variable", () => {
      process.env.LOG_JSON = "true";
      const customLogger = createLogger();
      const config = customLogger.getConfig();

      expect(config.json).toBe(true);
    });

    it("should ignore invalid LOG_LEVEL values", () => {
      process.env.LOG_LEVEL = "invalid";
      const customLogger = createLogger();
      const config = customLogger.getConfig();

      // Should default to INFO
      expect(config.level).toBe(LogLevel.INFO);
    });

    it("should handle uppercase LOG_LEVEL", () => {
      process.env.LOG_LEVEL = "WARN";
      // LOG_LEVEL is lowercased internally
      const customLogger = createLogger();
      const config = customLogger.getConfig();

      expect(config.level).toBe(LogLevel.WARN);
    });
  });

  describe("log method context parameter", () => {
    it("should handle undefined context", () => {
      const customLogger = createLogger({ level: LogLevel.INFO, timestamps: false });
      customLogger.info("Test message");

      const output = stderrWriteSpy.mock.calls[0][0] as string;
      expect(output).toContain("Test message");
    });

    it("should handle complex context objects", () => {
      const customLogger = createLogger({ level: LogLevel.INFO, timestamps: false });
      customLogger.info("Test message", {
        nested: { key: "value" },
        array: [1, 2, 3],
        boolean: true,
      });

      const output = stderrWriteSpy.mock.calls[0][0] as string;
      expect(output).toContain('"nested"');
      expect(output).toContain('"array"');
      expect(output).toContain('"boolean":true');
    });
  });

  describe("all log methods", () => {
    it("should log debug messages", () => {
      const customLogger = createLogger({ level: LogLevel.DEBUG, timestamps: false });
      customLogger.debug("Debug message");

      const output = stderrWriteSpy.mock.calls[0][0] as string;
      expect(output).toContain("[DEBUG]");
    });

    it("should log info messages", () => {
      const customLogger = createLogger({ level: LogLevel.INFO, timestamps: false });
      customLogger.info("Info message");

      const output = stderrWriteSpy.mock.calls[0][0] as string;
      expect(output).toContain("[INFO]");
    });

    it("should log warn messages", () => {
      const customLogger = createLogger({ level: LogLevel.INFO, timestamps: false });
      customLogger.warn("Warn message");

      const output = stderrWriteSpy.mock.calls[0][0] as string;
      expect(output).toContain("[WARN]");
    });

    it("should log error messages", () => {
      const customLogger = createLogger({ level: LogLevel.INFO, timestamps: false });
      customLogger.error("Error message");

      const output = stderrWriteSpy.mock.calls[0][0] as string;
      expect(output).toContain("[ERROR]");
    });
  });
});
