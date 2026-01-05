/**
 * Unit tests for acronym utilities
 *
 * Pre-enriched specs from robinmordasiewicz/f5xc-api-enriched already have
 * normalized acronyms, so legacy normalize functions have been removed.
 */

import { describe, it, expect } from "vitest";
import {
  isAcronym,
  getCanonicalAcronym,
  toKebabCase,
  toSnakeCase,
  toPascalCase,
  toCamelCase,
} from "../../src/generator/naming/acronyms.js";

describe("isAcronym", () => {
  it("should return true for known acronyms", () => {
    expect(isAcronym("tcp")).toBe(true);
    expect(isAcronym("TCP")).toBe(true);
    expect(isAcronym("http")).toBe(true);
  });

  it("should return false for non-acronyms", () => {
    expect(isAcronym("load")).toBe(false);
    expect(isAcronym("balancer")).toBe(false);
  });
});

describe("getCanonicalAcronym", () => {
  it("should return canonical form", () => {
    expect(getCanonicalAcronym("tcp")).toBe("TCP");
    expect(getCanonicalAcronym("Tcp")).toBe("TCP");
  });

  it("should return null for non-acronyms", () => {
    expect(getCanonicalAcronym("load")).toBeNull();
  });
});

describe("toKebabCase", () => {
  it("should convert to kebab-case", () => {
    expect(toKebabCase("HTTP Load Balancer")).toBe("http-load-balancer");
  });

  it("should handle camelCase", () => {
    expect(toKebabCase("httpLoadBalancer")).toBe("http-load-balancer");
  });

  it("should handle underscores", () => {
    expect(toKebabCase("http_load_balancer")).toBe("http-load-balancer");
  });
});

describe("toSnakeCase", () => {
  it("should convert to snake_case", () => {
    expect(toSnakeCase("HTTP Load Balancer")).toBe("http_load_balancer");
  });

  it("should handle kebab-case", () => {
    expect(toSnakeCase("http-load-balancer")).toBe("http_load_balancer");
  });
});

describe("toPascalCase", () => {
  it("should convert to PascalCase", () => {
    expect(toPascalCase("http load balancer")).toBe("HTTPLoadBalancer");
  });

  it("should preserve acronyms", () => {
    expect(toPascalCase("tcp connection")).toBe("TCPConnection");
  });
});

describe("toCamelCase", () => {
  it("should convert to camelCase", () => {
    expect(toCamelCase("http load balancer")).toBe("hTTPLoadBalancer");
  });
});
