/**
 * Unit tests for acronym normalization
 */

import { describe, it, expect } from "vitest";
import {
  normalizeAcronyms,
  normalizeTitleAcronyms,
  isAcronym,
  getCanonicalAcronym,
  toKebabCase,
  toSnakeCase,
  toPascalCase,
  toCamelCase,
} from "../../src/generator/naming/acronyms.js";

describe("normalizeAcronyms", () => {
  it("should normalize TCP to uppercase", () => {
    expect(normalizeAcronyms("tcp load balancer")).toBe("TCP load balancer");
  });

  it("should normalize multiple acronyms", () => {
    expect(normalizeAcronyms("http and https protocols")).toBe(
      "HTTP and HTTPS protocols"
    );
  });

  it("should preserve already correct acronyms", () => {
    expect(normalizeAcronyms("TCP/UDP traffic")).toBe("TCP/UDP traffic");
  });

  it("should handle DNS correctly", () => {
    expect(normalizeAcronyms("dns zone configuration")).toBe(
      "DNS zone configuration"
    );
  });

  it("should normalize WAF", () => {
    expect(normalizeAcronyms("waf policy")).toBe("WAF policy");
  });
});

describe("normalizeTitleAcronyms", () => {
  it("should normalize title case with acronyms", () => {
    expect(normalizeTitleAcronyms("Tcp Load Balancer")).toBe(
      "TCP Load Balancer"
    );
  });

  it("should handle Http Load Balancer", () => {
    expect(normalizeTitleAcronyms("Http Load Balancer")).toBe(
      "HTTP Load Balancer"
    );
  });
});

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
